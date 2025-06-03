import api from './axios';
import { IResponse, IResponseAuth } from '../Interfaces/Response';
import { IUser } from 'src/Interfaces/User';

class AuthDataService {
  async login(email: string, password: string): Promise<IResponseAuth<IUser>> {
    let response = api.post('/login', {
      email,
      password,
    });

    return response;
  }

  async logout(): Promise<IResponse<null>> {
    let response = await api.get('logout');
    return response;
  }

  async recover(email: string): Promise<IResponse<any>> {
    let response = await api.post('recover/password', { data: { email } });
    return response;
  }

  async updatePassword(
    email: string,
    password: string
  ): Promise<IResponse<any>> {
    let response = await api.post('recover/custom-password', {
      data: { email, password },
    });
    return response;
  }
}

export const authDataServices = new AuthDataService();
