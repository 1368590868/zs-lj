import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { projectProgressEnum, warningStatusEnum } from '/@/enums/projectControl';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    width: 200,
  },
  {
    title: '管控状态',
    dataIndex: 'controlStatus',
    width: 200,
    slots: { customRender: 'controlStatus' },
  },
  {
    title: '预警状态',
    dataIndex: 'warningStatus',
    width: 200,
  },
  //   {
  //     title: '项目类型编码',
  //     dataIndex: 'projectTypeCode',
  //     width: 200,
  //   },
  {
    title: '项目类型',
    dataIndex: 'projectTypeName',
    width: 200,
  },
  {
    title: '项目区域',
    dataIndex: 'projectArea',
    width: 200,
  },
  {
    title: '归属部门',
    dataIndex: 'deptName',
    width: 200,
  },
  //   {
  //     title: '业务类型编码',
  //     dataIndex: 'businessTypeCode',
  //     width: 200,
  //   },
  {
    title: '业务类型',
    dataIndex: 'businessTypeName',
    width: 200,
  },
  {
    title: '总预算（元）',
    dataIndex: 'generalBudget',
    width: 200,
  },
  {
    title: '工程计划时间',
    dataIndex: 'planDate',
    width: 200,
    slots: { customRender: 'planDate' },
  },
  {
    title: '项目负责人名称',
    dataIndex: 'projectOwnerName',
    width: 200,
  },
  {
    title: '成本负责人',
    dataIndex: 'costLeader',
    width: 200,
  },
  {
    title: '工程进度',
    dataIndex: 'projectProgress',
    width: 200,
    slots: { customRender: 'projectProgress' },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },

  {
    title: '管控意见',
    dataIndex: 'controlOpinion',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
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
    field: 'projectProgress',
    label: '工程进度',
    component: 'Select',
    componentProps: {
      options: Object.keys(projectProgressEnum).map((key) => ({
        label: projectProgressEnum[key],
        value: key,
      })),
    },
    colProps: { span: 6 },
  },
  { field: 'controlStatus', label: '管控状态', component: 'Input', colProps: { span: 6 } },
  { field: 'projectTypeCode', label: '项目类型', component: 'Input', colProps: { span: 6 } },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
  { field: 'businessTypeCode', label: '业务类型', component: 'Input', colProps: { span: 6 } },
  {
    field: 'warningStatus',
    label: '预警状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(warningStatusEnum).map((key) => ({
        label: warningStatusEnum[key],
        value: key,
      })),
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '项目名称',
    field: 'projectName',
    component: 'Input',
    labelWidth: 120,
    render: ({ model, field }) => {
      return h('div', model[field]);
    },
  },
  {
    label: '项目负责人',
    field: 'projectOwnerName',
    component: 'Input',
    render: ({ model, field }) => {
      return h('div', model[field]);
    },
  },
  {
    label: '计划时间',
    field: 'planDate',
    component: 'Input',
    render: ({ model, field }) => {
      return h('div', model[field]);
    },
  },
  {
    label: '归属部门',
    field: 'deptName',
    component: 'Input',
    render: ({ model, field }) => {
      return h('div', model[field]);
    },
  },
  {
    label: '项目预算',
    field: 'generalBudget',
    component: 'Input',
    required: true,
    suffix: '元',
  },
  {
    label: '项目区域',
    field: 'projectArea',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: '区域1',
          value: '1',
        },
        {
          label: '区域2',
          value: '2',
        },
      ],
    },
  },
  {
    label: '是否备案',
    field: 'filingStatus',
    component: 'Select',
    required: true,
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
    label: '是否合作项目',
    field: 'cooperationStatus',
    component: 'Select',
    required: true,
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
    label: '自有产值比例',
    field: 'selfOwnedRatio',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
      max: 100,
    },
    suffix: '%',
  },
];