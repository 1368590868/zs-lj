import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'id',
  },
  {
    title: '数据源名称',
    dataIndex: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
  {
    title: '账号名',
    dataIndex: 'username',
  },
  // {
  //   title: '密码',
  //   dataIndex: 'password',
  // },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '数据源名称',
    component: 'Input',
    colProps: { span: 6 },
  },
];
export const dadaSourceSchema: FormSchema[] = [
  {
    field: 'name',
    label: '数据源名称',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'url',
    label: 'Url',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'username',
    label: '账号名',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'oldPassword',
    label: '密码',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    show: false,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'order',
    label: '排序',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    colProps: { span: 24 },
    show: false,
  },
];
