import api from './axios';
import { INutri } from 'src/Interfaces/Nutri';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class NutriDataService {
  async getNutriologas(): Promise<IResponse<INutri[]>> {
    const response = await api.get('show/nutricionistas', {});

    return response!.data;
  }

  async saveNutricionista(data: INutri): Promise<IResponse<INutri>> {
    let response = await api.post('create/nutricionista', {
      data: data,
    });
    return response.data;
  }

  async updateNutricionista(
    id: number,
    data: INutri
  ): Promise<IResponse<INutri>> {
    let response = await api.post(`update/nutricionista/${id}`, {
      data: data,
    });
    return response.data;
  }
}

export const nutriDataServices = new NutriDataService();
