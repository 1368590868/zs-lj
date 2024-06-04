import { FormSchema } from '/@/components/Table';
import { costSubjectEnum } from '/@/enums/projectControl';
export const formSchema: FormSchema[] = [
  {
    field: 'id',
    component: 'Select',
    label: '项目名称',
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
      return model[field];
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
      return model[field];
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
      console.log(model);
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
    componentProps: {
      required: true,
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'monthRatio',
    component: 'InputNumber',
    label: `${new Date().getMonth() + 1}完成比例`,
    componentProps: {
      required: true,
    },
    suffix: '%',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'predictMonthRatio',
    component: 'InputNumber',
    label: `预计未来3个月完成比例`,
    componentProps: {
      required: true,
    },
    suffix: '%',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'predictYearRatio',
    component: 'InputNumber',
    label: `预计全年完成比例`,
    componentProps: {
      required: true,
    },

    suffix: '%',
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
    field: 'cooperator',
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
    },
  },
  {
    field: 'equipmentLeaseAmount',
    component: 'InputNumber',
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
