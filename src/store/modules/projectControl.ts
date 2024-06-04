import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
interface ProjectState {
  reportData: Recordable;
}

export const useProjectControl = defineStore({
  id: 'app-project-control',
  state: (): ProjectState => ({
    reportData: {},
  }),
  getters: {
    getReportData(): Recordable {
      return this.reportData;
    },
  },
  actions: {
    setReportData(data: Recordable) {
      this.reportData = data;
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useProjectControl(store);
}
