<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          :sendCodeApi="getSms"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
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
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStore } from '/@/store/modules/user';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { userSendLoginSmsApi } from '/@/api/sys/user';
  const props = defineProps({
    modelTenantKey: {
      type: String,
    },
  });

  const { notification } = useMessage();
  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const userStore = useUserStore();
  const formRef = ref();
  const loading = ref(false);
  const formData = reactive({
    mobile: '',
    sms: '',
  });
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    if (props.modelTenantKey) {
      sessionStorage.setItem('tenantId', props.modelTenantKey);
    }
    if (sessionStorage.getItem('tenantId') == null || sessionStorage.getItem('tenantId') == '') {
      message.error('请选择租户');
      return;
    }

    try {
      loading.value = true;
      const userInfo = await userStore.login({
        mobile: data.mobile,
        grant_type: 'app',
        code: data.sms,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.nickName}`,
          duration: 3,
        });
      }
    } catch (error) {
    } finally {
      loading.value = false;
    }
  }
  const getSms = async () => {
    let isCode;
    if (formData.mobile) {
      await userSendLoginSmsApi(formData.mobile);
      message.success('发送成功');
      isCode = true;
    } else {
      message.error('手机号不能为空');
    }
    return isCode;
  };
</script>
