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
    title: '操作类型',
    dataIndex: 'type',
    width: 200,
  },
  {
    title: '操作内容',
    dataIndex: 'operateContent',
    width: 200,
  },
  {
    title: '操作描述',
    dataIndex: 'operateDesc',
    width: 200,
  },
  {
    title: '租户id',
    dataIndex: 'tenantId',
    width: 200,
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'fieldTime',
    label: '时间范围',
    slot: 'fieldTime',
    component: 'RangePicker',
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
    label: '操作类型',
    field: 'type',
    component: 'Input',
  },
  {
    label: '操作内容',
    field: 'operateContent',
    component: 'Input',
  },
  {
    label: '操作描述',
    field: 'operateDesc',
    component: 'Input',
  },
];
