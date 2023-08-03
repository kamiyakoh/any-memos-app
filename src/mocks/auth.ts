import axios from 'axios';
import type { AxiosResponse } from 'axios';

interface LoginResData {
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResData> => {
  try {
    // ログインAPIの実際のエンドポイントを呼び出す代わりに、Mock Service Workerのモックを使う
    // 本来はここで実際のAPIエンドポイントを呼び出す
    const response: AxiosResponse<LoginResData> = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
