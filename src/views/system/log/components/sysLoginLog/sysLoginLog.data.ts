import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'account',
    width: 200,
  },
  {
    title: '昵称',
    dataIndex: 'nick',
    width: 200,
  },
  {
    title: '单位名',
    dataIndex: 'unitName',
    width: 200,
  },
  {
    title: '部门流程',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    width: 200,
  },
  {
    title: 'IP',
    dataIndex: 'loginIp',
    width: 200,
  },
  {
    title: '上次登录时间',
    dataIndex: 'lastLoginTime',
    width: 200,
  },
  {
    title: '上次登录ip',
    dataIndex: 'lastLoginIp',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fieldTime',
    label: '时间范围',
    component: 'RangePicker',
    slot: 'fieldTime',
    colProps: { span: 6 },
  },
  {
    field: 'searchName',
    label: '姓名',
    component: 'Input',
    colProps: { span: 5 },
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
    label: '部门流程',
    field: 'deptName',
    component: 'Input',
  },
  {
    label: '登录时间',
    field: 'loginTime',
    component: 'Input',
  },
  {
    label: 'IP',
    field: 'loginIp',
    component: 'Input',
  },
  {
    label: '上次登录时间',
    field: 'lastLoginTime',
    component: 'Input',
  },
  {
    label: '上次登录ip',
    field: 'lastLoginIp',
    component: 'Input',
  },
];
