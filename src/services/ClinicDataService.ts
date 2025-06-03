import api from './axios';
import { IClinic } from 'src/Interfaces/Clinic';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class ClinicDataService {
  async getClinics(): Promise<IResponse<IClinic[]>> {
    const response = await api.get('consultorios', {});
    return response!.data;
  }

  async saveClinic(clinic: IClinic): Promise<IResponse<IClinic>> {
    let response = await api.post('create/consultorio', {
      data: clinic,
    });
    return response.data;
  }
  async updateClinic(id: number, clinic: IClinic): Promise<IResponse<IClinic>> {
    let response = await api.post(`update/consultorio/${id}`, {
      data: clinic,
    });
    return response.data;
  }

  async deleteClinic(id: string): Promise<IResponse<any>> {
    const response = await api.delete(`delete/consultorio/${id}`, {});

    return response!.data;
  }
}

export const clinicDataServices = new ClinicDataService();
