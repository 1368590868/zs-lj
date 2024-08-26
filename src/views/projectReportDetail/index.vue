<template>
  <PageWrapper
    :title="`产值信息 - ${store.getReportData.yearNum}年${store.getReportData.monthNum}月`"
  >
    <Card title="项目基础信息">
      <BasicForm @register="register" @submit="handleSubmit" />
      <Description @register="registerRatio" class="mt-4" />
      <Description @register="registerDesc" />

      <Description @register="registerOutput" class="mt-4" />

      <Description @register="registerSelfOutput" class="mt-4" />

      <Description @register="registerCost" class="mt-4" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { Card, message } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from './projectReportDetail.data';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { useRouter } from 'vue-router';
  import { editApi } from '/@/api/projectOutputValue/projectOutputValue';
  import { Description, useDescription } from '/@/components/Description';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { ActionType } from '../projectOutputReport/projectOutputReport.data';

  const store = useProjectControl();
  const router = useRouter();
  const baseColProps = {
    sm: 12,
    xl: 8,
    xxl: 6,
  };
  const [register, { setFieldsValue, updateSchema }] = useForm({
    colon: true,
    schemas: formSchema,
    labelWidth: 200,
    baseColProps,
    actionColOptions: {
      span: 24,
      // @ts-ignore
      class: 'mt-15',
      style: {
        textAlign: 'center',
      },
    },
    resetButtonOptions: {
      text: '返回',
      // @ts-ignore
      class: 'w-[150px]',
    },
    submitButtonOptions: {
      text: '提交',
      // @ts-ignore
      class: 'w-[150px]',
    },
    showSubmitButton: router.currentRoute.value.query.type !== ActionType.VIEW,
    resetFunc: () => {
      router.go(-1);
      return Promise.resolve();
    },
  });

  const [registerRatio] = useDescription({
    colon: true,
    title: '完成比例数据查看',
    column: 4,
    bordered: false,
    data: store.getReportData,
    class: 'pl-[50px]',
    schema: [
      {
        field: 'lastYearRatio',
        label: '截止上年底完成比例',
        render: (val) => `${val}%`,
      },
      {
        field: 'allYearRatio',
        label: '截止目前累计完成比例',
        render: (val) => `${val}%`,
      },
    ],
  });
  const [registerDesc] = useDescription({
    colon: true,
    title: '当月信息',
    column: {
      sm: 2,
      xl: 3,
      xxl: 4,
    },
    data: store.getReportData,
    class: 'pl-[50px]',
    schema: [
      {
        field: 'monthRatio',
        label: '当月完成比例',
        render: (val) => (val ? `${val}%` : ''),
      },
      {
        field: 'monthCost',
        label: '当月完成产值(元)',
        render: (val) => (val ? useCurrencyFormatter(val) : 0),
      },
      {
        field: 'monthBud',
        label: '当月生产成本(元)',
        render: (val) => (val ? useCurrencyFormatter(val) : '0'),
      },
    ],
    bordered: false,
  });

  const [registerOutput] = useDescription({
    colon: true,
    title: '完成产值数据查看',
    column: {
      sm: 2,
      xl: 3,
      xxl: 4,
    },
    bordered: false,
    class: 'pl-[50px]',
    data: store.getReportData,
    schema: [
      {
        field: 'lastYearOutputValue',
        label: '截止上年底完成产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allYearOutputValue',
        label: '截止目前累计完成产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });

  const [registerSelfOutput] = useDescription({
    colon: true,
    title: '自有产值查看',
    column: {
      sm: 2,
      xl: 3,
      xxl: 4,
    },
    bordered: false,
    data: store.getReportData,
    class: 'pl-[50px]',
    schema: [
      {
        field: 'thisMonthValueMonth',
        label: '当月完成产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allValueMonth',
        label: '累计完成产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'selfSurplusOutputValue',
        label: '剩余产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'selfPredictMonthOutputValue',
        label: '未来3个月预测产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'selfPredictYearOutputValue',
        label: '全年预测产值(元)',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });

  const [registerCost] = useDescription({
    colon: true,
    title: '项目直接生成成本数据查看',
    column: {
      sm: 2,
      xl: 3,
      xxl: 4,
    },
    bordered: false,
    class: 'pl-[50px]',
    data: store.getReportData,
    schema: [
      {
        field: 'lastYearOutputValue',
        label: '截止上年底生产成本(元)',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allYearOutputValue',
        label: '截止目前生产成本(元)',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });

  onMounted(() => {
    if (Object.keys(store.getReportData).length === 0) {
      router.go(-1);
    } else {
      setFieldsValue({
        ...store.getReportData,
      });
    }

    const newSchema = formSchema.map((x) => {
      x['componentProps'] = {
        ...x['componentProps'],
        disabled: router.currentRoute.value.query.type === ActionType.VIEW,
      };
      return x;
    });
    updateSchema(newSchema);
  });
  const handleSubmit = async (values) => {
    await editApi(values).catch(() => {
      message.error('修改失败');
    });
    message.success('修改成功');
    setTimeout(() => {
      router.go(-1);
    }, 500);
  };
</script>
<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
</style>
