import axios from 'src/boot/axios';
import { API } from 'src/common/api';
import {
  IPaciente,
  IPacientePayload,
  IPacienteRES,
  IPacienteWithFilesPayload,
} from 'src/Interfaces/Paciente';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';

const store = useAuthStore();

const { deleteLocalStorage } = store;
class PacienteDataService {
  async getAll(): Promise<IResponse<IPaciente[]>> {
    const response = await API.get('show/clientes', {});

    return response!.data;
  }

  async getById(id: string): Promise<IResponse<{ user: IPacienteRES }>> {
    let response;
    try {
      response = await API.get(`show/user/${id}`, {});
    } catch (error) {
      deleteLocalStorage();
    }
    return response!.data;
  }

  async savePaciente(data: any): Promise<IResponse<IPaciente>> {
    let response = await API.post('create/user', {
      data: data,
    });

    return response!.data;
  }

  async updatePaciente(
    id: number | string,
    data: IPacientePayload
  ): Promise<IResponse<IPaciente>> {
    let response = await API.post(`update/user/${id}`, {
      data: data,
    });

    return response!.data;
  }

  async deleteUser(id: string): Promise<IResponse<any>> {
    const response = await API.delete(`delete/user/${id}`, {});

    return response!.data;
  }
}

export const pacienteDataServices = new PacienteDataService();
