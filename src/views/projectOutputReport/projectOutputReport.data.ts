import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, Tooltip } from 'ant-design-vue';
import { controlStatusOptions, warningStatusOptions } from '/@/enums/projectControl';
import { deptListApi } from '/@/api/project/project';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';

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
        title: '项目类型',
        dataIndex: 'projectTypeName',
        width: 200,
      },
      {
        title: '业务类型',
        dataIndex: 'businessTypeName',
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
        title: '工程期限',
        helpMessage: '项目开始至项目结束时间',
        dataIndex: 'gcqx',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.planStartDate}~${record.planEndDate}`);
        },
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
    title: '完成比例',
    dataIndex: 'wcbl',
    children: [
      {
        title: '截止上年底完成比例',
        dataIndex: 'lastYearRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.lastYearRatio}%` || '0%');
        },
      },
      {
        title: '截止目前累计完成比例',
        dataIndex: 'allYearRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.allYearRatio}%` || '0%');
        },
      },
      {
        title: '1月',
        dataIndex: 'janRatio',
        width: new Date().getMonth() + 1 >= 1 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.janRatio}%` || '0%');
        },
      },
      {
        title: '2月',
        dataIndex: 'fedRatio',
        width: new Date().getMonth() + 1 >= 2 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.fedRatio}%` || '0%');
        },
      },
      {
        title: '3月',
        dataIndex: 'marRatio',
        width: new Date().getMonth() + 1 >= 3 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.marRatio}%` || '0%');
        },
      },
      {
        title: '4月',
        dataIndex: 'aprRatio',
        width: new Date().getMonth() + 1 >= 4 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.aprRatio}%` || '0%');
        },
      },
      {
        title: '5月',
        dataIndex: 'mayRatio',
        width: new Date().getMonth() + 1 >= 5 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.mayRatio}%` || '0%');
        },
      },
      {
        title: '6月',
        dataIndex: 'junRatio',
        width: new Date().getMonth() + 1 >= 6 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.junRatio}%` || '0%');
        },
      },
      {
        title: '7月',
        dataIndex: 'julRatio',
        width: new Date().getMonth() + 1 >= 7 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.julRatio}%` || '0%');
        },
      },
      {
        title: '8月',
        dataIndex: 'augRatio',
        width: new Date().getMonth() + 1 >= 8 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.augRatio}%` || '0%');
        },
      },
      {
        title: '9月',
        dataIndex: 'sepRatio',
        width: new Date().getMonth() + 1 >= 9 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.sepRatio}%` || '0%');
        },
      },
      {
        title: '10月',
        dataIndex: 'octRatio',
        width: new Date().getMonth() + 1 >= 10 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.octRatio}%` || '0%');
        },
      },
      {
        title: '11月',
        dataIndex: 'novRatio',
        width: new Date().getMonth() + 1 >= 11 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.novRatio}%` || '0%');
        },
      },
      {
        title: '12月',
        dataIndex: 'decRatio',
        width: new Date().getMonth() + 1 >= 12 ? 80 : 0,
        customRender: ({ record }) => {
          return h('div', `${record.decRatio}%` || '0%');
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
        title: '预计全年完成比例',
        dataIndex: 'predictYearRatio',
        width: 200,
        customRender: ({ record }) => {
          return h('div', `${record.predictYearRatio}%` || '0%');
        },
      },
    ],
  },
  {
    title: '产值统计',
    dataIndex: 'cztj',
    children: [
      {
        title: '截止上年度完成产值（元）',
        dataIndex: 'lastYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.lastYearOutputValue === 'number'
            ? useCurrencyFormatter(record.lastYearOutputValue)
            : '0.00';
        },
      },
      {
        title: '截止目前累计完成产值（元）',
        dataIndex: 'allYearOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.allYearOutputValue === 'number'
            ? useCurrencyFormatter(record.allYearOutputValue)
            : '0.00';
        },
      },
      {
        title: '1月完成产值（元）',
        dataIndex: 'janOutputValue',
        width: new Date().getMonth() + 1 >= 1 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.janOutputValue === 'number'
            ? useCurrencyFormatter(record.janOutputValue)
            : '0.00';
        },
      },
      {
        title: '2月完成产值（元）',
        dataIndex: 'fedOutputValue',
        width: new Date().getMonth() + 1 >= 2 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.fedOutputValue === 'number'
            ? useCurrencyFormatter(record.fedOutputValue)
            : '0.00';
        },
      },
      {
        title: '3月完成产值（元）',
        dataIndex: 'marOutputValue',
        width: new Date().getMonth() + 1 >= 3 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.marOutputValue === 'number'
            ? useCurrencyFormatter(record.marOutputValue)
            : '0.00';
        },
      },
      {
        title: '4月完成产值（元）',
        dataIndex: 'aprOutputValue',
        width: new Date().getMonth() + 1 >= 4 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.aprOutputValue === 'number'
            ? useCurrencyFormatter(record.aprOutputValue)
            : '0.00';
        },
      },
      {
        title: '5月完成产值（元）',
        dataIndex: 'mayOutputValue',
        width: new Date().getMonth() + 1 >= 5 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.mayOutputValue === 'number'
            ? useCurrencyFormatter(record.mayOutputValue)
            : '0.00';
        },
      },
      {
        title: '6月完成产值（元）',
        dataIndex: 'junOutputValue',
        width: new Date().getMonth() + 1 >= 6 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.junOutputValue === 'number'
            ? useCurrencyFormatter(record.junOutputValue)
            : '0.00';
        },
      },
      {
        title: '7月完成产值（元）',
        dataIndex: 'julOutputValue',
        width: new Date().getMonth() + 1 >= 7 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.julOutputValue === 'number'
            ? useCurrencyFormatter(record.julOutputValue)
            : '0.00';
        },
      },
      {
        title: '8月完成产值（元）',
        dataIndex: 'augOutputValue',
        width: new Date().getMonth() + 1 >= 8 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.augOutputValue === 'number'
            ? useCurrencyFormatter(record.augOutputValue)
            : '0.00';
        },
      },
      {
        title: '9月完成产值（元）',
        dataIndex: 'sepOutputValue',
        width: new Date().getMonth() + 1 >= 9 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.sepOutputValue === 'number'
            ? useCurrencyFormatter(record.sepOutputValue)
            : '0.00';
        },
      },
      {
        title: '10月完成产值（元）',
        dataIndex: 'octOutputValue',
        width: new Date().getMonth() + 1 >= 10 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.octOutputValue === 'number'
            ? useCurrencyFormatter(record.octOutputValue)
            : '0.00';
        },
      },
      {
        title: '11月完成产值（元）',
        dataIndex: 'novOutputValue',
        width: new Date().getMonth() + 1 >= 11 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.novOutputValue === 'number'
            ? useCurrencyFormatter(record.novOutputValue)
            : '0.00';
        },
      },
      {
        title: '12月完成产值（元）',
        dataIndex: 'decOutputValue',
        width: new Date().getMonth() + 1 >= 12 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.decOutputValue === 'number'
            ? useCurrencyFormatter(record.decOutputValue)
            : '0.00';
        },
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '截止目前本年度完成产值（元）' },
          '截止目前本年度完成产值（元）',
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
      {
        title: '剩余产值（元）',
        dataIndex: 'surplusOutputValue',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.surplusOutputValue === 'number'
            ? useCurrencyFormatter(record.surplusOutputValue)
            : '0.00';
        },
      },
    ],
  },
  {
    title: '计划完成产值',
    dataIndex: 'jhwccz',
    children: [
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '预计未来3个月完成产值（元）' },
          '预计未来3个月完成产值（元）',
        ),
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
          { placement: 'top', title: '预计全年完成产值（元）' },
          '预计全年完成产值（元）',
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
    title: '项目生产直接成本',
    dataIndex: 'xmsczjcb',
    children: [
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '截止上年度已发生生产成本（元）' },
          '截止上年度已发生生产成本（元）',
        ),
        dataIndex: 'lastYearCost',
        width: 200,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.lastYearCost === 'number'
            ? useCurrencyFormatter(record.lastYearCost)
            : '0.00';
        },
      },
      // 当前年份
      {
        title: h(
          Tooltip,
          { placement: 'top', title: `截止${new Date().getFullYear()}年已发生生产成本（元）` },
          `截止${new Date().getFullYear()}年已发生生产成本（元）`,
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
      {
        title: '1月生产成本（元）',
        dataIndex: 'janCost',
        width: new Date().getMonth() + 1 >= 1 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.janCost === 'number' ? useCurrencyFormatter(record.janCost) : '0.00';
        },
      },
      {
        title: '2月生产成本（元）',
        dataIndex: 'fedCost',
        width: new Date().getMonth() + 1 >= 2 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.fedCost === 'number' ? useCurrencyFormatter(record.fedCost) : '0.00';
        },
      },
      {
        title: '3月生产成本（元）',
        dataIndex: 'marCost',
        width: new Date().getMonth() + 1 >= 3 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.marCost === 'number' ? useCurrencyFormatter(record.marCost) : '0.00';
        },
      },
      {
        title: '4月生产成本（元）',
        dataIndex: 'aprCost',
        width: new Date().getMonth() + 1 >= 4 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.aprCost === 'number' ? useCurrencyFormatter(record.aprCost) : '0.00';
        },
      },
      {
        title: '5月生产成本（元）',
        dataIndex: 'mayCost',
        width: new Date().getMonth() + 1 >= 5 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.mayCost === 'number' ? useCurrencyFormatter(record.mayCost) : '0.00';
        },
      },
      {
        title: '6月生产成本（元）',
        dataIndex: 'junCost',
        align: 'right',
        width: new Date().getMonth() + 1 >= 6 ? 150 : 0,
        customRender: ({ record }) => {
          return typeof record.junCost === 'number' ? useCurrencyFormatter(record.junCost) : '0.00';
        },
      },
      {
        title: '7月生产成本（元）',
        dataIndex: 'julCost',
        width: new Date().getMonth() + 1 >= 7 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.julCost === 'number' ? useCurrencyFormatter(record.julCost) : '0.00';
        },
      },
      {
        title: '8月生产成本（元）',
        dataIndex: 'augCost',
        width: new Date().getMonth() + 1 >= 8 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.augCost === 'number' ? useCurrencyFormatter(record.augCost) : '0.00';
        },
      },
      {
        title: '9月生产成本（元）',
        dataIndex: 'sepCost',
        width: new Date().getMonth() + 1 >= 9 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.sepCost === 'number' ? useCurrencyFormatter(record.sepCost) : '0.00';
        },
      },
      {
        title: '10月生产成本（元）',
        dataIndex: 'octCost',
        width: new Date().getMonth() + 1 >= 10 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.octCost === 'number' ? useCurrencyFormatter(record.octCost) : '0.00';
        },
      },
      {
        title: '11月生产成本（元）',
        dataIndex: 'novCost',
        width: new Date().getMonth() + 1 >= 11 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.novCost === 'number' ? useCurrencyFormatter(record.novCost) : '0.00';
        },
      },
      {
        title: '12月生产成本（元）',
        dataIndex: 'decCost',
        width: new Date().getMonth() + 1 >= 12 ? 150 : 0,
        align: 'right',
        customRender: ({ record }) => {
          return typeof record.decCost === 'number' ? useCurrencyFormatter(record.decCost) : '0.00';
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
      },
      {
        title: '合作单位',
        dataIndex: 'cooperator',
        width: 200,
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
          return h('div', getEnum(record.equipmentLeaseStatus));
        },
      },
      {
        title: '租赁的检测设备数量',
        dataIndex: 'equipmentLeaseAmount',
        width: 200,
        edit: true,
        editable: true,
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
          return h('div', getEnum(record.equipmentLeaseContractStatus));
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
          return h('div', getEnum(record.equipmentLeaseCredentialStatus));
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
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '进度描述+项目生产自身问题原因分析' },
          '进度描述+项目生产自身问题原因分析',
        ),
        dataIndex: 'planRemark',
        width: 200,
      },
      {
        title: '业主关注或不满的问题',
        dataIndex: 'businessConcern',
        width: 200,
      },
      {
        title: h(
          Tooltip,
          { placement: 'top', title: '下一步计划+是否需要公司支持' },
          '下一步计划+是否需要公司支持',
        ),
        dataIndex: 'nextPlan',
        width: 200,
      },
    ],
  },
  {
    title: `${new Date().getMonth() + 1}月自有产值`,
    dataIndex: 'eyzycz',
    children: [
      // 自有当月产值
      {
        title: `${new Date().getMonth() + 1}月实际完成产值（元）`,
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
        title: '累计实际完成产值（元）',
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
        title: '剩余产值（元）',
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
        title: '未来三个月预测产值（元）',
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
        title: '全年预测产值（元）',
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
        { label: '已填写', value: 1 },
        { label: '未填写', value: 0 },
      ],
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
