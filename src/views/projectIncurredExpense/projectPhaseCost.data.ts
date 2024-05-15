import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { costSubjectEnum } from '/@/enums/projectControl';

export const columns: BasicColumn[] = [
  {
    title: '项目id',
    dataIndex: 'projectId',
    width: 200,
  },
  {
    title: '项目阶段id',
    dataIndex: 'projectPhaseId',
    width: 200,
  },
  {
    title: '项目月度审核id',
    dataIndex: 'monthAuditId',
    width: 200,
  },
  {
    title: '阶段成本明细',
    dataIndex: 'phaseBudget',
    width: 200,
  },
  {
    title: '成本类型ID',
    dataIndex: 'costTypeId',
    width: 200,
  },
  {
    title: '成本类型',
    dataIndex: 'costTypeName',
    width: 200,
  },
  {
    title: '项目负责人审核状态（0-待审核1-已通过2-已驳回）',
    dataIndex: 'projectLeaderStatus',
    width: 200,
  },
  {
    title: '项目负责人审核时间',
    dataIndex: 'projectLeaderTime',
    width: 200,
  },
  {
    title: '成本提交时间',
    dataIndex: 'costSubmitTime',
    width: 200,
  },
  {
    title: '创建者',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '创建者名称',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    width: 200,
  },
  {
    title: '更新者名称',
    dataIndex: 'updateByName',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '状态（0正常1删除）',
    dataIndex: 'status',
    width: 200,
  },
  {
    title: '租户',
    dataIndex: 'tenantId',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'projectId',
    component: 'Select',
    label: '成本项目',
    slot: 'costProject',
    required: true,
  },
  {
    field: 'costTypeId',
    component: 'Select',
    label: '成本科目',
    componentProps: {
      options: Object.keys(costSubjectEnum).map((key) => ({
        label: costSubjectEnum[key],
        value: key,
      })),
    },
    required: true,
  },
  {
    field: 'phaseBudget',
    component: 'Input',
    label: '成本金额',
    suffix: '元',
    required: true,
  },
  {
    field: ' ',
    component: 'Select',
    label: '填报人',
    slot: 'user',
  },
  {
    field: ' ',
    component: 'Input',
    label: '填写时间',
    slot: 'nowTime',
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      showCount: true,
      maxLength: 20,
    },
  },
  {
    field: ' ',
    component: 'Input',
    label: '',
    slot: 'tips',
    colProps: { span: 24 },
  },
];
