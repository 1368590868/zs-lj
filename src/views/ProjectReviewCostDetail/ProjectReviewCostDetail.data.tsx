import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { defineComponent, h, ref } from 'vue';
import {
  Button,
  Popconfirm,
  Space,
  Input,
  TypographyText,
  message,
  InputNumber,
} from 'ant-design-vue';
import {
  costChargeOptions,
  costSubjectEnum,
  myCostStatusEnum,
  singleCostStatusOptions,
} from '/@/enums/projectControl';
import { auditApi } from '/@/api/projectPhaseCost/projectPhaseCost';
import { BasicModal } from '/@/components/Modal';

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
    title: '阶段',
    dataIndex: 'phaseTitle',
    width: 200,
  },
  {
    title: '提交人',
    dataIndex: 'createByName',
    width: 100,
  },
  {
    title: '成本科目',
    dataIndex: 'costTypeName',
    width: 150,
  },
  {
    title: '金额(元)',
    dataIndex: 'phaseBudget',
    width: 150,
    align: 'right',
    customRender: ({ record }) => {
      return useCurrencyFormatter(record.phaseBudget ?? 0);
    },
  },
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
    title: '项目负责人审核',
    dataIndex: 'projectLeaderStatus',
    width: 250,
    customRender: ({ record }) => {
      const idx = record.projectLeaderStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? costChargeOptions[+idx]
          : `${record.projectNickName ?? ''} ${costChargeOptions[+idx] ?? ''} ${
              record.projectLeaderTime ?? ''
            }`,
      );
    },
  },
  {
    title: '成本负责人审核',
    dataIndex: 'costLeaderStatus',
    width: 250,
    customRender: ({ record }) => {
      const idx = record.costLeaderStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
        3: 'warning',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? singleCostStatusOptions[+idx]
          : `${record.costNickName ?? ''} ${singleCostStatusOptions[+idx] ?? ''} ${
              record.costLeaderTime ?? ''
            }`,
      );
    },
  },
  {
    title: '运营管理部审核',
    dataIndex: 'operationOwnerName',
    width: 250,
    customRender: ({ record }) => {
      const idx = record.operationDeptStatus;
      const textType = {
        0: 'warning',
        1: 'success',
        2: 'danger',
      };
      return h(
        TypographyText,
        { type: textType[+idx] },
        ![1, 2].includes(+idx)
          ? costChargeOptions[+idx]
          : `${record.operationNickName ?? ''} ${costChargeOptions[+idx] ?? ''} ${
              record.operationDeptTime ?? ''
            }`,
      );
    },
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
    field: 'costTypeName',
    label: '成本科目',
    component: 'Select',
    componentProps: {
      options: Object.values(costSubjectEnum).map((val) => ({
        label: val,
        value: val,
      })),
    },
    colProps: { span: 6 },
  },
  {
    field: 'jine',
    label: '审核金额(元)',
    component: 'Input',
    render({ model, field }) {
      return (
        <Space>
          <InputNumber
            placeholder="请输入最小金额"
            min={0}
            max={99999999}
            v-model:value={model['minMonthBudget']}
          />
          ~
          <InputNumber
            placeholder="请输入最大金额"
            min={1}
            max={99999999}
            v-model:value={model['maxMonthBudget']}
          />
        </Space>
      );
    },
    colProps: { span: 6 },
  },
  {
    field: 'projectLeaderStatus',
    label: '项目负责人审核状态',
    component: 'Select',
    labelWidth: 220,
    componentProps: {
      options: Object.keys(myCostStatusEnum)
        .filter((key) => key !== '3')
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
  {
    field: 'createByName',
    label: '提交人',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'costLeaderStatus',
    label: '成本负责人审核状态',
    component: 'Select',
    labelWidth: 190,
    componentProps: {
      options: Object.keys(myCostStatusEnum)
        .filter((key) => key !== '3')
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
        label: val,
        value: val,
      })),
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

import { useModal } from '/@/components/Modal';
import { addApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
import { useUserStore } from '/@/store/modules/user';
import { EllipsisText } from '/@/components/EllipsisText';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
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
    const [register, { openModal, closeModal, setModalProps }] = useModal();
    const isPass = ref<number>(1);
    const store = useUserStore();

    const textType = {
      0: 'warning',
      1: 'success',
      2: 'danger',
    };
    const onConfirm = async () => {
      setModalProps({ confirmLoading: true });
      await auditApi({
        ids: [props.id],
        projectLeaderStatus: isPass.value,
      })
        .then(() => {
          return addApi({
            projectPhaseCostId: props.id,
            auditOpinion: remark.value || (isPass.value === 1 ? '通过' : '不通过'),
            auditOpinionFlag: 1,
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

    const onOpenModal = (state: number) => {
      isPass.value = state;
      openModal(true);
    };

    const remark = ref<string>('');

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
            maxlength={15}
            placeholder={'非必填备注信息不超过15个字'}
            value={remark.value}
            onInput={handleInput}
          />
        </BasicModal>
        {props.text === 0 ? (
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
            {props.text === 1
              ? myCostStatusEnum[props.text]
              : `${myCostStatusEnum[props.text]}/${props.time}`}
          </TypographyText>
        )}
      </>
    );
  },
});
