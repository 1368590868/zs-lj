<template>
  <PageWrapper title="产值信息">
    <Card title="项目基础信息">
      <BasicForm @register="register" @submit="handleSubmit" />
      <Description @register="registerRatio" class="mt-4" />
      <Description @register="registerDesc" />

      <Description @register="registerOutput" class="mt-4" />
      <Description @register="registerOutputDesc" />

      <Description @register="registerSelfOutput" class="mt-4" />

      <Description @register="registerCost" class="mt-4" />
      <Description @register="registerCostDesc" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { Card, message } from 'ant-design-vue';
  import { BasicForm, type FormSchema, useForm, type FormProps } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import {
    costOptions,
    formSchema,
    outputValueOptions,
    ratioOptions,
  } from './projectReportDetail.data';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { useRouter } from 'vue-router';
  import { editApi } from '/@/api/projectOutputValue/projectOutputValue';
  import { DescItem, Description, useDescription } from '/@/components/Description';
  import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
  import { ActionType } from '../projectOutputReport/projectOutputReport.data';

  const store = useProjectControl();
  const router = useRouter();
  const [register, { setFieldsValue, updateSchema }] = useForm({
    schemas: formSchema,
    labelWidth: 200,
    actionColOptions: {
      span: 13,
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

  type RenderFunction = (val: any) => string;

  const coverSchema = (data: Recordable, renderFn: RenderFunction): DescItem[] => {
    return Object.keys(data).map((key, i) => {
      return {
        field: key,
        label: data[key],
        show: () => new Date().getMonth() >= i,
        render: (val) => renderFn(val),
      };
    });
  };

  const [registerRatio] = useDescription({
    title: '完成比例数据查看',
    column: 4,
    bordered: false,
    data: store.getReportData,
    schema: [
      {
        field: 'lastYearRatio',
        label: '截止上年底完成比例',
      },
      {
        field: 'allYearRatio',
        label: '截止目前累计完成比例',
      },
    ],
  });
  const [registerDesc] = useDescription({
    title: '本年月度完成比例',
    column: { xxl: 6, md: 4 },
    data: store.getReportData,
    schema: coverSchema(ratioOptions, (val) => {
      return val ? `${val}%` : '';
    }),
    bordered: false,
  });

  const [registerOutput] = useDescription({
    title: '完成产值数据查看',
    column: 4,
    bordered: false,
    data: store.getReportData,
    schema: [
      {
        field: 'lastYearOutputValue',
        label: '截止上年底完成产值（元）',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allYearOutputValue',
        label: '截止目前累计完成产值（元）',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });
  const [registerOutputDesc] = useDescription({
    title: '本年月度完成产值（元）',
    column: { xxl: 6, md: 4 },
    data: store.getReportData,
    schema: coverSchema(outputValueOptions, (val) => {
      return val ? useCurrencyFormatter(val) : '';
    }),
    bordered: false,
  });

  const [registerSelfOutput] = useDescription({
    title: '自有产值查看（元）',
    column: 5,
    bordered: false,
    data: store.getReportData,
    schema: [
      {
        field: 'thisMonthValueMonth',
        label: '当月完成产值',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allValueMonth',
        label: '累计完成产值',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'selfSurplusOutputValue',
        label: '剩余产值',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'selfPredictMonthOutputValue',
        label: '未来3个月预测产值',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'predictYearOutputValue',
        label: '全年预测产值',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });

  const [registerCost] = useDescription({
    title: '项目直接生成成本数据查看（元）',
    column: 4,
    bordered: false,
    data: store.getReportData,
    schema: [
      {
        field: 'lastYearOutputValue',
        label: '截止上年底生产成本（元）',
        render: (val) => useCurrencyFormatter(val),
      },
      {
        field: 'allYearOutputValue',
        label: '截止目前生产成本（元）',
        render: (val) => useCurrencyFormatter(val),
      },
    ],
  });
  const [registerCostDesc] = useDescription({
    title: '本年月度生成成本（元）',
    column: { xxl: 6, md: 4 },
    data: store.getReportData,
    schema: coverSchema(costOptions, (val) => {
      return val ? useCurrencyFormatter(val) : '';
    }),
    bordered: false,
  });

  onMounted(() => {
    if (Object.keys(store.getReportData).length === 0) {
      router.go(-1);
    } else {
      setFieldsValue({
        ...store.getReportData,
      });
    }

    if (router.currentRoute.value.query.type === ActionType.VIEW) {
      const newSchema = formSchema.map((x) => {
        x['componentProps'] = {
          disabled: true,
        };
        return x;
      });
      updateSchema(newSchema);
    } else {
      const newSchema = formSchema.map((x) => {
        x['componentProps'] = {
          disabled: false,
        };
        return x;
      });
      updateSchema(newSchema);
    }
  });
  const handleSubmit = async (values) => {
    await editApi(values).catch(() => {
      message.error('修改失败');
    });
    message.success('修改成功');
  };
</script>
<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 100%;
  }
</style>
