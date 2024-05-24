import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { controlStatusEnum, warningStatusEnum } from '/@/enums/projectControl';

export const columns: BasicColumn[] = [
  {
    title: '项目基本信息',
    dataIndex: 'projectInfos',
    children: [
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
        title: '合同额(元)',
        dataIndex: 'contractPrice',
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
        width: 200,
        customRender: ({ record }) => {
          return h('div', record.filingStatus ? '已备案' : '未备案');
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
        title: '工程进度简要说明',
        helpMessage: '已完成，正在做，后续准备做什么',
        dataIndex: 'planRemark',
        width: 200,
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
      },
      {
        title: '截止目前累计完成比例',
        dataIndex: 'allYearRatio',
        width: 200,
      },
      {
        title: '1月',
        dataIndex: 'janRatio',
        width: new Date().getMonth() + 1 >= 1 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 1,
        editable: new Date().getMonth() + 1 === 1,
      },
      {
        title: '2月',
        dataIndex: 'fedRatio',
        width: new Date().getMonth() + 1 >= 2 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 2,
        editable: new Date().getMonth() + 1 === 2,
      },
      {
        title: '3月',
        dataIndex: 'marRatio',
        width: new Date().getMonth() + 1 >= 3 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 3,
        editable: new Date().getMonth() + 1 === 3,
      },
      {
        title: '4月',
        dataIndex: 'aprRatio',
        width: new Date().getMonth() + 1 >= 4 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 4,
        editable: new Date().getMonth() + 1 === 4,
      },
      {
        title: '5月',
        dataIndex: 'mayRatio',
        width: new Date().getMonth() + 1 >= 5 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 5,
        editable: new Date().getMonth() + 1 === 5,
      },
      {
        title: '6月',
        dataIndex: 'junRatio',
        width: new Date().getMonth() + 1 >= 6 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 6,
        editable: new Date().getMonth() + 1 === 6,
      },
      {
        title: '7月',
        dataIndex: 'julRatio',
        width: new Date().getMonth() + 1 >= 7 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 7,
        editable: new Date().getMonth() + 1 === 7,
      },
      {
        title: '8月',
        dataIndex: 'augRatio',
        width: new Date().getMonth() + 1 >= 8 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 8,
        editable: new Date().getMonth() + 1 === 8,
      },
      {
        title: '9月',
        dataIndex: 'sepRatio',
        width: new Date().getMonth() + 1 >= 9 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 9,
        editable: new Date().getMonth() + 1 === 9,
      },
      {
        title: '10月',
        dataIndex: 'octRatio',
        width: new Date().getMonth() + 1 >= 10 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 10,
        editable: new Date().getMonth() + 1 === 10,
      },
      {
        title: '11月',
        dataIndex: 'novRatio',
        width: new Date().getMonth() + 1 >= 11 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 11,
        editable: new Date().getMonth() + 1 === 11,
      },
      {
        title: '12月',
        dataIndex: 'decRatio',
        width: new Date().getMonth() + 1 >= 12 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 12,
        editable: new Date().getMonth() + 1 === 12,
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
      },
      {
        title: '预计全年完成比例',
        dataIndex: 'predictYearRatio',
        width: 200,
      },
    ],
  },
  {
    title: '产值统计',
    dataIndex: 'cztj',
    children: [
      {
        title: '截止上年度完成产值',
        dataIndex: 'lastYearOutputValue',
        width: 200,
      },
      {
        title: '截止目前累计完成产值',
        dataIndex: 'allYearOutputValue',
        width: 200,
      },
      {
        title: '1月完成产值',
        dataIndex: 'janOutputValue',
        width: new Date().getMonth() + 1 >= 1 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 1,
        editable: new Date().getMonth() + 1 === 1,
      },
      {
        title: '2月完成产值',
        dataIndex: 'fedOutputValue',
        width: new Date().getMonth() + 1 >= 2 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 2,
        editable: new Date().getMonth() + 1 === 2,
      },
      {
        title: '3月完成产值',
        dataIndex: 'marOutputValue',
        width: new Date().getMonth() + 1 >= 3 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 3,
        editable: new Date().getMonth() + 1 === 3,
      },
      {
        title: '4月完成产值',
        dataIndex: 'aprOutputValue',
        width: new Date().getMonth() + 1 >= 4 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 4,
        editable: new Date().getMonth() + 1 === 4,
      },
      {
        title: '5月完成产值',
        dataIndex: 'mayOutputValue',
        width: new Date().getMonth() + 1 >= 5 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 5,
        editable: new Date().getMonth() + 1 === 5,
      },
      {
        title: '6月完成产值',
        dataIndex: 'junOutputValue',
        width: new Date().getMonth() + 1 >= 6 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 6,
        editable: new Date().getMonth() + 1 === 6,
      },
      {
        title: '7月完成产值',
        dataIndex: 'julOutputValue',
        width: new Date().getMonth() + 1 >= 7 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 7,
        editable: new Date().getMonth() + 1 === 7,
      },
      {
        title: '8月完成产值',
        dataIndex: 'augOutputValue',
        width: new Date().getMonth() + 1 >= 8 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 8,
        editable: new Date().getMonth() + 1 === 8,
      },
      {
        title: '9月完成产值',
        dataIndex: 'sepOutputValue',
        width: new Date().getMonth() + 1 >= 9 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 9,
        editable: new Date().getMonth() + 1 === 9,
      },
      {
        title: '10月完成产值',
        dataIndex: 'octOutputValue',
        width: new Date().getMonth() + 1 >= 10 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 10,
        editable: new Date().getMonth() + 1 === 10,
      },
      {
        title: '11月完成产值',
        dataIndex: 'novOutputValue',
        width: new Date().getMonth() + 1 >= 11 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 11,
        editable: new Date().getMonth() + 1 === 11,
      },
      {
        title: '12月完成产值',
        dataIndex: 'decOutputValue',
        width: new Date().getMonth() + 1 >= 12 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 12,
        editable: new Date().getMonth() + 1 === 12,
      },
      {
        title: '截止目前本年度完成产值',
        dataIndex: 'thisYearOutputValue',
        width: 200,
      },
      {
        title: '剩余产值',
        dataIndex: 'surplusOutputValue',
        width: 200,
      },
    ],
  },
  {
    title: '计划完成产值',
    dataIndex: 'jhwccz',
    children: [
      {
        title: '预计未来3个月完成产值',
        dataIndex: 'predictMonthOutputValue',
        width: 200,
      },
      {
        title: '预计全年完成产值',
        dataIndex: 'predictYearOutputValue',
        width: 200,
      },
    ],
  },
  {
    title: '项目生产直接成本(元)',
    dataIndex: 'xmsczjcb',
    children: [
      {
        title: '截止上年度已发生生产成本',
        dataIndex: 'lastYearCost',
        width: 200,
      },
      // 当前年份
      {
        title: `截止${new Date().getFullYear()}年已发生生产成本`,
        dataIndex: 'allYearCost',
        width: 200,
      },
      {
        title: '1月生产成本',
        dataIndex: 'janCost',
        width: new Date().getMonth() + 1 >= 1 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 1,
        editable: new Date().getMonth() + 1 === 1,
      },
      {
        title: '2月生产成本',
        dataIndex: 'fedCost',
        width: new Date().getMonth() + 1 >= 2 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 2,
        editable: new Date().getMonth() + 1 === 2,
      },
      {
        title: '3月生产成本',
        dataIndex: 'marCost',
        width: new Date().getMonth() + 1 >= 3 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 3,
        editable: new Date().getMonth() + 1 === 3,
      },
      {
        title: '4月生产成本',
        dataIndex: 'aprCost',
        width: new Date().getMonth() + 1 >= 4 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 4,
        editable: new Date().getMonth() + 1 === 4,
      },
      {
        title: '5月生产成本',
        dataIndex: 'mayCost',
        width: new Date().getMonth() + 1 >= 5 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 5,
        editable: new Date().getMonth() + 1 === 5,
      },
      {
        title: '6月生产成本',
        dataIndex: 'junCost',
        width: new Date().getMonth() + 1 >= 6 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 6,
        editable: new Date().getMonth() + 1 === 6,
      },
      {
        title: '7月生产成本',
        dataIndex: 'julCost',
        width: new Date().getMonth() + 1 >= 7 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 7,
        editable: new Date().getMonth() + 1 === 7,
      },
      {
        title: '8月生产成本',
        dataIndex: 'augCost',
        width: new Date().getMonth() + 1 >= 8 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 8,
        editable: new Date().getMonth() + 1 === 8,
      },
      {
        title: '9月生产成本',
        dataIndex: 'sepCost',
        width: new Date().getMonth() + 1 >= 9 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 9,
        editable: new Date().getMonth() + 1 === 9,
      },
      {
        title: '10月生产成本',
        dataIndex: 'octCost',
        width: new Date().getMonth() + 1 >= 10 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 10,
        editable: new Date().getMonth() + 1 === 10,
      },
      {
        title: '11月生产成本',
        dataIndex: 'novCost',
        width: new Date().getMonth() + 1 >= 11 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 11,
        editable: new Date().getMonth() + 1 === 11,
      },
      {
        title: '12月生产成本',
        dataIndex: 'decCost',
        width: new Date().getMonth() + 1 >= 12 ? 200 : 0,
        edit: new Date().getMonth() + 1 === 12,
        editable: new Date().getMonth() + 1 === 12,
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
        width: 200,
        customRender: ({ record }) => {
          return h('div', record.cooperationStatus ? '是' : '否');
        },
      },
      {
        title: '自有产值比例',
        dataIndex: 'selfOwnedRatio',
        width: 200,
      },
      {
        title: '合作模式',
        dataIndex: 'cooperationModel',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '合作单位',
        dataIndex: 'cooperator',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '是否有因本项目而产生的租赁设备',
        dataIndex: 'equipmentLeaseStatus',
        width: 200,
        customRender: ({ record }) => {
          return h('div', record.equipmentLeaseStatus ? '是' : '否');
        },
        editComponent: 'Select',
        edit: true,
        editable: true,
        editComponentProps: {
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
        title: '租赁的检测设备数量',
        dataIndex: 'equipmentLeaseAmount',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '因本项目而产生的租赁设备是否全部有已签订的租赁合同',
        dataIndex: 'equipmentLeaseContractStatus',
        width: 200,
        customRender: ({ record }) => {
          return h('div', record.equipmentLeaseContractStatus ? '是' : '否');
        },
        editComponent: 'Select',
        edit: true,
        editable: true,
        editComponentProps: {
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
        title: '涉及的全部租赁设备合同编号',
        dataIndex: 'equipmentLeaseContractNumber',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '租赁设备的计量证书是否全部在有效期内',
        dataIndex: 'equipmentLeaseCredentialStatus',
        width: 200,
        customRender: ({ record }) => {
          return h('div', record.equipmentLeaseCredentialStatus ? '是' : '否');
        },
        editComponent: 'Select',
        edit: true,
        editable: true,
        editComponentProps: {
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
        title: '合作单位现场负责人及电话',
        dataIndex: 'cooperatorPhone',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '进度描述+项目生产自身问题原因分析',
        dataIndex: 'planRemark',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '业主关注或不满的问题',
        dataIndex: 'businessConcern',
        width: 200,
        edit: true,
        editable: true,
      },
      {
        title: '下一步计划+是否需要公司支持',
        dataIndex: 'nextPlan',
        width: 200,
        edit: true,
        editable: true,
      },
    ],
  },
  {
    title: `${new Date().getMonth() + 1}月自有产值`,
    dataIndex: 'eyzycz',
    children: [
      // 自有当月产值
      {
        title: `${new Date().getMonth() + 1}月实际完成产值`,
        dataIndex: 'thisMonthValueMonth',
        width: 200,
      },
      {
        title: '累计实际完成产值',
        dataIndex: 'allValueMonth',
        width: 200,
      },
      {
        title: '剩余产值',
        dataIndex: 'selfSurplusOutputValue',
        width: 200,
      },
      {
        title: '未来三个月预测产值',
        dataIndex: 'selfPredictMonthOutputValue',
        width: 200,
      },
      {
        title: '全年预测产值',
        dataIndex: 'predictYearOutputValue',
        width: 200,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'costLeader', label: '成本负责人', component: 'Input', colProps: { span: 6 } },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
  {
    field: 'deptName',
    label: '归属部门',
    component: 'Select',
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
