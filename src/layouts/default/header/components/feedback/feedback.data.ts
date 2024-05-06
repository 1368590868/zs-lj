import { FormSchema } from '/@/components/Table';
import { listDataDictApi } from '/@/api/sys/dictionary';
import { getMenuTreeList } from '/@/api/sys/menu';
import { modelKeyEnum } from '/@/enums/moduleEnum';
export const problemFormSchema: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '故障类型',
    field: 'errorType',
    required: true,
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
  },
  {
    label: '故障时间',
    field: 'errorTime',
    component: 'DatePicker',
    slot: 'errorTime',
  },
  {
    label: '所属模块',
    field: 'modelName',
    component: 'ApiTreeSelect',
    componentProps: {
      api: getMenuTreeList,
      params: {
        modelKey: modelKeyEnum.KEY,
        type: 'Web',
      },
      replaceFields: {
        label: 'label',
        key: 'id',
        value: 'label',
      },
    },
  },

  {
    label: '故障描述',
    field: 'remark',
    required: true,
    component: 'InputTextArea',
    slot: 'remark',
  },
  {
    label: '附件',
    field: 'attachments',
    component: 'Upload',
    slot: 'attachments',
  },
];
export const optFormSchema: FormSchema[] = [
  {
    label: '建议描述',
    field: 'remark',
    required: true,
    component: 'InputTextArea',
    slot: 'remark',
  },
  {
    label: '附件',
    field: 'attachments',
    component: 'Upload',
    slot: 'attachments',
  },
];
