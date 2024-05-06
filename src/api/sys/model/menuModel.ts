import type { RouteMeta } from 'vue-router';
import { BasicMenuResult } from '/@/api/model/baseModel';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export interface MenuListItem {
  id: string;
  component: any;
  icon: string;
  orderNum: number;
  menuName: string;
  path: string;
  remark: string;
  children?: MenuListItem[];
}

export interface MenuParams {
  menuName: string;
}
/**
 * @description: Get menu return value
 */
// export type getMenuListResultModel = RouteItem[];
export type getMenuListResultModel = BasicMenuResult<MenuListItem[]>;
