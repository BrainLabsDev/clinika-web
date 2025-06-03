import api from './axios';
import { IActividadFisica } from 'src/Interfaces/ActividadFisica';

import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class ActividadDataService {
  async getActividades(): Promise<IResponse<IActividadFisica[]>> {
    const response = await api.get('show/actividades-fisicas', {});
    return response!.data;
  }
}

export const actividadDataServices = new ActividadDataService();
