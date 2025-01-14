import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { TypographyText } from 'ant-design-vue';
import { milestoneControlStatusEnum, warningStatusOptions } from '/@/enums/projectControl';
import { deptListApi } from '/@/api/project/project';
import { EllipsisText } from '/@/components/EllipsisText';

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
    width: 150,
    customRender: ({ record }) => {
      return h(
        EllipsisText,
        { tooltip: record.projectOwnerName, maxWidth: '140px' },
        () => record.projectOwnerName,
      );
    },
  },
  {
    title: '归属部门',
    dataIndex: 'deptName',
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
    width: 210,
    customRender: ({ record }) => {
      return h('span', record.phaseStartDate + ' 至 ' + record.phaseEndDate);
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
    width: 100,
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: record?.controlStatus === 2 ? 'secondary' : null },
        milestoneControlStatusEnum[record?.controlStatus],
      );
    },
  },
  {
    title: '预警状态',
    dataIndex: 'warningStatus',
    width: 100,
    customRender: ({ record }) => {
      const status = record.warningStatus ?? 0;

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
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
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
    label: '阶段',
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
