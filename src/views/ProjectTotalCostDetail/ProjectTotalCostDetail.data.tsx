import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { defineComponent, h } from 'vue';
import { Button, Popconfirm, Space, TypographyText, message } from 'ant-design-vue';
import { costSubjectEnum, myCostStatusEnum } from '/@/enums/projectControl';
import { auditApi } from '/@/api/projectPhaseCost/projectPhaseCost';

export const columns: BasicColumn[] = [
  {
    title: '项目编号',
    dataIndex: 'projectNumber',
    width: 200,
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
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
  // {
  //   title: '阶段标题',
  //   dataIndex: 'phaseTitle',
  //   width: 200,
  // },

  {
    title: '提交时间',
    dataIndex: 'costSubmitTime',
    width: 200,
  },
  {
    title: '成本备注',
    dataIndex: 'remark',
    width: 200,
  },
  // 项目负责人审核状态（0-待审核1-已通过2-已驳回）
  {
    title: '项目负责人',
    dataIndex: 'projectOwnerName',
    width: 200,
  },
  {
    title: '成本负责人',
    dataIndex: 'costOwnerName',
    width: 200,
  },

  {
    title: '审批意见',
    dataIndex: 'auditOpinion',
    slots: { customRender: 'auditOpinion' },
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectNumber',
    label: '项目编号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'submitDate',
    label: '提交时间',
    component: 'RangePicker',
    componentProps: {
      placeholder: ['开始日期', '结束日期'],
    },
    colProps: { span: 6 },
  },
  {
    field: 'projectOwnerName',
    label: '项目负责人',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'costTypeName',
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

export const formEditSchema: FormSchema[] = [
  {
    label: '成本科目',
    field: 'costTypeName',
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      options: Object.keys(costSubjectEnum).map((key) => ({
        label: costSubjectEnum[key],
        value: key,
      })),
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '金额',
    field: 'phaseBudget',
    component: 'InputNumber',
    labelWidth: 80,
    componentProps: {
      precision: 2,
    },
    required: true,
  },
  {
    label: '成本备注',
    field: 'remark',
    component: 'InputTextArea',
    labelWidth: 80,
    componentProps: {
      rows: 4,
    },
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// child column ui
export const ProjectLeaderStatus = defineComponent({
  props: {
    text: {
      type: Number,
      default: () => 0,
    },
    reload: {
      type: Function,
    },
    id: {
      type: String,
      default: () => '0',
    },
    time: {
      type: String,
      default: () => new Date(),
    },
  },
  setup(props, { emit }) {
    console.log(props.text);
    const textType = {
      0: 'warning',
      1: 'success',
      2: 'danger',
    };
    const onConfirm = async (state: number) => {
      await auditApi({
        ids: [props.id],
        projectLeaderStatus: state,
      });
      console.log(emit('reload'));
      emit('reload');
      message.success('操作成功');
    };

    return () => (
      <>
        {props.text === 0 ? (
          <Space>
            <Popconfirm
              title="是否通过？"
              okText="通过"
              cancelText="取消"
              onConfirm={() => onConfirm(1)}
            >
              <Button type="link">通过</Button>
            </Popconfirm>
            <Popconfirm
              title="是否驳回？"
              okText="驳回"
              cancelText="取消"
              onConfirm={() => onConfirm(2)}
            >
              <Button type="link">驳回</Button>
            </Popconfirm>
          </Space>
        ) : (
          <TypographyText type={textType[props.text]}>
            {props.text === 1
              ? myCostStatusEnum[props.text]
              : `${myCostStatusEnum[props.text]}/${props.time}`}
          </TypographyText>
        )}
      </>
    );
  },
});