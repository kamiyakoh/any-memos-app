import { rest } from 'msw';

interface LoginBody {
  email: string;
  password: string;
}
export interface MemoBody {
  id: string;
  title: string;
  markDiv: number;
}

// モックAPIのハンドラーを定義
const getAuth = (): boolean => {
  const isToken = localStorage.getItem('token');
  const tokenExp = Number(localStorage.getItem('tokenExp') ?? '0');
  const now = new Date().getTime();
  let isAuth = false;
  if (isToken === 'mock-jwt-token' && now < tokenExp) {
    isAuth = true;
  }
  return isAuth;
};

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
    return await res(
      ctx.json({
        token: 'mock-jwt-token',
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
        memos: JSON.parse(localStorage.getItem('memos') ?? '[]') as MemoBody[],
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
    const requestBody: MemoBody = await req.json();
    const { title, markDiv } = requestBody;
    // inputも正常の場合
    if (title !== '' && !Number.isNaN(markDiv)) {
      const memos = JSON.parse(localStorage.getItem('memos') ?? '[]') as MemoBody[];
      const id = memos.length.toString();
      const newMemo = { id, title, markDiv };
      const newMemos = JSON.stringify([...memos, newMemo]);
      localStorage.setItem('memos', newMemos);
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    let message: string[] = [];
    if (title === '') message = ['タイトルは必須です'];
    if (Number.isNaN(markDiv)) message = [...message, 'マーク区分は数値で入力してください'];
    const errorMessage = message.join(',\n');
    return await res(ctx.status(400), ctx.json({ errorMessage }));
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
    const requestBody: MemoBody = await req.json();
    const { id, title, markDiv } = requestBody;
    // inputも正常の場合
    if (title !== '' && !Number.isNaN(markDiv)) {
      const memos = JSON.parse(localStorage.getItem('memos') ?? '[]') as MemoBody[];
      const thisMemo = memos.find((m) => m.id === id);
      const newMemo = { id, title, markDiv };
      const newMemos = memos.map((m) => {
        if (m === thisMemo) {
          return newMemo;
        }
        return m;
      });
      localStorage.setItem('memos', JSON.stringify(newMemos));
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    let message: string[] = [];
    if (title === '') message = ['タイトルは必須です'];
    if (Number.isNaN(markDiv)) message = [...message, 'マーク区分は数値で入力してください'];
    const errorMessage = message.join(',\n');
    return await res(ctx.status(400), ctx.json({ errorMessage }));
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
    const requestBody: MemoBody = await req.json();
    const { id, title, markDiv } = requestBody;
    // inputも正常の場合
    if (title !== '' && !Number.isNaN(markDiv)) {
      const memos = JSON.parse(localStorage.getItem('memos') ?? '[]') as MemoBody[];
      const thisMemo = memos.find((m) => m.id === id);
      const newMemos = memos.filter((m) => m !== thisMemo);
      const fixedIdMemos = newMemos.map((m, index) => ({
        ...m,
        id: index.toString(),
      }));
      localStorage.setItem('memos', JSON.stringify(fixedIdMemos));
      return await res(
        ctx.status(200),
        ctx.json({
          id,
          title,
          mark_div: markDiv,
        }),
      );
    }
    // inputに問題ある場合
    let message: string[] = [];
    if (title === '') message = ['タイトルは必須です'];
    if (Number.isNaN(markDiv)) message = [...message, 'マーク区分は数値で入力してください'];
    const errorMessage = message.join(',\n');
    return await res(ctx.status(400), ctx.json({ errorMessage }));
  }),
];
