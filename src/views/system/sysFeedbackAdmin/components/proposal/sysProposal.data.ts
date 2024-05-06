import { listDataDictApi } from '/@/api/sys/dictionary';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '状态',
    dataIndex: 'readState',
    width: 200,
    customRender: ({ record }) => {
      const readState = record.readState;
      let txt = '';
      switch (readState) {
        case 1:
          txt = '已读';
          break;
        case 2:
          txt = '未读';
          break;
      }
      return txt;
    },
  },
  {
    title: '建议描述',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '附件',
    dataIndex: 'attachments',
    slots: { customRender: 'attachments' },
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
  {
    title: '租户',
    dataIndex: 'tenantId',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'readState',
    label: '已读状态',
    labelWidth: 60,
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_read_status',
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
export const formSchema: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '状态（1、已读，2、未读）',
    field: 'readState',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '是否删除（0 未删，1 已删）',
    field: 'status',
    component: 'Input',
  },
  {
    label: '排序',
    field: 'order',
    component: 'Input',
  },
];
