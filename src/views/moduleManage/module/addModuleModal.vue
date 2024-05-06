<template>
  <BasicModal @ok="handleSubmit" v-bind="$attrs" @register="registerModal" :title="getTitle">
    <BasicForm @register="registerForm">
      <template #icon="{ model, field }">
        <importImage @success="importFile" title="导入" />
        <Image :width="200" :src="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { dadaSourceSchema } from './moduleData';
  //import { BasicUpload } from '/@/components/Upload';
  import { uploadOssApi } from '/@/api/sys/upload';
  import { computed, ref, unref } from 'vue';
  import { importImage } from '/@/components/System';
  import { message, Image } from 'ant-design-vue';
  import { modelAddApi, modelDetailApi, modelEditApi } from '/@/api/codegen/module';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: dadaSourceSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const res = await modelDetailApi(data.record.id);
      setFieldsValue({
        ...res,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增子系统' : '编辑子系统'));
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      if (!isUpdate.value) {
        await modelAddApi(values);
        message.success('数据源新增成功');
      } else {
        await modelEditApi(values);
        message.success('用户修改成功');
      }

      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  // const handleChange = (data) => {
  //   console.log('lis', data);
  // };
  // excel导入
  const importFile = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      icon: res.data.data,
    });
  };
</script>

<style scoped></style>
