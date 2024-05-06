<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <div>
      <BasicForm @register="registerFrom">
        <template #configLoginImg="{ model, field }">
          <div class="flex">
            <importImage @success="importFile1" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
        <template #configLoginLogo="{ model, field }">
          <div class="flex">
            <importImage @success="importFile2" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
        <template #configSystemLogoMax="{ model, field }">
          <div class="flex">
            <importImage @success="importFile3" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
        <template #configSystemLogoMix="{ model, field }">
          <div class="flex">
            <importImage @success="importFile4" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
        <template #configAppLogo="{ model, field }">
          <div class="flex">
            <importImage @success="importFile5" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
        <template #configAppLoginLogo="{ model, field }">
          <div class="flex">
            <importImage @success="importFile6" title="导入" />
            <div class="ml-5">
              <Image :width="100" :src="model[field]" />
            </div>
          </div>
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './sysTenant.data';
  import { computed, ref, unref, toRaw } from 'vue';
  import { platformAdd, platformEdit } from '/@/api/tenant/systenant';
  import { message, Image } from 'ant-design-vue';
  import { importImage } from '/@/components/System';
  import { uploadOssApi } from '/@/api/sys/upload';

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const isUpdate = ref(true);
  const emits = defineEmits(['success', 'register']);
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const { tenantKey, name, id, addr, status, logoJson, orderNum, modelIds } = data.record;
      const { configAppLogo, configSystemLogoMix, configTitle } = logoJson
        ? JSON.parse(logoJson)
        : {};
      setFieldsValue({
        tenantKey,
        name,
        id,
        addr,
        status,
        orderNum,
        modelIds,
        configAppLogo,
        configSystemLogoMix,
        configTitle,
      });
    }
    setFieldsValue({});
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  const importFile1 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configLoginImg: res.data.data,
    });
  };
  const importFile2 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configLoginLogo: res.data.data,
    });
  };
  const importFile3 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configSystemLogoMax: res.data.data,
    });
  };
  const importFile4 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configSystemLogoMix: res.data.data,
    });
  };
  const importFile5 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configAppLogo: res.data.data,
    });
  };
  const importFile6 = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      configAppLoginLogo: res.data.data,
    });
  };

  //   提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      console.log(values);
      const {
        tenantKey,
        name,
        id,
        addr,
        configAppLogo,
        configSystemLogoMix,
        configTitle,
        status,
        orderNum,
        modelIds,
      } = values;

      const params = {
        tenantKey: tenantKey,
        status: status,
        id: id,
        orderNum: orderNum,
        name: name,
        addr: addr,
        logoJson: JSON.stringify({
          configTitle: configTitle,
          configAppLogo: configAppLogo,
          configSystemLogoMix: configSystemLogoMix,
        }),
        modelIds: toRaw(modelIds),
      };
      setModalProps({ confirmLoading: true });
      if (!isUpdate.value) {
        params.orderNum = Number(values.orderNum);
        await platformAdd(params);
        message.success('添加成功');
      } else {
        await platformEdit(params);
        message.success('修改成功');
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
