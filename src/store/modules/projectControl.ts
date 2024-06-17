import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { getoneApi, isUnitLeaderApi } from '/@/api/project/project';
import { ProjectRoleEnum } from '/@/enums/projectControl';
interface ProjectState {
  reportData: Recordable;
  userId: Nullable<string>;
  userRoleKey: ProjectRoleEnum[];
}

export const useProjectControl = defineStore({
  id: 'app-project-control',
  state: (): ProjectState => ({
    reportData: {},
    userId: null,
    userRoleKey: [],
  }),
  getters: {
    getReportData(): Recordable {
      return this.reportData;
    },
    getUserRoleKey(): ProjectRoleEnum[] {
      return this.userRoleKey;
    },
  },
  actions: {
    setReportData(data: Recordable) {
      this.reportData = data;
    },
    /**
     * Sets the user's role key based on their account.
     * @param {string} account - The user account.
     */
    async setUserHasRoleKey(account: string) {
      if (!this.userId) {
        const { id } = await getoneApi(account);
        this.userId = id;
      }

      const results = await Promise.all(
        Object.values(ProjectRoleEnum).map(async (roleKey) => {
          const res = await isUnitLeaderApi({ userId: this.userId!, roleKey });
          if (res) {
            return roleKey;
          }
        }),
      );
      this.userRoleKey = results.filter(
        (roleKey): roleKey is typeof ProjectRoleEnum[keyof typeof ProjectRoleEnum] => !!roleKey,
      );
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useProjectControl(store);
}
