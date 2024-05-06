<template>
  <BasicModal
    @ok="handleSubmit"
    destroyOnClose
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { dadaSourceSchema } from './dataSource';
  import { computed, ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import {
    dataSourceAddApi,
    dataSourceDetailApi,
    dataSourceEditApi,
  } from '/@/api/codegen/dataSource';
  import { AesEncryption } from '/@/utils/cipher';
  import { cacheLoginCipher } from '/@/settings/encryptionSetting';

  const key = cacheLoginCipher.key;
  const iv = cacheLoginCipher.iv;
  const encryption = new AesEncryption({ key, iv });
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref();
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: dadaSourceSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data?.isUpdate;
    if (unref(isUpdate)) {
      const res = await dataSourceDetailApi(data.record.id);
      setFieldsValue({
        ...res,
        password: '******',
        oldPassword: encryption.decryptByAES(data.record.password),
      });
    }
  });
  const getTitle = computed(() => {
    let txt;
    switch (isUpdate.value) {
      case 1:
        txt = '新增数据源';
        break;
      case 2:
        txt = '修改数据源';
        break;
      case 3:
        txt = '复制数据源';
        break;
    }
    return txt;
  });

  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      let data = {
        ...values,
        password:
          values.password === '******'
            ? encryption.encryptByAES(values.oldPassword)
            : encryption.encryptByAES(values.password),
      };
      console.log('values', values);
      console.log('data', data);
      // TODO custom api
      if (isUpdate.value === 1) {
        await dataSourceAddApi(data);
        message.success('数据源新增成功');
      } else if (isUpdate.value === 2) {
        await dataSourceEditApi(data);
        message.success('用户修改成功');
      } else {
        delete data.id;
        await dataSourceAddApi(data);
        message.success('数据源复制成功');
      }

      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>

<style scoped></style>
