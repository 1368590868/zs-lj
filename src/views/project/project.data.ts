import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import {
  controlStatusOptions,
  gsStatusOptions,
  professionTypeEnum,
  professionTypeTree,
  projectProgressOptions,
  projectTypeEnum,
  provinceEnum,
  warningStatusOptions,
} from '/@/enums/projectControl';
import { TypographyText } from 'ant-design-vue';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
import { EllipsisText } from '/@/components/EllipsisText';
import { deptListApi } from '/@/api/project/project';

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
    title: '项目编号',
    dataIndex: 'projectNumber',
    width: 160,
  },
  {
    title: '项目负责人',
    dataIndex: 'projectOwnerName',
    width: 120,
  },
  {
    title: '成本负责人',
    dataIndex: 'costOwnerName',
    width: 120,
  },
  {
    title: '工程进度',
    dataIndex: 'projectProgress',
    width: 100,
    slots: { customRender: 'projectProgress' },
  },
  {
    title: '管控状态',
    dataIndex: 'controlStatus',
    width: 100,
    slots: { customRender: 'controlStatus' },
  },
  {
    title: '项目状态',
    dataIndex: 'gsStatus',
    width: 100,
    customRender: ({ record }) => {
      return h('span', gsStatusOptions[record.gsStatus]);
    },
  },
  {
    title: '预警状态',
    dataIndex: 'warningStatus',
    width: 100,
    customRender: ({ record }) => {
      const status = record.warningStatus;

      const colorEnum = [{ success: '正常' }, { warning: '黄色警告' }, { danger: '红色警告' }];
      return typeof status === 'number'
        ? h(
            TypographyText,
            { type: Object.keys(colorEnum[status]) },
            Object.values(colorEnum[status]),
          )
        : ' ';
    },
  },
  {
    title: '项目类型',
    dataIndex: 'projectType',
    width: 100,
  },
  {
    title: '项目区域',
    dataIndex: 'projectArea',
    width: 150,
  },
  {
    title: '归属部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '业务类型',
    dataIndex: 'businessTypeDescr',
    width: 180,
  },
  {
    title: '总预算（元）',
    dataIndex: 'generalBudget',
    width: 150,
    align: 'right',
    customRender: ({ record }) => {
      return useCurrencyFormatter(record.generalBudget);
    },
  },
  {
    title: '工程计划开始时间',
    dataIndex: 'planStartDate',
    width: 150,
  },
  {
    title: '工程计划结束时间',
    dataIndex: 'planEndDate',
    width: 150,
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
    defaultHidden: true,
  },

  {
    title: '管控意见',
    dataIndex: 'remark',
    width: 250,
    customRender: ({ record }) => {
      return h(
        EllipsisText,
        { maxWidth: 200, tooltipMaxWidth: 200, tooltip: record.remark },
        () => record.remark,
      );
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  {
    field: 'deptCode',
    label: '归属部门',
    component: 'ApiSelect',
    componentProps: {
      api: deptListApi,
      labelField: 'deptName',
      valueField: 'deptCode',
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
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
      mode: 'multiple',
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
      mode: 'multiple',
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    label: '项目类型',
    field: 'projectType',
    component: 'Select',
    componentProps: {
      showSearch: true,
      mode: 'multiple',
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      options: Object.values(projectTypeEnum).map((val) => ({ label: val, value: val })),
    },
    colProps: { span: 6 },
  },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
  {
    label: '业务类型',
    field: 'professionTypes',
    component: 'TreeSelect',
    componentProps: {
      dropdownStyle: { maxHeight: '300px' },
      treeData: professionTypeTree(false),
      replaceFields: {
        label: 'label',
        key: 'value',
        value: 'value',
      },
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      getPopupContainer: () => document.body,
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
      mode: 'multiple',
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'gsStatus',
    label: '项目状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(gsStatusOptions).map((key) => ({
        label: gsStatusOptions[key],
        value: key,
      })),
      showSearch: true,
      mode: 'multiple',
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'gcplanStartDate',
    label: '工程计划开始时间',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
  {
    field: 'gcplanEndDate',
    label: '工程计划结束时间止',
    component: 'RangePicker',
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
      return h(
        EllipsisText,
        { tooltip: model[field], maxWidth: 500, tooltipMaxWidth: 500 },
        () => model[field],
      );
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
    component: 'InputNumber',
    componentProps: {
      min: 1,
      precision: 2,
    },
    suffix: '元',
    required: true,
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
      precision: 2,
    },
    suffix: '%',
  },
];
