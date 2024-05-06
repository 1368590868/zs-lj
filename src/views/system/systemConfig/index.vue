<template>
  <CollapseContainer title="系统配置">
    <BasicForm @register="registerForm">
      <template #configLoginImg="{ model, field }">
        <div class="flex">
          <importImage @success="importFile1" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
      <template #configLoginLogo="{ model, field }">
        <div class="flex">
          <importImage @success="importFile2" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
      <template #configSystemLogoMax="{ model, field }">
        <div class="flex">
          <importImage @success="importFile3" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
      <template #configSystemLogoMix="{ model, field }">
        <div class="flex">
          <importImage @success="importFile4" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
      <template #configAppLogo="{ model, field }">
        <div class="flex">
          <importImage @success="importFile5" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
      <template #configAppLoginLogo="{ model, field }">
        <div class="flex">
          <importImage @success="importFile6" title="导入" />
          <div class="ml-5"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
    </BasicForm>
    <Button type="primary" class="ml-3" @click="handleSuccess">确认</Button>
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container';
  import { formSchema } from './system.data';
  import { Button, message, Image } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { detailSettingApi, addSettingApi } from '/@/api/sys/systemConfig';
  import { importImage } from '/@/components/System';
  import { uploadOssApi } from '/@/api/sys/upload';
  import { getToken } from '/@/utils/auth';

  const [registerForm, { validate, setFieldsValue }] = useForm({
    labelWidth: 200,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const handleSuccess = async () => {
    try {
      const values = await validate();
      let params = {
        data: JSON.stringify(values),
      };
      await addSettingApi(params);
      message.success('提交成功');
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const getDetailSetting = async () => {
    const token = getToken();
    if (token) {
      let params = {};
      const res = await detailSettingApi(params);
      setFieldsValue({
        ...JSON.parse(res.data),
      });
    }
  };
  getDetailSetting();
  const importFile1 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configLoginImg: res.data.data,
    });
  };
  const importFile2 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configLoginLogo: res.data.data,
    });
  };
  const importFile3 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configSystemLogoMax: res.data.data,
    });
  };
  const importFile4 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configSystemLogoMix: res.data.data,
    });
  };
  const importFile5 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configAppLogo: res.data.data,
    });
  };
  const importFile6 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    if (res.data.code === 1) {
      message.error(res.data.msg);
      return;
    }
    setFieldsValue({
      configAppLoginLogo: res.data.data,
    });
  };
</script>
