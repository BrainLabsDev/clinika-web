import { API } from 'src/common/api';
import { IObjetivo } from 'src/Interfaces/Objetivo';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class ObjetivoDataService {
  async getObjetivos(): Promise<IResponse<IObjetivo[]>> {
    const response = await API.get('show/objetivos', {});
    return response!.data;
  }
}

export const objetivoDataServices = new ObjetivoDataService();
