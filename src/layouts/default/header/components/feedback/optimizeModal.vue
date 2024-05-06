<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="优化建议"
    width="500px"
    @ok="handleSubmit"
    okText="提交"
    @visible-change="handleCancel"
  >
    <BasicForm @register="registerForm">
      <template #remark="{ model, field }">
        <Input.TextArea rows="4" v-model:value="model[field]" showCount :maxlength="500" />
      </template>
      <template #attachments>
        <importFileFull @success="importExcel" title="导入" />
        <div v-for="item in fileList" :key="item">
          <div class="flex justify-between mt-1">
            <div>{{ item.title }}</div>
            <a-button size="small" danger @click="handleDel(item)">删除</a-button>
          </div>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { optFormSchema } from './feedback.data';
  import { addApi } from '/@/api/sys/sysProposal';
  import { message, Input } from 'ant-design-vue';
  import { importFileFull } from '/@/components/System';
  import { uploadOssApi } from '/@/api/sys/upload';
  import { ref } from 'vue';

  const fileList: any = ref([]);
  defineEmits(['register']);
  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 80,
    schemas: optFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });
  const [register, { setModalProps, closeModal }] = useModalInner(() => {
    resetFields();
    setModalProps({ confirmLoading: false });
  });
  const handleSubmit = async () => {
    try {
      const values = await validate();
      let attachments: any = [];
      fileList.value.forEach((it) => {
        attachments.push(it.url);
      });
      let params = {
        ...values,
        attachments,
      };
      await addApi(params);
      message.success('提交成功');
      setModalProps({ confirmLoading: true });
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  // 导入
  const importExcel = async (e) => {
    try {
      let params: any = {
        file: e,
      };
      const res = await uploadOssApi(params);
      let data = JSON.parse(JSON.stringify(res));
      fileList.value.push({
        originalName: e.name,
        fileUrl: data.data.data,
        fileSize: e.size,
        fileType: e.type,
      });
      message.success('导入成功');
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleCancel = () => {
    fileList.value = [];
    resetFields();
  };
  const handleDel = (item) => {
    let temp = fileList.value.filter((it) => {
      return item.url !== it.url;
    });
    fileList.value = temp;
    message.success('删除成功');
  };
</script>

<style scoped></style>
