import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { TypographyText } from 'ant-design-vue';
import {
  costChargeOptions,
  costSubjectEnum,
  myCostStatusEnum,
  singleCostStatusOptions,
} from '/@/enums/projectControl';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 220,
    fixed: 'left',
    customRender: ({ record }) => {
      return h(EllipsisText, { tooltip: record.projectName }, () => record.projectName);
    },
  },
  {
    title: '阶段',
    dataIndex: 'phaseTitle',
    width: 200,
  },
  {
    title: '成本科目',
    dataIndex: 'costTypeName',
    width: 120,
  },
  {
    title: '金额（元）',
    dataIndex: 'phaseBudget',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return useCurrencyFormatter(record.phaseBudget ?? 0);
    },
  },
  {
    title: '提交时间',
    dataIndex: 'costSubmitTime',
    width: 200,
  },
  {
    title: '最近修改时间',
    dataIndex: 'costSubmitTime',
    width: 200,
  },
  {
    title: '成本备注',
    dataIndex: 'remark',
    width: 200,
  },
  // 项目负责人审核状态（0-待审核1-已通过2-已驳回）
  {
    title: '项目负责人审核',
    dataIndex: 'projectLeaderStatus',
    width: 200,
    customRender: ({ record }) => {
      const idx = record.projectLeaderStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? costChargeOptions[+idx]
          : `${costChargeOptions[+idx] ?? ''} ${record.projectLeaderTime ?? ''}`,
      );
    },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costLeaderStatus',
    width: 200,
    customRender: ({ record }) => {
      const idx = record.costLeaderStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
        3: 'warning',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? singleCostStatusOptions[+idx]
          : `${singleCostStatusOptions[+idx] ?? ''} ${record.costLeaderTime ?? ''}`,
      );
    },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationDeptStatus',
    width: 200,
    customRender: ({ record }) => {
      const idx = record.operationDeptStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? costChargeOptions[+idx]
          : `${costChargeOptions[+idx] ?? ''} ${record.operationDeptTime ?? ''}`,
      );
    },
  },
  {
    title: '审批意见',
    dataIndex: 'auditOpinion',
    slots: { customRender: 'auditOpinion' },
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'projectLeaderStatus',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(myCostStatusEnum).map((key) => ({
        label: myCostStatusEnum[key],
        value: key,
      })),
    },
    colProps: { span: 6 },
  },
  {
    field: 'costSubmitTime',
    label: '提交时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
    },
    colProps: { span: 6 },
  },
  {
    field: 'costTypeName',
    label: '成本科目',
    component: 'Select',
    componentProps: {
      options: Object.values(costSubjectEnum).map((val) => ({
        label: val,
        value: val,
      })),
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '管控意见',
    field: 'auditOpinion',
    component: 'InputTextArea',
    componentProps: {
      rows: 12,
      disabled: true,
      placeholder: '暂无管控意见',
    },
    labelWidth: 80,
  },
];

export const formEditSchema: FormSchema[] = [
  {
    label: '成本科目',
    field: 'costTypeName',
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      options: Object.values(costSubjectEnum).map((val) => ({
        label: val,
        value: val,
      })),
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '金额（元）',
    field: 'phaseBudget',
    component: 'InputNumber',
    labelWidth: 80,
    componentProps: {
      precision: 2,
    },
    required: true,
  },
  {
    label: '成本备注',
    field: 'remark',
    component: 'InputTextArea',
    labelWidth: 80,
    componentProps: {
      rows: 4,
    },
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
