import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '表名称',
    dataIndex: 'tableName',
    width: 200,
  },
  {
    title: '表描述',
    dataIndex: 'tableComment',
    width: 250,
  },
  {
    title: '实体类名称',
    dataIndex: 'className',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
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
export const keyFormSchema: FormSchema[] = [
  {
    field: 'packageName',
    label: '生成包路径',
    required: true,
    component: 'Input',
  },
  {
    field: 'functionName',
    label: '工程路径',
    required: true,
    component: 'Input',
  },
  {
    field: 'functionAuthor',
    label: '作者',
    required: true,
    component: 'Input',
  },
  {
    field: 'dsName',
    label: '数据源',
    component: 'Input',
    show: false,
  },
  {
    field: 'tableName',
    label: '表明',
    component: 'Input',
    show: false,
  },
];
