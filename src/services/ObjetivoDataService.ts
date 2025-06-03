import api from './axios';
import { IObjetivo } from 'src/Interfaces/Objetivo';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';

class ObjetivoDataService {
  async getObjetivos(): Promise<IResponse<IObjetivo[]>> {
    const response = await api.get('show/objetivos', {});
    return response!.data;
  }
}

export const objetivoDataServices = new ObjetivoDataService();
