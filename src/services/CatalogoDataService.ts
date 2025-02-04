import { API } from 'src/common/api';
import { IResponse } from 'src/Interfaces/Response';
import { useAuthStore } from 'src/stores/auth';
const store = useAuthStore();
const { deleteLocalStorage } = store;

interface IShowCategories {
  alcohol_consumption: ICatalogoData[] | [];
  hours_of_sleep: ICatalogoData[] | [];
  objectives: ICatalogoData[] | [];
  physical_activities: ICatalogoData[] | [];
  smoke: ICatalogoData[] | [];
  stress: ICatalogoData[] | [];
  water_consumption: ICatalogoData[] | [];
  estado_civil: ICatalogoData[] | [];
}

export interface ICatalogoData {
  id?: string;
  value?: string;
  label: string;
}

class CatalogoDataService {
  async getShowCategories(): Promise<IResponse<IShowCategories>> {
    let response = {
      objectives: [],
      alcohol_consumption: [],
      hours_of_sleep: [],
      physical_activities: [],
      smoke: [],
      stress: [],
      water_consumption: [],
      estado_civil: [],
    };

    const { data } = await API.get('show-categories', {});

    response = {
      objectives: data.data.objectives,
      alcohol_consumption: data.data.alcohol_consumption,
      hours_of_sleep: data.data.hours_of_sleep,
      physical_activities: data.data.physical_activities,
      smoke: data.data.smoke,
      stress: data.data.stress,
      water_consumption: data.data.water_consumption,
      estado_civil: data.data.estado_civil[0],
    };

    return { data: response, code: 200, msg: '' };
  }
}

export const catalogoDataService = new CatalogoDataService();
