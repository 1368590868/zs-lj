import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '类名',
    dataIndex: 'className',
    width: 200,
  },
  {
    title: '方法名',
    dataIndex: 'methodName',
    width: 200,
  },
  {
    title: '异常名称',
    dataIndex: 'errorName',
    width: 200,
  },
  {
    title: '异常详情',
    dataIndex: 'errorDetail',
    width: 200,
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
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
    label: '方法名',
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
    label: '类名',
    field: 'className',
    component: 'Input',
  },
  {
    label: '方法名',
    field: 'methodName',
    component: 'Input',
  },
  {
    label: '异常名称',
    field: 'errorName',
    component: 'Input',
  },
  {
    label: '异常详情',
    field: 'errorDetail',
    component: 'Input',
  },
];
