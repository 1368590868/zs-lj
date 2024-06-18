import { defineStore } from 'pinia';
import { store } from '/@/store';
import { getPersonnalApi, getoneApi, isUnitLeaderApi } from '/@/api/project/project';
import { ProjectRoleEnum } from '/@/enums/projectControl';
import { useUserStore } from './user';
interface ProjectState {
  reportData: Recordable;
  userId: Nullable<string>;
  userRoleKeys: ProjectRoleEnum[];
  userCode: Nullable<string>;
}

const store = useUserStore();

export const useProjectControl = defineStore({
  id: 'app-project-control',
  state: (): ProjectState => ({
    reportData: {},
    userId: null,
    userRoleKeys: [],
    userCode: null,
  }),
  getters: {
    getReportData(): Recordable {
      return this.reportData;
    },
    getUserRoleKey(): ProjectRoleEnum[] {
      return this.userRoleKeys;
    },
    getUserCode(): Nullable<string> {
      return this.userCode;
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
      this.userCode = null;
    },
    async setUserCode() {
      if (this.userCode) {
        return Promise.resolve();
      }
      const { records = [] } = await getPersonnalApi({});
      this.userCode = records.length ? records[0].id : null;
      return Promise.resolve();
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useProjectControl(store);
}
