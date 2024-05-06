<template>
  <PageWrapper dense fixedHeight contentClass="flex pr-5">
    <BasicForm showSubmitButton @register="registerForm" />
    <!-- <div class="flex">
      <a-button>提交</a-button>
      <a-button>返回</a-button>
    </div> -->
  </PageWrapper>
</template>
z
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { generateSourceSchema } from './genConfig';
  import { message } from 'ant-design-vue';
  import { genSubmitApi, genEditDetailApi } from '/@/api/codegen/gen';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const [registerForm, { validate, setProps, setFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: generateSourceSchema,
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
        basicInfo: genData.value.genInfo,
        dsName: route.query.dsName,
        tableName: route.query.tableName,
        genInfo: value,
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
      ...res.genInfo,
    });
  };
  getDetailList();
</script>

<style scoped></style>
