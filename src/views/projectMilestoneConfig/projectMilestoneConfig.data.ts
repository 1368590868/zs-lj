import { h } from 'vue';
import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { EllipsisText } from '/@/components/EllipsisText';

export const basicColumns: BasicColumn[] = [
  {
    title: '操作时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '操作人',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const formSchema = (count): FormSchema[] => {
  return [
    {
      field: `field[${count.value}].phaseTitle`,
      component: 'Input',
      label: `里程碑${count.value + 1}`,
      colProps: { span: 6 },
      slot: 'phaseTitle',
      required: true,
    },
    {
      field: `field[${count.value}].date`,
      colProps: { span: 6 },
      component: 'RangePicker',
      label: ' ',
      required: true,
    },
    {
      field: `field[${count.value}].phaseBudgetRatio`,
      component: 'Input',
      label: `预算比例`,
      colProps: { span: 6 },
      slot: 'phaseBudgetRatio',
    },
    {
      label: '阶段预算成本',
      field: `field[${count.value}].phaseBudgetCost`,
      component: 'Input',
      componentProps: {
        suffix: '元',
        disabled: true,
      },
      colProps: { span: 6 },
    },
  ];
};

export const schema: DescItem[] = [
  {
    field: 'projectName',
    label: '项目名称',
    render: (value) => {
      return h(EllipsisText, { maxWidth: 200, tooltipMaxWidth: 200 }, () => value);
    },
  },
  {
    field: 'generalBudget',
    label: '项目预算',
  },
  {
    field: 'date',
    label: '合同时间',
    render: (_, data) => {
      return `${data.planStartDate} - ${data.planEndDate}`;
    },
  },
  {
    field: 'deptName',
    label: '归属部门',
  },
  {
    field: 'projectOwnerName',
    label: '项目负责人',
  },
  {
    field: 'costOwnerName',
    label: '成本负责人',
  },
];
