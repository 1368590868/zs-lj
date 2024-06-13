import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { TypographyText } from 'ant-design-vue';
import {
  costSubjectEnum,
  myCostStatusEnum,
  singleCostStatusOptions,
} from '/@/enums/projectControl';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';

const textType = {
  0: 'warning',
  1: 'success',
  2: 'danger',
  3: 'warning',
};

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
    title: '提交人',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '成本科目',
    dataIndex: 'costTypeName',
    width: 150,
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
    dataIndex: 'createTime',
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
    dataIndex: 'projectOwnerName',
    width: 200,
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: textType[record.projectLeaderStatus] },
        `${myCostStatusEnum[record.projectLeaderStatus] ?? ''} ${record.projectLeaderTime ?? ''}`,
      );
    },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costOwnerName',
    width: 200,
    slots: { customRender: 'costLeaderStatus' },
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: textType[+record.costLeaderStatus] },
        `${singleCostStatusOptions[record.costLeaderStatus] ?? ''} ${record.costLeaderTime ?? ''}`,
      );
    },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationOwnerName',
    width: 200,
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: textType[record.operationDeptStatus] },
        `${singleCostStatusOptions[record.operationDeptStatus] ?? ''} ${
          record.operationDeptTime ?? ''
        }`,
      );
    },
  },
  // {
  //   title: '审批意见',
  //   dataIndex: 'projectLeaderStatus',
  //   width: 200,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'date',
    label: '创建时间',
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
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '审批意见',
    field: 'auditOpinion',
    component: 'InputTextArea',
    componentProps: {
      rows: 12,
      disabled: true,
      placeholder: '暂无审批意见',
    },
    labelWidth: 80,
  },
];
