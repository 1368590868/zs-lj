import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { listDataDictApi } from '/@/api/sys/dictionary';

export const columns: BasicColumn[] = [
  {
    title: '故障时间',
    dataIndex: 'errorTime',
  },
  {
    title: '反馈描述',
    dataIndex: 'remark',
  },
  {
    title: '附件',
    dataIndex: 'attachments',
    slots: { customRender: 'attachments' },
  },
  {
    title: '所属模块',
    dataIndex: 'modelName',
  },
  {
    title: '故障类型',
    dataIndex: 'errorType',
  },
  {
    title: '处理状态',
    dataIndex: 'state',

    customRender: ({ record }) => {
      const readState = record.state;
      let txt = '';
      switch (readState) {
        case 0:
          txt = '未处理';
          break;
        case 1:
          txt = '已处理';
          break;
        case 2:
          txt = '暂不处理';
          break;
      }
      return txt;
    },
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '租户',
    dataIndex: 'tenantId',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'errorType',
    label: '错误类型',
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_fault_type',
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
    colProps: { span: 3 },
  },
  {
    field: 'state',
    label: '处理状态',
    labelWidth: 80,
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_feedback_status',
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
    colProps: { span: 3 },
  },
  {
    field: 'fieldTime',
    label: '时间范围',
    labelWidth: 80,
    component: 'RangePicker',
    slot: 'fieldTime',
    colProps: { span: 6 },
  },
];
export const StatusFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'state',
    label: '选择',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '未处理', value: 0 },
        { label: '已处理', value: 1 },
        { label: '暂不处理', value: 2 },
      ],
    },
  },
];
