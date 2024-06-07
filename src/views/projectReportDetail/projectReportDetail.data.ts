import { h } from 'vue';
import { FormSchema } from '/@/components/Table';
import { costSubjectEnum } from '/@/enums/projectControl';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    component: 'Select',
    label: 'id',
    show: false,
  },
  {
    field: 'projectName',
    component: 'Select',
    label: '项目名称',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return h(EllipsisText, { tooltip: model[field] }, () => model[field]);
    },
  },
  {
    field: 'projectNumber',
    component: 'Select',
    label: '项目编号',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return model[field];
    },
  },
  {
    field: 'deptName',
    component: 'Input',
    label: '归属部门',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return model[field];
    },
  },
  {
    field: 'contractPrice',
    component: 'Input',
    label: '合同金额',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return useCurrencyFormatter(model[field]) + '元';
    },
  },
  {
    field: 'date',
    component: 'Input',
    label: '工程计划时间',
    colProps: {
      span: 6,
    },
    render: ({ model }) => {
      return (
        (model['planEndDate'] || model['planStartDate']) &&
        `${model['planStartDate'] ?? ''} - ${model['planEndDate'] ?? ''}`
      );
    },
  },
  {
    field: 'projectOwnerName',
    component: 'Input',
    label: '项目负责人',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return model[field];
    },
  },
  {
    field: 'costLeaderStatus',
    component: 'Input',
    label: '成本负责人',
    colProps: {
      span: 6,
    },
    render: ({ model, field }) => {
      return model[field];
    },
  },
  {
    field: 'divider-required',
    component: 'Divider',
    label: '必填信息',

    colProps: {
      span: 24,
    },
  },
  {
    field: 'none',
    component: 'Input',
    label: '项目阶段',
    required: true,
    componentProps: {
      disabled: false,
    },
    span: 12,
  },

  {
    field: 'monthRatio',
    component: 'InputNumber',
    label: `${new Date().getMonth() + 1}月完成比例`,
    componentProps: {
      disabled: false,
      min: 0,
      formatter: (value) => `${value}%`,
      parser: (value) => value.replace('%', ''),
    },
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'predictMonthRatio',
    component: 'InputNumber',
    label: `预计未来3个月完成比例`,
    componentProps: {
      disabled: false,
      min: 0,
      formatter: (value) => `${value}%`,
      parser: (value) => value.replace('%', ''),
    },
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'predictYearRatio',
    component: 'InputNumber',
    label: `预计全年完成比例`,
    componentProps: {
      disabled: false,
      min: 0,
      formatter: (value) => `${value}%`,
      parser: (value) => value.replace('%', ''),
    },
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'divider-info',
    component: 'Divider',
    label: '项目合作信息',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'cooperationModel',
    component: 'Input',
    label: `合作模式`,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'cooperator',
    component: 'Input',
    label: `合作单位`,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'equipmentLeaseStatus',
    label: `是否有租赁设备`,
    helpMessage: '是否有因本项目而产生的租赁设备',
    colProps: {
      span: 8,
    },
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
  },
  {
    field: 'equipmentLeaseAmount',
    component: 'InputNumber',
    componentProps: {
      min: 0,
    },
    label: `租赁设备数量`,
    helpMessage: '租赁的检测设备数量',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'equipmentLeaseContractStatus',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    label: `是否签订租赁合同`,
    helpMessage: '租赁设备是否全部签订租赁合同',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'equipmentLeaseContractNumber',
    component: 'Input',
    label: `合同编号`,
    helpMessage: '涉及的全部租赁设备合同编号',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'equipmentLeaseCredentialStatus',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    label: `租赁设备是否在有效期`,
    helpMessage: '租赁设备的计量证书是否全部在有效期内',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'cooperatorPhone',
    component: 'Input',
    label: `合作单位负责人及电话`,
    helpMessage: '合作单位现场负责人及电话',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'projectPlanRemark',
    component: 'Input',
    label: `进度描述`,
    helpMessage: '进度描述+项目生产自身问题原因分析',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'businessConcern',
    component: 'Input',
    label: `业主关注或不满`,
    helpMessage: '业主关注或不满问题',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'nextPlan',
    component: 'Input',
    label: `下一步计划`,
    helpMessage: '下一步计划+是否需要公司支持',
    colProps: {
      span: 8,
    },
  },
];

export const ratioOptions = {
  janRatio: '1月',
  fedRatio: '2月',
  marRatio: '3月',
  aprRatio: '4月',
  mayRatio: '5月',
  junRatio: '6月',
  julRatio: '7月',
  augRatio: '8月',
  sepRatio: '9月',
  octRatio: '10月',
  novRatio: '11月',
  decRatio: '12月',
};
export const outputValueOptions = {
  janOutputValue: '1月',
  fedOutputValue: '2月',
  marOutputValue: '3月',
  aprOutputValue: '4月',
  mayOutputValue: '5月',
  junOutputValue: '6月',
  julOutputValue: '7月',
  augOutputValue: '8月',
  sepOutputValue: '9月',
  octOutputValue: '10月',
  novOutputValue: '11月',
  decOutputValue: '12月',
};

export const costOptions = {
  janCost: '1月',
  fedCost: '2月',
  marCost: '3月',
  aprCost: '4月',
  mayCost: '5月',
  junCost: '6月',
  julCost: '7月',
  augCost: '8月',
  sepCost: '9月',
  octCost: '10月',
  novCost: '11月',
  decCost: '12月',
};
