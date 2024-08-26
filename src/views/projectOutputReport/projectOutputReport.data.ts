import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, Tooltip } from 'ant-design-vue';
import { controlStatusOptions, warningStatusOptions } from '/@/enums/projectControl';
import { deptListApi } from '/@/api/project/project';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
import { useRouter } from 'vue-router';

export enum ActionType {
  ADD = '0',
  EDIT = '1',
  VIEW = '2',
}

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 220,
    fixed: 'left',
    customRender: ({ record }) => {
      return h(EllipsisText, { tooltip: record.projectName }, record.projectName);
    },
  },
  {
    title: '项目基本信息',
    dataIndex: 'projectInfos',
    children: [
      {
        title: '项目编号',
        dataIndex: 'projectNumber',
        width: 200,
      },
      {
        title: '合同额(元)',
        dataIndex: 'contractPrice',
        width: 130,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.contractPrice === 'number'
            ? useCurrencyFormatter(record.contractPrice)
            : '0.00';
        },
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
      {
        title: '项目负责人',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '项目规模',
        dataIndex: 'projectType',
        width: 200,
      },
      {
        title: '项目类别',
        dataIndex: 'businessTypeDescr',
        width: 200,
      },
      {
        title: '是否备案',
        dataIndex: 'filingStatus',
        width: 100,
        customRender: ({ record }) => {
          return h('div', getEnum(record.filingStatus));
        },
      },
      {
        title: '项目开始时间',
        helpMessage: '项目开始至项目结束时间',
        dataIndex: 'planStartDate',
        width: 150,
      },
      {
        title: '项目结束时间',
        helpMessage: '项目开始至项目结束时间',
        dataIndex: 'planEndDate',
        width: 150,
      },
      {
        title: '项目阶段',
        helpMessage: '已完成，正在做，后续准备做什么',
        dataIndex: 'planRemark',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.planRemark }, record.planRemark);
        },
      },
    ],
  },
  {
    title: '时间',
    dataIndex: 'sj',
    children: [
      {
        title: '年份',
        dataIndex: 'yearNum',
        width: 100,
      },
      {
        title: '月份',
        dataIndex: 'monthNum',
        width: 100,
      },
    ],
  },
  {
    title: '完成比例(%)',
    dataIndex: 'wcbl',
    children: [
      {
        title: '截止到上月完成百分比',
        dataIndex: 'lastMonthRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.lastMonthRatio}%` || '0%');
        },
      },
      {
        title: '本月内完成百分比',
        dataIndex: 'monthRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.monthRatio}%` || '0%');
        },
      },
      {
        title: '截止到本月完成的百分比',
        dataIndex: 'allYearRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.allYearRatio}%` || '0%');
        },
      },
    ],
  },
  {
    title: '计划完成比例',
    dataIndex: 'jhwcbl',
    children: [
      {
        title: '预计未来3个月完成比例',
        dataIndex: 'predictMonthRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.predictMonthRatio}%` || '0%');
        },
      },
      {
        title: '预计当年全年完成比例',
        dataIndex: 'predictYearRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.predictYearRatio}%` || '0%');
        },
      },
    ],
  },
  {
    title: '产值统计(元)',
    dataIndex: 'cztj',
    children: [
      {
        title: '截止到上月完成产值',
        dataIndex: 'lastMonthOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.lastMonthOutputValue === 'number'
            ? useCurrencyFormatter(record.lastMonthOutputValue)
            : '0.00';
        },
      },
      {
        title: '本月内完成产值',
        dataIndex: 'monthCost',
        align: 'right',
        width: 200,
        customRender: ({ record }) => {
          return typeof record.monthCost === 'number'
            ? useCurrencyFormatter(record.monthCost)
            : '0.00';
        },
      },
      {
        title: '截止目前完成的产值总额',
        dataIndex: 'allYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.allYearOutputValue === 'number'
            ? useCurrencyFormatter(record.allYearOutputValue)
            : '0.00';
        },
      },
      // 核对
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '截止到目前本年完成产值' },
          '截止到目前本年完成产值',
        ),
        dataIndex: 'thisYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.thisYearOutputValue === 'number'
            ? useCurrencyFormatter(record.thisYearOutputValue)
            : '0.00';
        },
      },
    ],
  },
  {
    title: '计划完成产值(元)',
    dataIndex: 'jhwccz',
    children: [
      {
        title: h(Tooltip, { placement: 'top', title: '预计未来3个月产值' }, '预计未来3个月产值'),
        dataIndex: 'predictMonthOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.predictMonthOutputValue === 'number'
            ? useCurrencyFormatter(record.predictMonthOutputValue)
            : '0.00';
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '预计当年全年完成产值' },
          '预计当年全年完成产值',
        ),
        dataIndex: 'predictYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.predictYearOutputValue === 'number'
            ? useCurrencyFormatter(record.predictYearOutputValue)
            : '0.00';
        },
      },
    ],
  },
  {
    title: '项目生产直接成本(元)',
    dataIndex: 'xmsczjcb',
    children: [
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '截止到上月已发生成本' },
          '截止到上月已发生成本',
        ),
        dataIndex: 'lastMonthCost',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.lastMonthCost === 'number'
            ? useCurrencyFormatter(record.lastMonthCost)
            : '0.00';
        },
      },
      {
        title: '本月内发生成本',
        dataIndex: 'monthBudget',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.monthBudget === 'number'
            ? useCurrencyFormatter(record.monthBudget)
            : '0.00';
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: `截止到本月已发生成本总额` },
          `截止到本月已发生成本总额`,
        ),
        dataIndex: 'allYearCost',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.allYearCost === 'number'
            ? useCurrencyFormatter(record.allYearCost)
            : '0.00';
        },
      },
    ],
  },
  {
    title: '项目合作信息',
    dataIndex: 'xmhzxx',
    children: [
      {
        title: '是否合作项目',
        dataIndex: 'cooperationStatus',
        width: 150,
        customRender: ({ record }) => {
          return h('div', getEnum(record.cooperationStatus));
        },
      },
      {
        title: '自有产值比例',
        dataIndex: 'selfOwnedRatio',
        width: 150,
        customRender: ({ record }) => {
          return h('div', `${record.selfOwnedRatio}%` || '0%');
        },
      },
      {
        title: '合作模式',
        dataIndex: 'cooperationModel',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.cooperationModel }, record.cooperationModel);
        },
      },
      {
        title: '合作单位',
        dataIndex: 'cooperator',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.cooperator }, record.cooperator);
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '是否有因本项目而产生的租赁设备' },
          '是否有因本项目而产生的租赁设备',
        ),
        dataIndex: 'equipmentLeaseStatus',
        width: 200,
        customRender: ({ record }) => {
          return h(
            EllipsisText,
            { tooltip: record.equipmentLeaseStatus },
            record.equipmentLeaseStatus,
          );
        },
      },
      {
        title: '租赁的检测设备数量',
        dataIndex: 'equipmentLeaseAmount',
        width: 200,
        customRender: ({ record }) => {
          return h(
            EllipsisText,
            { tooltip: record.equipmentLeaseAmount },
            record.equipmentLeaseAmount,
          );
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '因本项目而产生的租赁设备是否全部有已签订的租赁合同' },
          '因本项目而产生的租赁设备是否全部有已签订的租赁合同',
        ),
        dataIndex: 'equipmentLeaseContractStatus',
        width: 200,
        customRender: ({ record }) => {
          return h(
            EllipsisText,
            { tooltip: record.equipmentLeaseContractStatus },
            record.equipmentLeaseContractStatus,
          );
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '涉及的全部租赁设备合同编号' },
          '涉及的全部租赁设备合同编号',
        ),
        dataIndex: 'equipmentLeaseContractNumber',
        width: 200,
        customRender: ({ record }) => {
          return h(
            EllipsisText,
            { tooltip: record.equipmentLeaseContractNumber },
            record.equipmentLeaseContractNumber,
          );
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '租赁设备的计量证书是否全部在有效期内' },
          '租赁设备的计量证书是否全部在有效期内',
        ),
        dataIndex: 'equipmentLeaseCredentialStatus',
        width: 200,
        customRender: ({ record }) => {
          return h(
            EllipsisText,
            { tooltip: record.equipmentLeaseCredentialStatus },
            record.equipmentLeaseCredentialStatus,
          );
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '合作单位现场负责人及电话' },
          '合作单位现场负责人及电话',
        ),
        dataIndex: 'cooperatorPhone',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.cooperatorPhone }, record.cooperatorPhone);
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '进度描述+项目生产自身问题原因分析' },
          '进度描述+项目生产自身问题原因分析',
        ),
        dataIndex: 'planRemark',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.planRemark }, record.planRemark);
        },
      },
      {
        title: '业主关注或不满的问题',
        dataIndex: 'businessConcern',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.businessConcern }, record.businessConcern);
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '下一步计划+是否需要公司支持' },
          '下一步计划+是否需要公司支持',
        ),
        dataIndex: 'nextPlan',
        width: 200,
        customRender: ({ record }) => {
          return h(EllipsisText, { tooltip: record.nextPlan }, record.nextPlan);
        },
      },
    ],
  },
  {
    title: `本月自有产值(元)`,
    dataIndex: 'eyzycz',
    children: [
      // 自有当月产值
      {
        title: `本月实际完成产值`,
        dataIndex: 'thisMonthValueMonth',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.thisMonthValueMonth === 'number'
            ? useCurrencyFormatter(record.thisMonthValueMonth)
            : '0.00';
        },
      },
      {
        title: '累计实际完成产值',
        dataIndex: 'allValueMonth',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.allValueMonth === 'number'
            ? useCurrencyFormatter(record.allValueMonth)
            : '0.00';
        },
      },
      {
        title: '剩余产值',
        dataIndex: 'selfSurplusOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.selfSurplusOutputValue === 'number'
            ? useCurrencyFormatter(record.selfSurplusOutputValue)
            : '0.00';
        },
      },
      {
        title: '未来三个月预测产值',
        dataIndex: 'selfPredictMonthOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.selfPredictMonthOutputValue === 'number'
            ? useCurrencyFormatter(record.selfPredictMonthOutputValue)
            : '0.00';
        },
      },
      {
        title: '全年预测产值',
        dataIndex: 'selfPredictYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.selfPredictYearOutputValue === 'number'
            ? useCurrencyFormatter(record.selfPredictYearOutputValue)
            : '0.00';
        },
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'costOwnerName', label: '成本负责人', component: 'Input', colProps: { span: 6 } },
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
    field: 'updateStatus',
    label: '填写状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '已填写', value: 2 },
        { label: '未填写', value: 3 },
      ],
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'outputValueMonth',
    label: '统计月份',
    component: 'MonthPicker',
    componentProps: {
      picker: 'month',
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

// 判断当前值是否为null，如果是null则返回空字符串，如果是数字则返回是或否的字符串
export const getEnum = (value: number | null) => {
  if (value === null) {
    return '';
  }
  return value ? '是' : '否';
};
