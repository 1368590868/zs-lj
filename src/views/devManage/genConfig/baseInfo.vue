<template>
  <PageWrapper dense fixedHeight contentClass="flex">
    <BasicForm showSubmitButton @register="registerForm" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { baseInfoSourceSchema } from './genConfig';
  import { message } from 'ant-design-vue';
  import { genSubmitApi, genEditDetailApi } from '/@/api/codegen/gen';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';

  const [registerForm, { validate, setProps, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: baseInfoSourceSchema,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      text: '提交',
    },
    submitFunc: customSubmitFunc,
  });
  const genData = ref();
  async function customSubmitFunc() {
    try {
      const value = await validate();
      setProps({
        submitButtonOptions: {
          loading: true,
        },
      });
      let params = {
        basicInfo: value,
        dsName: route.query.dsName,
        tableName: route.query.tableName,
        genInfo: genData.value.genInfo,
        columnInfos: genData.value.columnInfos,
      };
      await genSubmitApi(params);
      setProps({
        submitButtonOptions: {
          loading: false,
        },
      });
      message.success('提交成功！');
    } catch (error) {
      console.log(error);
    }
  }
  const route = useRoute();
  const getDetailList = async () => {
    let params = {
      dsName: route.query.dsName,
      tableName: route.query.tableName,
    };
    const res = await genEditDetailApi(params);
    genData.value = res;
    setFieldsValue({
      ...res.basicInfo,
    });
  };
  getDetailList();
</script>

<style scoped></style>
