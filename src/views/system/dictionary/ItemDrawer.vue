<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="getTitle"
    @register="registerDrawer"
    showFooter
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchemaValue } from './dict.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { addDataDictApi, updateDataDictApi, detailDataDictApi } from '/@/api/sys/dictionary';
  import { message } from 'ant-design-vue';
  const emit = defineEmits(['closeDrawer', 'success', 'register']);

  const isUpdate = ref(true);
  const dictType = ref();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    schemas: formSchemaValue,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    dictType.value = data.dictType;
    if (unref(isUpdate)) {
      const res = await detailDataDictApi(data.record.id);
      setFieldsValue({
        ...res,
      });
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? '新增字典标签' : '编辑字典标签'));
  // 提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (!isUpdate.value) {
        let params = {
          ...values,
          dictType: dictType.value,
        };
        await addDataDictApi(params);
        message.success('新增字典成功');
      } else {
        await updateDataDictApi(values);
        message.success('修改字典成功');
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
</script>
