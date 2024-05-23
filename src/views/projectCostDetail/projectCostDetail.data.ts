import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, TypographyText } from 'ant-design-vue';
import { costSubjectEnum } from '/@/enums/projectControl';

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
        `${record.projectOwnerName ?? ''} ${record.projectLeaderTime ?? ''}`,
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
    label: '提交时间',
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
    label: '管控意见',
    field: 'auditOpinion',
    component: 'InputTextArea',
    componentProps: {
      rows: 12,
      disabled: true,
      placeholder: '暂无管控意见',
    },
    labelWidth: 80,
  },
];
