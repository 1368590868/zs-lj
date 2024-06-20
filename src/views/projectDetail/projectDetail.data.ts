import { TypographyText } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import {
  costChargeOptions,
  costSubjectEnum,
  myCostStatusEnum,
  singleCostStatusOptions,
} from '/@/enums/projectControl';
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
      maxlength: 450,
      showCount: true,
    },
    required: true,
    labelWidth: 80,
  },
  {
    label: '项目ID',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

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
    width: 150,
  },
  {
    title: '成本科目',
    dataIndex: 'costTypeName',
    width: 200,
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
    dataIndex: 'projectLeaderStatus',
    width: 250,
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
          : `${record.projectNickName ?? ''} ${costChargeOptions[+idx] ?? ''} ${
              record.projectLeaderTime ?? ''
            }`,
      );
    },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costLeaderStatus',
    width: 250,
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
          : `${record.costNickName ?? ''} ${singleCostStatusOptions[+idx] ?? ''} ${
              record.costLeaderTime ?? ''
            }`,
      );
    },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationOwnerName',
    width: 250,
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
          : `${record.operationNickName ?? ''} ${costChargeOptions[+idx] ?? ''} ${
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
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      options: Object.values(costSubjectEnum).map((val) => ({
        label: val,
        value: val,
      })),
    },
    colProps: { span: 6 },
  },
  {
    field: 'allStatus',
    label: '成本状态',
    component: 'Select',
    helpMessage:
      '驳回状态根据项目负责人审核状态来判断，通过状态和待审核状态根据成本负责人审核状态来判断',
    componentProps: {
      options: Object.keys(myCostStatusEnum)
        .filter((key) => key !== '3')
        .map((key) => ({
          label: myCostStatusEnum[key],
          value: key,
        })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
];
