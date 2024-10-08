import { h } from 'vue';
import { DescItem } from '/@/components/Description';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';

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
      itemProps: {
        colon: false,
      },
      labelWidth: 50,
      slot: 'date',
      required: true,
    },

    {
      field: `field[${count.value}].phaseBudgetRatio`,
      component: 'Input',
      label: `预算比例`,
      colProps: { span: 6 },
      suffix: '%',
      slot: 'phaseBudgetRatio',
      required: true,
    },
    {
      label: '阶段预算成本',
      field: `field[${count.value}].phaseBudgetCost`,
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      suffix: '元',
      labelWidth: 105,
      colProps: { span: 6 },
    },
    // 用于form赋值
    {
      field: `field[${count.value}].datedate`,
      colProps: { span: 4 },
      component: 'RangePicker',
      label: 'Date',
      ifShow: false,
    },
    {
      field: `field[${count.value}].id`,
      component: 'Input',
      label: 'ID',
      ifShow: false,
    },
  ];
};

export const schema: DescItem[] = [
  {
    field: 'projectName',
    label: '项目名称',
    render: (value) => {
      return h(EllipsisText, { maxWidth: 200, tooltipMaxWidth: 200, tooltip: value }, () => value);
    },
  },
  {
    field: 'generalBudget',
    label: '项目预算(元)',
    render: (value) => {
      return useCurrencyFormatter(value);
    },
  },
  {
    field: 'date',
    label: '工程计划时间',
    render: (_, data) => {
      return `${data.planStartDate ?? '-'} 至 ${data.planEndDate ?? '-'}`;
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
