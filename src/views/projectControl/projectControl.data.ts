import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import {
  controlStatusOptions,
  projectProgressOptions,
  provinceEnum,
  warningStatusOptions,
} from '/@/enums/projectControl';
import { TypographyText } from 'ant-design-vue';
import { EllipsisText } from '/@/components/EllipsisText';

export const columns: BasicColumn[] = [
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
    fixed: 'left',
    customRender: ({ record }) => {
      return h(EllipsisText, { tooltip: record.projectName }, () => record.projectName);
    },
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
    customRender: ({ record }) => {
      const status = record.warningStatus ?? 0;
      const colorEnum = [{ success: '正常' }, { warning: '黄色警告' }, { danger: '红色警告' }];
      return h(
        TypographyText,
        { type: Object.keys(colorEnum[status])[0] },
        Object.values(colorEnum[status])[0],
      );
    },
  },
  {
    title: '总预算（元）',
    dataIndex: 'generalBudget',
    width: 200,
  },
  {
    title: '实际成本（元）',
    dataIndex: 'totalCost',
    width: 200,
  },
  {
    title: '工程计划时间',
    dataIndex: 'planDate',
    width: 200,
    slots: { customRender: 'planDate' },
  },

  {
    title: '项目负责人',
    dataIndex: 'projectOwnerName',
    width: 200,
  },
  {
    title: '工程进度',
    dataIndex: 'projectProgress',
    width: 200,
    slots: { customRender: 'projectProgress' },
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
    field: 'projectProgress',
    label: '工程进度',
    component: 'Select',
    componentProps: {
      options: Object.keys(projectProgressOptions).map((key) => ({
        label: projectProgressOptions[key],
        value: key,
      })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'warningStatus',
    label: '预警状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(warningStatusOptions).map((key) => ({
        label: warningStatusOptions[key],
        value: key,
      })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'controlStatus',
    label: '管控状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(controlStatusOptions).map((key) => ({
        label: controlStatusOptions[key],
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
      options: provinceEnum.map((x) => ({ label: x.name, value: x.name })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
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
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
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
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
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
