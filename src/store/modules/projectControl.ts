import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getoneApi, isUnitLeaderApi } from '/@/api/project/project';
import { ProjectRoleEnum } from '/@/enums/projectControl';
import { useUserStore } from './user';
interface ProjectState {
  reportData: Recordable;
  userId: Nullable<string>;
  userRoleKeys: ProjectRoleEnum[];
}

const store = useUserStore();

export const useProjectControl = defineStore({
  id: 'app-project-control',
  state: (): ProjectState => ({
    reportData: {},
    userId: null,
    userRoleKeys: [],
  }),
  getters: {
    getReportData(): Recordable {
      return this.reportData;
    },
    getUserRoleKey(): ProjectRoleEnum[] {
      return this.userRoleKeys;
    },
  },
  actions: {
    setReportData(data: Recordable) {
      this.reportData = data;
    },
    async setUserHasRoleKey() {
      if (!this.userId) {
        const { id } = await getoneApi(store.userInfo?.account);
        this.userId = id;
      }

      if (this.userRoleKeys.length) return;

      const results = await Promise.all(
        Object.values(ProjectRoleEnum).map(async (roleKey) => {
          const res = await isUnitLeaderApi({ userId: this.userId!, roleKey });
          if (res) {
            return roleKey;
          }
        }),
      );

      this.userRoleKeys = results.filter(
        (roleKey): roleKey is typeof ProjectRoleEnum[keyof typeof ProjectRoleEnum] => !!roleKey,
      );
    },
    hasRoles(role) {
      return this.userRoleKeys.includes(role);
    },
    clearUserIdAndRolekeys() {
      this.userId = null;
      this.userRoleKeys = [];
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useProjectControl(store);
}
