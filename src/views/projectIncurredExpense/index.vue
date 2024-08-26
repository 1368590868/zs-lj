<template>
  <PageWrapper title="新增发生费用">
    <Card>
      <BasicForm class="form-wrap" @register="register">
        <template #costProject="{ model, field }">
          <ApiSelect
            :api="getProjectNameAndId"
            showSearch
            :filter-option="filterOption"
            placeholder="请选择"
            v-model:value="model[field]"
            resultField="data"
            labelField="projectName"
            valueField="id"
            @change="handleProjectChange"
          />
        </template>
        <template #tips>
          <div class="text-xl">
            <TypographyText type="danger">
              提示：提交后项目负责人审核，如驳回后请尽快处理 ！
            </TypographyText>
          </div>
        </template>
        <template #user>
          {{ getUserInfo }}
        </template>
        <template #nowTime> <Time :value="now" mode="datetime" /></template>
        <!-- Footer Slot  -->
        <template #formFooter>
          <div class="flex justify-center gap-6">
            <a-button class="w-[150px]" @click="onBack">返回</a-button>
            <a-button class="w-[150px]" type="primary" @click="handleSubmit">提交</a-button>
          </div>
        </template>
      </BasicForm>
      <Divider />
      <div v-show="showBar">
        <h2>项目基础信息</h2>
        <div class="flex justify-between flex-wrap mb-4 gap-4">
          <div class="flex"
            >项目名称:<EllipsisText
              :maxWidth="200"
              :tooltipMaxWidth="200"
              :tooltip="projectDetail.projectName"
            >
              {{ projectDetail.projectName }}
            </EllipsisText>
          </div>
          <div>项目预算：{{ useCurrencyFormatter(projectDetail.generalBudget) }} 元</div>
          <div
            >工程计划时间：{{ projectDetail.planStartDate ?? '-' }} 至
            {{ projectDetail.planEndDate ?? '-' }}</div
          >
          <div>归属部门：{{ projectDetail.deptName }}</div>
          <div>项目负责人：{{ projectDetail.projectOwnerName }}</div>
          <div>成本负责人：{{ projectDetail.costOwnerName }}</div>
        </div>
        <div ref="chartRef" class="w-full min-h-200px"></div>
      </div>
    </Card>
    <TipsModal @register="tipsRegister" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { Card, Divider, TypographyText, message } from 'ant-design-vue';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { Time } from '/@/components/Time';
  import { findNowPhasesByProjectIdApi } from '/@/api/projectPhase/projectPhase';
  import { detail, getProjectNameAndId } from '/@/api/project/project';
  import { addApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { formSchema } from './projectPhaseCost.data';
  import { Ref, computed, reactive, ref, watchEffect } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import TipsModal from './tipsModal.vue';
  import { EllipsisText } from '/@/components/EllipsisText';
  import { useModal } from '/@/components/Modal';
  import { useRouter } from 'vue-router';

  const now = new Date().getTime();
  const projectDetail = reactive({
    projectName: '',
    generalBudget: '',
    planStartDate: '',
    planEndDate: '',
    deptName: '',
    projectOwnerName: '',
    costOwnerName: '',
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const chartData = ref({});
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);

  const showBar = ref<boolean>(false);

  watchEffect(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {},
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
        axisLabel: {
          formatter: '{value} 元',
        },
      },
      yAxis: {
        type: 'category',
        boundaryGap: false,
        data: [chartData.value['phaseTitle']],
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: [chartData.value['phaseOutlayCost'] ?? 0],
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#DBD8FF',
          },
        },
        {
          name: '预估成本',
          type: 'bar',
          data: [chartData.value['phaseBudgetCost']],
          label: {
            show: true,
            position: 'right',
          },
          itemStyle: {
            color: '#8DD0FF',
          },
        },
      ],
    });
    getInstance()?.resize();
  });

  const [register, { resetFields, validate }] = useForm({
    labelWidth: 100,
    colon: true,
    schemas: formSchema,
    actionColOptions: { span: 24 },
    showActionButtonGroup: false,
    baseRowStyle: { flexFlow: 'column' },
    baseColProps: { span: 8 },
  });
  const [tipsRegister, { openModal }] = useModal();

  const userStore = useUserStore();

  const getUserInfo = computed(() => {
    const { nickName = '' } = userStore.getUserInfo || {};
    return nickName;
  });

  const getFindCurrent = async (id) => {
    const res = await findNowPhasesByProjectIdApi(id);
    chartData.value = res;
  };

  const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  /**修改项目 */
  async function handleProjectChange(id) {
    const data = await detail(id);
    showBar.value = !!id;
    Object.assign(projectDetail, data);
    console.log(projectDetail, data);
    await getFindCurrent(id);
  }

  async function handleSubmit() {
    const values = await validate();
    await addApi({ ...values, createByName: getUserInfo.value });
    openModal(true);
    resetFields();
  }
  const router = useRouter();
  function onBack() {
    router.go(-1);
    resetFields();
  }
</script>

<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
</style>
