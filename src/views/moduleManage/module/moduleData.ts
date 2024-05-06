import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'modelKey',
  },
  {
    title: '系统名称',
    dataIndex: 'name',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    slots: { customRender: 'icon' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '表名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dictType',
    label: '表描述',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fieldTime',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];
export const dadaSourceSchema: FormSchema[] = [
  {
    field: 'name',
    label: '系统名称',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'modelKey',
    label: '模块key',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'icon',
    label: '图标',
    required: true,
    component: 'Upload',
    slot: 'icon',
    colProps: { span: 24 },
  },
  {
    field: 'url',
    label: 'url路径',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    colProps: { span: 24 },
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
];
