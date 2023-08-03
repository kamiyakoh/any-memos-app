import { rest } from 'msw';

interface LoginBody {
  email: string;
  password: string;
}

// モックAPIのハンドラーを定義
export const handlers = [
  rest.post('/api/login', async (req, res, ctx) => {
    const requestBody: LoginBody = await req.json();

    if (requestBody === null) {
      return await res(ctx.status(400), ctx.json({ message: 'Invalid request body' }));
    }

    const { email, password } = requestBody;

    // 仮のユーザー名とパスワードでモックのJWTを返す例
    if (email === 'hoge@example.com' && password === 'exam') {
      return await res(
        ctx.json({
          token: 'mock-jwt-token',
        }),
      );
    } else {
      return await res(ctx.status(401), ctx.json({ message: 'Not authorized' }));
    }
  }),
];

/* export const handlers: RequestHandler[] = [
  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = (await req.json()) as Loginbody;
    if (email === 'hoge@example.com' && password === 'exam') {
      const payload = {
        email,
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
      localStorage.setItem('jwtToken', token);
      return res(ctx.status(200), ctx.json({ message: 'Login successful', token }));
    } else {
      return res(ctx.status(401), ctx.json({ message: 'unauthorized' }));
    }
  }),
  /* rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');
    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]; */
