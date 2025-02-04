import { API } from 'src/common/api';
import { IResponse } from 'src/Interfaces/Response';

class UserDataService {
  async deleteUser(id: string): Promise<IResponse<any>> {
    const response = await API.delete(`delete/user/${id}`, {});

    return response!.data;
  }

  async checkUser(email: string): Promise<IResponse<any>> {
    const response = await API.post(`check/user`, {
      data: {
        email,
      },
    });

    return response!.data;
  }

  async showAllUser(): Promise<IResponse<any>> {
    const response = await API.get(`show/users`, {});
    return response!.data;
  }

  async createUser(data: any): Promise<IResponse<any>> {
    const response = await API.post(`create/user`, {
      data: data,
    });

    return response!.data;
  }
  async updateUser(data: any, id: string): Promise<IResponse<any>> {
    const response = await API.post(`update/user/${id}`, {
      data: data,
    });

    return response!.data;
  }
}

export const userDataServices = new UserDataService();
