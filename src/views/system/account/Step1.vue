<template>
  <div class="step1">
    <div class="step1-form pl-5 pr-5">
      <Form class="p-4 enter-x" :model="formData" ref="formRef">
        <FormItem name="account" class="enter-x">
          <Input
            size="large"
            disabled
            v-model:value="formData.account"
            :placeholder="t('sys.login.userName')"
          />
        </FormItem>

        <FormItem name="phone" class="enter-x">
          <Input
            size="large"
            v-model:value="formData.phone"
            disabled
            :placeholder="t('sys.login.mobile')"
          />
        </FormItem>
        <FormItem name="code" class="enter-x">
          <CountdownInput
            size="large"
            v-model:value="formData.code"
            :sendCodeApi="getSms"
            :placeholder="t('sys.login.smsCode')"
          />
        </FormItem>
        <FormItem class="enter-x">
          <Button type="primary" size="large" block @click="handleReset" :loading="loading">
            {{ t('common.resetText') }}
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { userSendLoginSmsApi, userFindCodeApi } from '/@/api/sys/user';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useFormValid } from './useLogin';
  import { Form, Input, Button, message, FormItem } from 'ant-design-vue';
  import { useUserStoreWithOut } from '/@/store/modules/user';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const { t } = useI18n();
  const formData: any = reactive({
    account: '',
    phone: '',
    code: '',
  });
  const emits = defineEmits(['next']);
  const loading = ref(false);
  const formRef = ref();
  const { validForm } = useFormValid(formRef);
  const getSms = async () => {
    let isCode;
    if (formData.phone) {
      await userSendLoginSmsApi(formData.phone);
      isCode = true;
    } else {
      message.error('手机号不能为空');
    }
    return isCode;
  };
  async function handleReset() {
    if (!formData.code) {
      message.warn('请输入验证码');
      return;
    }
    const data = await validForm();
    if (!data) return;
    try {
      const res = await userFindCodeApi(data);
      const userStore = useUserStoreWithOut();
      userStore.setHasCode(res);
      message.success('请输入新密码');
      emits('next');
      formData.account = '';
      formData.phone = '';
      formData.code = '';
    } catch (error: any) {
      message.error(error);
    }
  }
  onMounted(() => {
    const res = userStore.getUserInfo;
    formData.account = res.account;
    formData.phone = res.phone;
  });
</script>

<style scoped></style>
