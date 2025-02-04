import { API } from 'src/common/api';
import { IResponse } from 'src/Interfaces/Response';
import { IRole } from 'src/Interfaces/Role';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();

const { deleteLocalStorage } = store;
class RoleDataService {
  async getAll(): Promise<IResponse<IRole[]>> {
    const response = await API.get('show/roles', {});
    return response!.data;
  }
}

export const roleDataServices = new RoleDataService();
