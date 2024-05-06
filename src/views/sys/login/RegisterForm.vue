<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="phone" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.phone"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="code" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.code"
          :sendCodeApi="getSms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="repassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.repassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
        :ghost="!formData.policy"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { userRegisterApi, userSendSmsApi } from '/@/api/sys/user';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    repassword: '',
    phone: '',
    code: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    if (!formData.policy) {
      message.warn('请同意注册协议');
      return;
    }
    const data = await validForm();
    if (!data) return;
    try {
      const res = await userRegisterApi(data);
      message.success('注册成功', res);

      formData.account = '';
      formData.password = '';
      formData.repassword = '';
      formData.phone = '';
      formData.code = '';
      formData.policy = false;
      handleBackLogin();
    } catch (error: any) {
      message.error('注册失败', error);
    }
  }
  const getSms = async () => {
    let isCode;
    if (formData.phone) {
      await userSendSmsApi(formData.phone);
      isCode = true;
    } else {
      message.error('手机号不能为空');
    }
    return isCode;
  };
</script>
