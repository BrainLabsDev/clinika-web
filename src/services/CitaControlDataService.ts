import api from './axios';
import { ICitaControl } from 'src/Interfaces/CitaControl';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class CitaControlDataService {
  async getAll(id: string): Promise<IResponse<ICitaControl[]>> {
    const response = await api.get(`show/history-cita-control/${id}`, {});

    return response!.data;
  }

  async save(data: ICitaControl): Promise<IResponse<ICitaControl>> {
    let response = await api.post('create/cita-control', {
      cliente_id: data.cliente_id,
      fecha: data.fecha,
      peso: Number(data.peso),
      musculo: Number(data.musculo),
      grasa: Number(data.grasa),
      porcentaje_grasa: Number(data.porcentaje_grasa),
      cc: Number(data.cc),
      grasa_viseral: Number(data.grasa_viseral),
      notas_cliente: data.notas_cliente,
      notas_internas: data.notas_internas,
      ejercicio: data.ejercicio,
      consumo_agua_id: data.consumo_agua_id,
    });
    return response.data;
  }
  async update(
    id: string,
    data: ICitaControl
  ): Promise<IResponse<ICitaControl>> {
    let response = await api.post(`update/cita-control/${id}`, { data });
    return response.data;
  }

  async deleteCita(id: string): Promise<IResponse<any>> {
    const response = await api.delete(`eliminar/cita-control/{{id}}`, {
      params: { id },
    });

    return response!.data;
  }
}

export const citaControlDataServices = new CitaControlDataService();
