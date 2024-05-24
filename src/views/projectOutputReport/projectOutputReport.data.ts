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
        dataIndex: 'projectId',
        width: 200,
      },
      {
        title: '合同额(元)',
        dataIndex: 'projectId',
        width: 200,
      },
      {
        title: '项目区域',
        dataIndex: 'projectId',
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
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '业务类型',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '是否备案',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '工程期限',
        helpMessage: '项目开始至项目结束时间',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '工程进度简要说明',
        helpMessage: '已完成，正在做，后续准备做什么',
        dataIndex: 'projectOwnerName',
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
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '截止目前累计完成比例',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '1月',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
    ],
  },
  {
    title: '计划完成比例',
    dataIndex: 'jhwcbl',
    children: [
      {
        title: '预计未来3个月完成比例',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '预计全年完成比例',
        dataIndex: 'projectOwnerName',
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
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '截止目前累计完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '1月完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '截止目前本年度完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '剩余产值',
        dataIndex: 'projectOwnerName',
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
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '预计全年完成产值',
        dataIndex: 'projectOwnerName',
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
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '截止2023年已发生生产成本',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '1月完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
    ],
  },
  {
    title: '项目合作信息',
    dataIndex: 'xmhzxx',
    children: [
      {
        title: '是否合作项目',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '自有产值比例',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '合作模式',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '合作单位',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '是否有因本项目而产生的租赁设备',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '租赁的检测设备数量',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '因本项目而产生的租赁设备是否全部有已签订的租赁合同',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '涉及的全部租赁设备合同编号',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '租赁设备的计量证书是否全部在有效期内',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '合作单位现场负责人及电话',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '进度描述+项目生产自身问题原因分析',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '业主关注或不满的问题',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '下一步计划+是否需要公司支持',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
    ],
  },
  {
    title: '二月自有产值',
    dataIndex: 'eyzycz',
    children: [
      {
        title: '2月实际完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '累计实际完成产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '剩余产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '未来三个月预测产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
      {
        title: '全年预测产值',
        dataIndex: 'projectOwnerName',
        width: 200,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
  { field: 'projectName', label: '项目名称', component: 'Input', colProps: { span: 6 } },
  { field: 'projectOwnerName', label: '项目负责人', component: 'Input', colProps: { span: 6 } },
  {
    field: 'deptName',
    label: '归属部门',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    field: 'controlStatus',
    label: '管控状态',
    component: 'Select',
    componentProps: {
      options: Object.keys(controlStatusEnum).map((key) => ({
        label: controlStatusEnum[key],
        value: key,
      })),
    },
    colProps: { span: 6 },
  },
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
