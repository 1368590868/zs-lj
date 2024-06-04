<template>
  <PageWrapper title="产值信息">
    <Card title="项目基础信息">
      <BasicForm @register="register" @submit="handleSubmit" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Card, Drawer, Space, message } from 'ant-design-vue';
  import { BasicForm, type FormSchema, useForm, type FormProps } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { formSchema } from './projectReportDetail.data';
  import { useProjectControl } from '/@/store/modules/projectControl';
  import { useRouter } from 'vue-router';
  import { editApi } from '/@/api/projectOutputValue/projectOutputValue';

  const [register, { setFieldsValue, loading }] = useForm({
    schemas: formSchema,
    labelWidth: 200,
    actionColOptions: {
      span: 24,
      flex: 'center',
    },
  });

  const store = useProjectControl();
  const router = useRouter();

  onMounted(() => {
    console.log(store.getReportData);
    if (Object.keys(store.getReportData).length === 0) {
      router.go(-1);
    } else {
      setFieldsValue({
        ...store.getReportData,
      });
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
