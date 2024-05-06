<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #apkPath="{ model, field }">
        <div class="flex flex-col">
          <importFileFull @success="importFile" title="上传" />
          <div v-if="model[field]" class="mt-2">已上传</div>
        </div>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './sysApkInfo.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TreeItem } from '/@/components/Tree';
  import { addApi, editApi } from '/@/api/sys/sysApkInfo';
  import { message } from 'ant-design-vue';
  import { importFileFull } from '/@/components/System';
  import { uploadOssApi } from '/@/api/sys/upload';

  const emits = defineEmits(['closeDrawer', 'success', 'register']);

  const isUpdate = ref(true);
  const treeData = ref<TreeItem[]>([]);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    // let params = {};
    if (unref(treeData).length === 0) {
      // treeData.value = (await getRoleList(params)) as any as TreeItem[];
    }
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const importFile = async (e) => {
    let params = {
      file: e,
    };
    const res: any = await uploadOssApi(params);
    setFieldsValue({
      apkPath: res.data.data,
      apkSize: params.file.size,
    });
  };
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  // 提交
  const handleSubmit = async () => {
    try {
      const values = await validate();
      if (!unref(isUpdate)) {
        await addApi(values);
        message.success('新建成功');
      } else {
        await editApi(values);
        message.success('修改成功');
      }
      setDrawerProps({ confirmLoading: true });
      closeDrawer();
      emits('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  };
</script>
