import api from './axios';
import {
  ICitaAgendaDTO,
  ICitaAgendaResponse,
} from 'src/Interfaces/CitaControl';

import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;

class CitaAgendaDataService {
  async save(data: ICitaAgendaDTO): Promise<IResponse<ICitaAgendaResponse>> {
    let response = await api.post('create/cita', { data });
    return response.data;
  }

  async update(
    id: number,
    data: ICitaAgendaDTO
  ): Promise<IResponse<ICitaAgendaResponse>> {
    let response = await api.post('update/cita/{{id}}', {
      params: { id },
      data,
    });
    return response.data;
  }

  async getAll(): Promise<IResponse<ICitaAgendaResponse[]>> {
    const response = await api.get('show/all-citas', {});
    return response!.data;
  }

  async getAllByDate(date: string): Promise<IResponse<ICitaAgendaResponse[]>> {
    let response;
    try {
      response = await api.get('show/all-citas/{{date}}', {
        params: { date },
      });
    } catch (error) {
      deleteLocalStorage;
    }
    return response!.data;
  }
}

export const citaAgendaDataServices = new CitaAgendaDataService();
