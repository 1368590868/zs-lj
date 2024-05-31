import { FormSchema } from '/@/components/Table';
import { costSubjectEnum } from '/@/enums/projectControl';
export const formSchema: FormSchema[] = [
  {
    field: 'projectId',
    component: 'Select',
    label: '成本项目',
    slot: 'costProject',
    required: true,
  },
  {
    field: 'costTypeName',
    component: 'Select',
    label: '成本科目',
    componentProps: {
      options: Object.values(costSubjectEnum).map((val) => ({
        label: val,
        value: val,
      })),
    },
    required: true,
  },
  {
    field: 'phaseBudget',
    component: 'InputNumber',
    componentProps: {
      precision: 2,
    },
    label: '成本金额',
    suffix: '元',
    required: true,
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '填报人',
    slot: 'user',
  },
  {
    field: ' ',
    component: 'Input',
    label: '填写时间',
    slot: 'nowTime',
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      showCount: true,
      maxLength: 20,
    },
  },
  {
    field: ' ',
    component: 'Input',
    label: '',
    slot: 'tips',
    colProps: { span: 24 },
  },
];
