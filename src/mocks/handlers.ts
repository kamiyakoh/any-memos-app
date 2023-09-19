import type { Memo } from '../types';
import { rest } from 'msw';
import dayjs from 'dayjs';

interface LoginBody {
  email: string;
  password: string;
}

let memos = JSON.parse(localStorage.getItem('memos') ?? '[]') as Memo[];

export const getAuth = (): boolean => {
  const isToken = localStorage.getItem('accessToken');
  const tokenExp = dayjs(localStorage.getItem('accessTokenExp'));
  const now = dayjs();
  let isAuth = false;
  if (isToken === 'mock-jwt-token' && tokenExp.isAfter(now)) {
    isAuth = true;
  }
  return isAuth;
};
const isValidDate = (date: string): boolean => {
  const dateFormat = 'YYYY/MM/DD';
  const dateObj = dayjs(date, { format: dateFormat });
  return dateObj.isValid();
};
const setNewMemos = (newMemos: Memo[]): void => {
  localStorage.setItem('memos', JSON.stringify(newMemos));
  memos = newMemos;
};
const delMemo = (id: string): void => {
  const filterMemos = memos.filter((memo) => memo.id !== id);
  const fixedMemos = filterMemos.map((memo, index) => ({
    ...memo,
    id: index.toString(),
  }));
  setNewMemos(fixedMemos);
};
const errorMessage = (title: string, date: string, markDiv: number): string => {
  let message: string[] = [];
  if (title === '') message = ['タイトルは必須です'];
  if (!isValidDate(date)) message = [...message, '日付の形式が不正です'];
  if (Number.isNaN(markDiv)) message = [...message, 'マーク区分は数値で入力してください'];
  const errorMessage = message.join('\n');
  return errorMessage;
};

// モックAPIのハンドラーを定義
export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const requestBody: LoginBody = await req.json();

    if (requestBody === null) {
      return await res(ctx.status(400), ctx.json({ message: 'Invalid request body' }));
    }

    const { email, password } = requestBody;

    // 仮のユーザー名とパスワードでモックのJWTを返す例
    if (email !== 'hoge@example.com' || password !== 'exam') {
      return await res(ctx.status(401), ctx.json({ message: 'unauthorized' }));
    }
    const expDate = dayjs().add(24, 'hour');
    return await res(
      ctx.json({
        accessToken: 'mock-jwt-token',
        accessTokenExp: expDate,
      }),
    );
  }),
  rest.get('/api/memos', async (req, res, ctx) => {
    if (!getAuth()) {
      return await res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'unauthorized',
        }),
      );
    }
    return await res(
      ctx.status(200),
      ctx.json({
        memos,
      }),
    );
  }),
  rest.post('/api/memo', async (req, res, ctx) => {
    // 認証が不正の場合
    if (!getAuth()) {
      return await res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'unauthorized',
        }),
      );
    }
    // 認証が正常の場合
    const requestBody: Memo = await req.json();
    const { title, category, description, date, markDiv } = requestBody;
    // inputも正常の場合
    if (title !== '' && isValidDate(date) && !Number.isNaN(markDiv)) {
      const id = memos.length.toString();
      const newMemo = { id, title, category, description, date, markDiv };
      const newMemos = [...memos, newMemo];
      setNewMemos(newMemos);
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          category,
          description,
          date,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    return await res(ctx.status(400), ctx.json({ errorMessage: errorMessage(title, date, markDiv) }));
  }),
  rest.put('/api/memo/:id', async (req, res, ctx) => {
    if (!getAuth()) {
      return await res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'unauthorized',
        }),
      );
    }
    // 認証が正常の場合
    const requestBody: Memo = await req.json();
    const { id, title, category, description, date, markDiv } = requestBody;
    // inputも正常の場合
    if (title !== '' && isValidDate(date) && !Number.isNaN(markDiv)) {
      const thisMemo = memos.find((memo) => memo.id === id);
      const newMemo = { id, title, category, description, date, markDiv };
      const newMemos = memos.map((memo) => {
        if (memo === thisMemo) {
          return newMemo;
        }
        return memo;
      });
      setNewMemos(newMemos);
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          category,
          description,
          date,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    return await res(ctx.status(400), ctx.json({ errorMessage: errorMessage(title, date, markDiv) }));
  }),
  rest.delete('/api/memo/:id', async (req, res, ctx) => {
    if (!getAuth()) {
      return await res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'unauthorized',
        }),
      );
    }
    // 認証が正常の場合
    const requestBody: Memo = await req.json();
    const { id, title, category, description, date, markDiv } = requestBody;
    // inputも正常の場合
    const thisMemo = memos.find((memo) => memo.id === id);
    if (thisMemo !== null) {
      delMemo(id);
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          category,
          description,
          date,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    return await res(ctx.status(400), ctx.json({ errorMessage: 'IDが不正です' }));
  }),
];
