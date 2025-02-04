import { API } from 'src/common/api';
import { INutri } from 'src/Interfaces/Nutri';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class NutriDataService {
  async getNutriologas(): Promise<IResponse<INutri[]>> {
    const response = await API.get('show/nutricionistas', {});

    return response!.data;
  }

  async saveNutricionista(data: INutri): Promise<IResponse<INutri>> {
    let response = await API.post('create/nutricionista', {
      data: data,
    });
    return response.data;
  }

  async updateNutricionista(
    id: number,
    data: INutri
  ): Promise<IResponse<INutri>> {
    let response = await API.post(`update/nutricionista/${id}`, {
      data: data,
    });
    return response.data;
  }
}

export const nutriDataServices = new NutriDataService();
