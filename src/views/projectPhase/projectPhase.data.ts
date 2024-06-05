import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import {
  controlStatusOptions,
  milestoneControlStatusEnum,
  warningStatusOptions,
} from '/@/enums/projectControl';
import { deptListApi } from '/@/api/project/project';

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
    title: '归属部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '项目负责人',
    dataIndex: 'projectOwnerName',
    width: 200,
  },
  {
    title: '里程碑名称',
    dataIndex: 'phaseTitle',
    width: 200,
  },
  {
    title: '阶段时间',
    dataIndex: 'phaseStartDate',
    width: 200,
    customRender: ({ record }) => {
      return h('span', record.phaseStartDate + ' ~ ' + record.phaseEndDate);
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },

  // 状态（0正常1删除）
  {
    title: '管控状态',
    dataIndex: 'controlStatus',
    width: 200,
    customRender: ({ record }) => {
      return h('span', milestoneControlStatusEnum[record?.controlStatus]);
    },
  },
  {
    title: '预警状态',
    dataIndex: 'warningStatus',
    width: 200,
    customRender: ({ record }) => {
      return h('span', warningStatusOptions[record?.warningStatus]);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
  {
    field: 'deptName',
    label: '归属部门',
    component: 'ApiSelect',
    componentProps: {
      api: deptListApi,
      labelField: 'deptName',
      valueField: 'deptNumber',
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
      options: Object.keys(milestoneControlStatusEnum).map((key) => ({
        label: milestoneControlStatusEnum[key],
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
    field: 'date',
    label: '创建时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '项目id',
    field: 'projectId',
    component: 'Input',
  },
  {
    label: '阶段预算成本',
    field: 'phaseBudgetCost',
    component: 'Input',
  },
  {
    label: '阶段实际成本',
    field: 'phaseOutlayCost',
    component: 'Input',
  },
  {
    label: '阶段名称',
    field: 'phaseName',
    component: 'Input',
  },
  {
    label: '阶段标题',
    field: 'phaseTitle',
    component: 'Input',
  },
  {
    label: '阶段开始时间',
    field: 'phaseStartDate',
    component: 'Input',
  },
  {
    label: '阶段结束时间',
    field: 'phaseEndDate',
    component: 'Input',
  },
  {
    label: '管控状态（0-待开始1-进行中2-待审核3-已完成）',
    field: 'controlStatus',
    component: 'Input',
  },
  {
    label: '通知状态（0-未通知1-已黄色预警通知2-已红色预警通知）',
    field: 'messageStatus',
    component: 'Input',
  },
  {
    label: '审核时间',
    field: 'auditTime',
    component: 'Input',
  },
  {
    label: '创建者名称',
    field: 'createByName',
    component: 'Input',
  },
  {
    label: '更新者名称',
    field: 'updateByName',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '状态（0正常1删除）',
    field: 'status',
    component: 'Input',
  },
  {
    label: '排序',
    field: 'order',
    component: 'Input',
  },
];
