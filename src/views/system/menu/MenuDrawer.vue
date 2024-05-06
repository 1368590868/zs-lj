<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #imgIcon="{ model, field }">
        <div class="flex flex-col">
          <importImageBase @success="importFile" title="上传" />
          <div class="mt-2"><Image :width="100" :src="model[field]" /></div>
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { menuParentTreeApi, addMenu, updateMenu, getMenuDetailApi } from '/@/api/sys/menu';
  import { message, Image } from 'ant-design-vue';
  import { importImageBase } from '/@/components/System';

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
      const list = await getMenuDetailApi(data.record.id);
      setFieldsValue({
        ...list,
        type: data.typeKey,
      });
    } else {
      setFieldsValue({
        type: data.typeKey,
      });
    }
    const treeData = await menuParentTreeApi({ type: data.typeKey, modelKey: data.modelKey });
    updateSchema({
      field: 'parentId',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      // TODO custom api
      if (!isUpdate.value) {
        if (values.menuType === 'M') {
          values.parentId = '0';
        }
        await addMenu(values);
        message.success('新增菜单成功');
      } else {
        await updateMenu(values);
        message.success('修改菜单成功');
      }
      closeDrawer();
      emits('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  const importFile = async (e) => {
    setFieldsValue({
      imgIcon: e,
    });
  };
</script>
