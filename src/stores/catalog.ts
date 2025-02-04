import { defineStore } from 'pinia';
import {
  catalogoDataService,
  ICatalogoData,
} from 'src/services/CatalogoDataService';
export const useCatalogStore = defineStore('catalogs', {
  state: () => ({
    consumo_alcohol: [] as ICatalogoData[],
    lista_estados_civiles: [] as string[],
    lista_horas_sueno: [] as ICatalogoData[],
    lista_objetivos: [] as ICatalogoData[],
    lista_actividades: [] as ICatalogoData[],
    tipo_fumador: [] as ICatalogoData[],
    estres: [] as ICatalogoData[],
    ingesta_agua: [] as ICatalogoData[],
  }),
  getters: {
    getConsumoAlcohol: (state) => state.consumo_alcohol,
    getEstadosCiviles: (state) => state.lista_estados_civiles,
    getHorasSueno: (state) => state.lista_horas_sueno,
    getObjetivos: (state) => state.lista_objetivos,
    getActividades: (state) => state.lista_actividades,
    getTipoFumador: (state) => state.tipo_fumador,
    getEstres: (state) => state.estres,
    getIngestaAgua: (state) => state.ingesta_agua,
  },
  actions: {
    async getCatalogs() {
      const data = await catalogoDataService.getShowCategories();
      if (data.code === 200) {
        this.lista_estados_civiles = data.data.estado_civil.map((item) => {
          return item.label;
        });
        this.lista_objetivos = data.data.objectives.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.lista_horas_sueno = data.data.hours_of_sleep.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.consumo_alcohol = data.data.alcohol_consumption.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.tipo_fumador = data.data.smoke.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.ingesta_agua = data.data.water_consumption.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.estres = data.data.stress.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
        this.lista_actividades = data.data.physical_activities.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        });
      }
    },
  },
});
