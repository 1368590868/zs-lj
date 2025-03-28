import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { defineComponent, h, ref } from 'vue';
import { Button, FormItem, InputNumber, Space, TypographyText, message } from 'ant-design-vue';
import {
  ProjectRoleEnum,
  costChargeOptions,
  costSubjectEnum,
  myCostStatusEnum,
} from '/@/enums/projectControl';
import { useProjectControl } from '/@/store/modules/projectControl';
import { monthAuditApi } from '/@/api/projectMonthAudit/projectMonthAudit';

const projectStore = useProjectControl();
export const columns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    width: 420,
    fixed: 'left',
    customRender: ({ record }) => {
      return h(
        EllipsisText,
        { tooltip: record.projectName, maxWidth: 400 },
        () => record.projectName,
      );
    },
  },
  {
    title: '项目负责人',
    dataIndex: 'projectOwnerName',
    width: 130,
  },
  {
    title: '成本月度',
    dataIndex: 'auditMonthDate',
    width: 100,
  },

  {
    title: '审核金额(元)',
    dataIndex: 'monthBudget',
    width: 130,
    align: 'right',
    customRender: ({ record }) => {
      return useCurrencyFormatter(record.monthBudget);
    },
  },
  {
    title: '成本明细',
    dataIndex: 'costDetail',
    width: 120,
    slots: { customRender: 'costDetail' },
  },
  {
    title: '人力成本填写（元）',
    dataIndex: 'personCost',
    width: 170,
    align: 'right',
    slots: { customRender: 'personCost' },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costLeaderStatus',
    width: 250,
    slots: { customRender: 'costLeaderStatus' },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationDeptStatus',
    width: 250,
    slots: { customRender: 'operationDeptStatus' },
  },
  {
    title: '审批意见',
    dataIndex: 'auditOpinion',
    slots: { customRender: 'auditOpinion' },
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'costLeaderStatus',
    label: '成本负责人审核状态',
    component: 'Select',
    labelWidth: 200,
    componentProps: {
      options: Object.keys(costStatusEnum).map((key) => ({
        label: costStatusEnum[key],
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
    field: 'operationDeptStatus',
    label: '运营部审核状态',
    component: 'Select',
    labelWidth: 200,
    componentProps: {
      options: Object.keys(myCostStatusEnum)
        .filter((x) => x !== '3')
        .map((key) => ({
          label: myCostStatusEnum[key],
          value: key,
        })),
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
      options: Object.values(costSubjectEnum).map((val) => ({
        label: costSubjectEnum[val],
        value: val,
      })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '金额（元）',
    field: 'phaseBudget',
    component: 'InputNumber',
    labelWidth: 80,
    componentProps: {
      precision: 2,
      min: 0,
    },
    suffix: '元',
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

import { BasicModal, useModal } from '/@/components/Modal';
import { addApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
import { useUserStore } from '/@/store/modules/user';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
import { EllipsisText } from '/@/components/EllipsisText';
import { costStatusEnum } from '../projectDetail/projectDetail.data';

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
    type: {
      type: String,
      default: () => 'cost',
    },
    costStatus: {
      type: Number,
      default: () => 0,
    },
    personCost: {
      type: Number,
      default: null,
    },
    record: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const [register, { openModal, closeModal, setModalProps }] = useModal();
    const isPass = ref<number>(1);
    const store = useUserStore();
    const textType = {
      0: 'warning',
      1: 'success',
      2: 'danger',
      3: 'warning',
    };
    const onConfirm = async () => {
      setModalProps({ confirmLoading: true });
      await monthAuditApi(
        { id: props.id, auditStatus: isPass.value, nickName: store.getUserInfo.nickName },
        props.type,
      )
        .then(() => {
          return addApi({
            projectPhaseCostId: props.id,
            auditOpinion: remark.value || (isPass.value === 1 ? '通过' : '不通过'),
            auditOpinionFlag: props.type === 'cost' ? 2 : 3,
            createByName: store.getUserInfo.nickName,
            remark: isPass.value,
          });
        })
        .then(() => {
          closeModal();
          message.success('操作成功');
        })
        .finally(() => {
          setModalProps({ confirmLoading: false });
          emit('reload');
        });
    };

    const remark = ref<string>('');
    const onOpenModal = (state: number) => {
      if (props.type === 'cost') {
        if (typeof props.personCost !== 'number') {
          message.error('请填写项目当月人力成本后再审核');
          return;
        }
      }
      isPass.value = state;
      openModal(true);
    };
    const handleInput = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
      remark.value = target.value;
    };

    return () => (
      <>
        <BasicModal
          onRegister={register}
          onOk={onConfirm}
          title={`确认审核${isPass.value === 1 ? '通过' : '驳回'}`}
        >
          <a-textarea
            rows={4}
            showCount
            maxlength={200}
            placeholder={'非必填备注信息不超过200个字'}
            value={remark.value}
            onInput={handleInput}
          />
        </BasicModal>
        {props.type === 'cost' ? (
          props.text === 0 && projectStore.hasRoles(ProjectRoleEnum.CBFZR) ? (
            <Space>
              <Button type="link" onClick={() => onOpenModal(1)}>
                通过
              </Button>

              <Button type="link" onClick={() => onOpenModal(2)}>
                驳回
              </Button>
            </Space>
          ) : (
            <TypographyText type={textType[props.text]}>
              {![1, 2].includes(+props.text)
                ? costChargeOptions[props.text]
                : `${props.record.costNickName ?? ''} ${costChargeOptions[props.text]} ${
                    props.time ?? ''
                  }`}
            </TypographyText>
          )
        ) : // 运营部审核
        props.text === 0 && props.costStatus === 1 && projectStore.hasRoles(ProjectRoleEnum.YYB) ? (
          <Space>
            <Button type="link" onClick={() => onOpenModal(1)}>
              通过
            </Button>

            <Button type="link" onClick={() => onOpenModal(2)}>
              驳回
            </Button>
          </Space>
        ) : (
          <TypographyText type={textType[props.text]}>
            {![1, 2].includes(+props.text)
              ? costChargeOptions[props.text]
              : `${props.record.operationNickName ?? ''} ${costChargeOptions[props.text]} ${
                  props.time ?? ''
                }`}
          </TypographyText>
        )}
      </>
    );
  },
});
