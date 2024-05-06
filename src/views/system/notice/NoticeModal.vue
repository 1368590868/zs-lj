<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="1200px"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm">
        <template #noticeContent="{ model, field }">
          <md-editor
            v-model="model[field]"
            :toolbarsExclude="['link', 'mermaid', 'katex', 'github']"
            @onUploadImg="onUploadImg"
          />
        </template>
        <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="getUserListApi"
            showSearch
            v-model:value="model[field]"
            :filterOption="false"
            resultField="records"
            labelField="account"
            valueField="account"
            :params="searchParams"
            @search="onSearch"
          />
        </template>
      </BasicForm>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, ApiSelect } from '/@/components/Form/index';
  import { formSchema } from './notice.data';
  import { addNoticeApi, detailEditNoticeApi, editNoticeApi } from '/@/api/sys/notice';
  import { message } from 'ant-design-vue';
  import { useDebounceFn } from '@vueuse/core';
  import { getUserListApi } from '/@/api/sys/user';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useUserStore } from '/@/store/modules/user';
  import axios from 'axios';

  const userStore = useUserStore();
  const isUpdate = ref(true);
  const keyword = ref<string>('');
  const searchParams = computed<Recordable>(() => {
    return { account: unref(keyword) };
  });
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    isUpdate.value = !!data?.isUpdate;
    setModalProps({ confirmLoading: false });
    if (unref(isUpdate)) {
      const res = await detailEditNoticeApi(data.record.id);
      setFieldsValue({
        ...res,
      });
    }
  });
  //  子传父
  const emits = defineEmits(['success', 'register']);
  const getTitle = computed(() => (!unref(isUpdate) ? '新增公告' : '编辑公告'));
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      if (!isUpdate.value) {
        await addNoticeApi(values);
        message.success('添加公告成功');
      } else {
        await editNoticeApi(values);
        message.success('修改公告成功');
      }
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function onSearch(value: string) {
    keyword.value = value;
  }
  useDebounceFn(onSearch, 300);

  // 上传图片
  const { uploadUrl = '' } = useGlobSetting();
  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);
          axios
            .post(uploadUrl, form, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: userStore.getToken,
              },
            })
            .then((res) => rev(res))
            .catch((error) => rej(error));
        });
      }),
    );
    console.log('res', res);
    callback(res.map((item) => item.data.data));
  };
</script>
