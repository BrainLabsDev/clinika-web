import api from './axios';
import { IResponse } from 'src/Interfaces/Response';

class UserDataService {
  async deleteUser(id: string): Promise<IResponse<any>> {
    const response = await api.delete(`delete/user/${id}`, {});

    return response!.data;
  }

  async checkUser(email: string): Promise<IResponse<any>> {
    const response = await api.post(`check/user`, {
      data: {
        email,
      },
    });

    return response!.data;
  }

  async showAllUser(): Promise<IResponse<any>> {
    const response = await api.get(`show/users`, {});
    return response!.data;
  }

  async createUser(data: any): Promise<IResponse<any>> {
    const response = await api.post(`create/user`, {
      data: data,
    });

    return response!.data;
  }
  async updateUser(data: any, id: string): Promise<IResponse<any>> {
    const response = await api.post(`update/user/${id}`, {
      data: data,
    });

    return response!.data;
  }
}

export const userDataServices = new UserDataService();
