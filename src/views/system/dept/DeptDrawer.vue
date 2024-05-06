<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    :width="720"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #Cascader="{ model, field }">
        <Cascader
          v-model:value="model[field]"
          :options="addressOptions"
          placeholder="请选择行政区域"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Cascader } from 'ant-design-vue';
  import { deptTreeApi, addDeptApi, editDeptApi, deptDetailApi } from '/@/api/sys/dept';
  import { addressOptions } from '/@/utils/lib/city';

  const emits = defineEmits(['success', 'register']);
  const isUpdate = ref(true);

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      const res = await deptDetailApi(data.record.id);
      let type = res.parentId === '0' ? '0' : '1'; // 顶级组织为0,就让类型变成0
      setFieldsValue({
        ...res,
        type,
        companyRegion: res.companyRegion ? res.companyRegion.split('-') : '', // 是否有值 有的话 转换数组
      });
    }
    let params = {};
    const treeData = await deptTreeApi(params);
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增组织' : '编辑组织'));

  async function handleSubmit() {
    try {
      const values = await validate();
      let companyRegion = values.companyRegion ? values.companyRegion.join('-') : '';
      let params = {
        ...values,
        companyRegion: companyRegion,
      };
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      if (isUpdate.value) {
        if (params.type === '0') {
          params.parentId = '0';
        }
        await editDeptApi(params);
      } else {
        if (params.type === '0') {
          params.parentId = '0';
        }
        await addDeptApi(params);
      }
      closeDrawer();
      emits('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>

<style scoped></style>
