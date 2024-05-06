<template>
  <BasicModal
    v-bind="$attrs"
    destroyOnClose
    @register="register"
    :title="getTitle"
    width="1000px"
    okText="下载"
    @ok="handleSubmit"
  >
    <div>
      <BasicForm @register="registerFrom" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './genProject.data';
  import { computed, ref, unref } from 'vue';
  import { addApi, editApi } from '/@/api/codegen/genProject';
  import { message } from 'ant-design-vue';
  import { AesEncryption } from '/@/utils/cipher';
  import { cacheLoginCipher } from '/@/settings/encryptionSetting';

  const key = cacheLoginCipher.key;
  const iv = cacheLoginCipher.iv;
  const encryption = new AesEncryption({ key, iv });

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 20,
    },
    baseColProps: { lg: 12, md: 24 },
  });
  const isUpdate = ref(true);
  const emits = defineEmits(['success', 'register']);
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
        password: '******',
        oldPassword: encryption.decryptByAES(data.record.password),
      });
    }
    setFieldsValue({});
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  //   提交
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
      if (!isUpdate.value) {
        const res = await addApi(data);
        const blob = new Blob([res.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        message.success('导出成功');
        // message.success('新增成功');
      } else {
        await editApi(data);
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
