import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fieldTime',
    label: '时间范围',
    component: 'RangePicker',
    slot: 'fieldTime',
    colProps: { span: 6 },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '昵称',
    dataIndex: 'nick',
  },
  {
    title: '单位名',
    dataIndex: 'unitName',
  },
  {
    title: '部门',
    dataIndex: 'deptName',
  },
  {
    title: '登出时间',
    dataIndex: 'logoutTime',
  },
  {
    title: '登出类别',
    dataIndex: 'logoutType',
    slots: { customRender: 'logoutType' },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '账号',
    field: 'account',
    component: 'Input',
  },
  {
    label: '昵称',
    field: 'nick',
    component: 'Input',
  },
  {
    label: '单位名',
    field: 'unitName',
    component: 'Input',
  },
  {
    label: '部门',
    field: 'deptName',
    component: 'Input',
  },
  {
    label: '登出时间',
    field: 'logoutTime',
    component: 'Input',
  },
  {
    label: '登出类别',
    field: 'logoutType',
    component: 'Input',
  },
];
