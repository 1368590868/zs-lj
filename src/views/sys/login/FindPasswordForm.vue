<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
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

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.pwConfirmTitle') }}
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
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { userFindPasswordApi } from '/@/api/sys/user';
  import { useUserStore, useUserStoreWithOut } from '/@/store/modules/user';
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    hasCode: '',
    password: '',
    repassword: '',
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.FIND_PASSWORD);

  async function handleRegister() {
    const userStore = useUserStore();
    const data = await validForm();
    data.hasCode = userStore.getHasCode;
    if (!data) return;
    try {
      await userFindPasswordApi(data);
      message.success('修改密码成功');
      const userStore = useUserStoreWithOut();
      userStore.setHasCode('');
      formData.hasCode = '';
      formData.password = '';
      formData.repassword = '';
      handleBackLogin();
    } catch (error: any) {
      message.error(error);
    }
  }
</script>
