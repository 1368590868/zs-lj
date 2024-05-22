import { BasicColumn, FormSchema } from '/@/components/Table';

export const basicColumns: BasicColumn[] = [
  {
    title: '操作时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '操作人',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'logText',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '管控意见',
    field: 'auditOpinion',
    component: 'InputTextArea',
    componentProps: {
      rows: 12,
      placeholder: '请输入您对项目的管控意见',
    },
    labelWidth: 80,
  },
  {
    label: '项目ID',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
