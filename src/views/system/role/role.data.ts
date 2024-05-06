import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/demo/system';
// import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: 'key',
    dataIndex: 'roleKey',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      const status = record.noticeType;
      const enable = ~~status === 0;
      const color = enable ? '#108ee9' : '#f50';
      const text = enable ? '已启用' : '已停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '角色描述',
    dataIndex: 'remark',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 80,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
  },
];
export const menuColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '按钮权限',
    dataIndex: 'roleKey',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleKey',
    label: 'key',
    required: true,
    component: 'Input',
  },
  {
    label: '角色描述',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
export const formMenuSchema: FormSchema[] = [
  {
    label: ' ',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input',
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

export interface drawerItem {
  roleName: string;
  id?: number;
  menuIds?: string[];
}
