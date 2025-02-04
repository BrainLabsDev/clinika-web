import { API } from 'src/common/api';
import { ICitaControl } from 'src/Interfaces/CitaControl';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class CitaControlDataService {
  async getAll(id: string): Promise<IResponse<ICitaControl[]>> {
    const response = await API.get(`show/history-cita-control/${id}`, {});

    return response!.data;
  }

  async save(data: ICitaControl): Promise<IResponse<ICitaControl>> {
    let response = await API.post('create/cita-control', { data });
    return response.data;
  }
  async update(
    id: string,
    data: ICitaControl
  ): Promise<IResponse<ICitaControl>> {
    let response = await API.post(`update/cita-control/${id}`, { data });
    return response.data;
  }

  async deleteCita(id: string): Promise<IResponse<any>> {
    const response = await API.delete(`eliminar/cita-control/{{id}}`, {
      params: { id },
    });

    return response!.data;
  }
}

export const citaControlDataServices = new CitaControlDataService();
