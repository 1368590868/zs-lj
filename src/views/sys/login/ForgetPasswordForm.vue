<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="phone" class="enter-x">
        <Input size="large" v-model:value="formData.phone" :placeholder="t('sys.login.mobile')" />
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
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import { userSendLoginSmsApi, userFindCodeApi } from '/@/api/sys/user';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    phone: '',
    code: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  const { validForm } = useFormValid(formRef);
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
      setLoginState(LoginStateEnum.FIND_PASSWORD);
      formData.account = '';
      formData.phone = '';
      formData.code = '';
    } catch (error: any) {
      message.error(error);
    }
  }
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
</script>
