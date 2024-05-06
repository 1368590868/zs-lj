<template>
  <BasicModal
    width="1000px"
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerFrom">
      <template #imgUrl="{ model, field }">
        <importImage @success="importFile" title="导入" />
        <Image :width="200" :src="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { importImage } from '/@/components/System';
  import { formSchema } from './sysBanner.data';
  import { computed, ref, unref } from 'vue';
  import { addApi, editApi, detail } from '/@/api/sys/sysBanner';
  import { message, Image } from 'ant-design-vue';
  import { uploadOssApi } from '/@/api/sys/upload';
  const emits = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerFrom, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 20,
    },
    baseColProps: { lg: 12, md: 24 },
  });

  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      const res = await detail(data.record.id);
      setFieldsValue({
        ...res,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  //   提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (!isUpdate.value) {
        await addApi(values);
        message.success('新增成功');
      } else {
        await editApi(values);
        message.success('修改成功');
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  const importFile = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      imgUrl: res.data.data,
    });
  };
</script>

<style scoped></style>
