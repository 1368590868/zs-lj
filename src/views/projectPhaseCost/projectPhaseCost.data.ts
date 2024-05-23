import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, TypographyText } from 'ant-design-vue';
import { costSubjectEnum, myCostStatusEnum } from '/@/enums/projectControl';

export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 200,
  },
  {
    title: '阶段标题',
    dataIndex: 'phaseTitle',
    width: 200,
  },
  {
    title: '提交人',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '成本科目',
    dataIndex: 'costTypeName',
    width: 200,
  },
  {
    title: '金额',
    dataIndex: 'phaseBudget',
    width: 200,
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '成本备注',
    dataIndex: 'remark',
    width: 200,
  },
  // 项目负责人审核状态（0-待审核1-已通过2-已驳回）
  {
    title: '项目负责人审核',
    dataIndex: 'projectOwnerName',
    width: 200,
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: 'success' },
        `${record.projectOwnerName ?? ''} ${record.project ?? ''}`,
      );
    },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costOwnerName',
    width: 200,
    slots: { customRender: 'costLeaderStatus' },
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: 'success' },
        `${record.costOwnerName ?? ''} ${record.costLeaderTime ?? ''}`,
      );
    },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationOwnerName',
    width: 200,
    customRender: ({ record }) => {
      return h(
        TypographyText,
        { type: 'success' },
        `${record?.operationOwnerName ?? ''} ${record.operationDeptTime ?? ''}`,
      );
    },
  },
  // {
  //   title: '审批意见',
  //   dataIndex: 'projectLeaderStatus',
  //   width: 200,
  // },
];

export const searchFormSchema: FormSchema[] = [
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
    field: 'warningStatus',
    label: '成本科目',
    component: 'Select',
    componentProps: {
      options: Object.keys(costSubjectEnum).map((key) => ({
        label: costSubjectEnum[key],
        value: key,
      })),
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
    label: '项目阶段id',
    field: 'projectPhaseId',
    component: 'Input',
  },
  {
    label: '项目月度审核id',
    field: 'monthAuditId',
    component: 'Input',
  },
  {
    label: '阶段成本明细',
    field: 'phaseBudget',
    component: 'Input',
  },
  {
    label: '成本类型ID',
    field: 'costTypeId',
    component: 'Input',
  },
  {
    label: '成本类型',
    field: 'costTypeName',
    component: 'Input',
  },
  {
    label: '项目负责人审核状态（0-待审核1-已通过2-已驳回）',
    field: 'projectLeaderStatus',
    component: 'Input',
  },
  {
    label: '项目负责人审核时间',
    field: 'projectLeaderTime',
    component: 'Input',
  },
  {
    label: '成本提交时间',
    field: 'costSubmitTime',
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
