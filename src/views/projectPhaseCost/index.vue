<template>
  <PageWrapper title="新增发生费用">
    <Card>
      <BasicForm class="form-wrap" @register="register">
        <template #costProject="{ model, field }">
          <ApiSelect
            :api="getProjectNameAndId"
            showSearch
            placeholder="请选择项目名称"
            v-model:value="model[field]"
            resultField="data"
            labelField="projectName"
            valueField="id"
            @change="handleProjectChange"
          />
        </template>
        <template #tips
          ><div class="text-xl"
            >提示：提交后项目负责人审核，驳回后5天内可重新提交，否则过期失效作废。</div
          ></template
        >
        <template #user>
          {{ getUserInfo }}
        </template>
        <template #nowTime> <Time :value="now" mode="datetime" /></template>
        <!-- Footer Slot  -->
        <template #formFooter>
          <div class="flex justify-center gap-6">
            <a-button @click="resetFields">返回</a-button>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </div>
        </template>
      </BasicForm>
      <Divider />
      <div v-show="showBar">
        <h2>项目基础信息</h2>
        <div class="flex justify-between mb-4">
          <div>项目名称:{{ projectDetail.projectName }}</div>
          <div>项目预算：{{ projectDetail.generalBudget }}</div>
          <div
            >工程计划时间：{{ projectDetail.planStartDate }} - {{ projectDetail.planEndDate }}</div
          >
          <div>归属部门：{{ projectDetail.deptName }}</div>
          <div>项目负责人：{{ projectDetail.projectOwnerName }}</div>
          <div>成本负责人：{{ projectDetail.costLeader }}</div>
        </div>
        <div ref="chartRef" class="w-full min-h-600px"></div>
      </div>
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { Card, Divider } from 'ant-design-vue';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { Time } from '/@/components/Time';

  import { detail, getProjectNameAndId } from '/@/api/project/project';
  import { addApi } from '/@/api/projectPhaseCost/projectPhaseCost';
  import { formSchema } from './projectPhaseCost.data';
  import { Ref, computed, onMounted, reactive, ref, unref } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useECharts } from '/@/hooks/web/useECharts';

  const now = new Date().getTime();
  const projectDetail = reactive({
    projectName: '',
    generalBudget: '',
    planStartDate: '',
    planEndDate: '',
    deptName: '',
    projectOwnerName: '',
    costLeader: '',
  });

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const showBar = ref<boolean>(false);
  onMounted(() => {
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
        data: ['第一阶段'],
      },
      series: [
        {
          name: '实际成本',
          type: 'bar',
          data: [18203],
          label: {
            show: true,
          },
          itemStyle: {
            color: '#DBD8FF',
          },
        },
        {
          name: '预估成本',
          type: 'bar',
          data: [19325],
          label: {
            show: true,
          },
          itemStyle: {
            color: '#8DD0FF',
          },
        },
      ],
    });
  });

  const [register, { setProps, getFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    actionColOptions: { span: 24 },
    showActionButtonGroup: false,
    baseRowStyle: { flexFlow: 'column' },
    baseColProps: { span: 8 },
  });

  const userStore = useUserStore();

  const getUserInfo = computed(() => {
    const { nickName = '' } = userStore.getUserInfo || {};
    return nickName;
  });

  /**修改项目 */
  async function handleProjectChange(id) {
    showBar.value = !!id;
    const data = await detail(id);
    Object.assign(projectDetail, data);
    console.log(projectDetail, data);
  }

  async function handleSubmit() {
    const values = await validate();
    await addApi(values);
  }
</script>

<style lang="less" scoped>
  .form-wrap {
    // :global(.ant-form-item-control-input-content) {
    //   display: flex;
    //   align-items: center;
    // }
  }
</style>
