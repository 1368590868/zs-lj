<template>
  <div class="step2 pl-5 pr-5">
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="password" class="enter-x">
        <StrengthMeter size="large" v-model:value="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem name="repassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.repassword"
          placeholder="确认密码"
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
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { Form, Button, FormItem, InputPassword, message } from 'ant-design-vue';
  import { reactive, ref } from 'vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useFormValid, useFormRules } from './useLogin';
  import { useUserStore, useUserStoreWithOut } from '/@/store/modules/user';
  import { userFindPasswordApi } from '/@/api/sys/user';
  const { t } = useI18n();
  const formData = reactive({
    hasCode: '',
    password: '',
    repassword: '',
  });
  const emits = defineEmits(['next']);
  const loading = ref(false);
  const formRef = ref();
  const { getFormRules } = useFormRules(formData);

  const { validForm } = useFormValid(formRef);
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
      emits('next');
    } catch (error: any) {
      message.error(error);
    }
  }
</script>

<style scoped></style>
