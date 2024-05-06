<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="修改密码"
    @ok="handleSubmit"
    @visible-change="handleChange"
  >
    <Tabs v-model:activeKey="activeKey" class="w-full">
      <TabPane tab="修改密码" key="1" class="w-full">
        <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
          <FormItem name="orgPassword" class="enter-x">
            <Input.Password
              size="large"
              visibilityToggle
              v-model:value="formData.orgPassword"
              placeholder="旧密码"
            />
          </FormItem>
          <FormItem name="password" class="enter-x">
            <StrengthMeter
              size="large"
              v-model:value="formData.password"
              :placeholder="t('sys.login.password')"
            />
            <span class="text-red-400">密码必须包含大小写字母和数字及特殊字符</span>
          </FormItem>
          <FormItem name="repassword" class="enter-x">
            <Input.Password
              size="large"
              visibilityToggle
              v-model:value="formData.repassword"
              :placeholder="t('sys.login.confirmPassword')"
            />
          </FormItem>
        </Form>
        <!-- <BasicForm @register="registerForm">
          <template #password="{ model, field }">
            <StrengthMeter
              size="large"
              v-model:value="model[field]"
              :placeholder="t('sys.login.password')"
            />
          </template>
          <template #repassword="{ model, field }">
            <Input.Password
              size="large"
              visibilityToggle
              v-model:value="model[field]"
              :placeholder="t('sys.login.confirmPassword')"
            />
          </template>
        </BasicForm> -->
      </TabPane>
      <TabPane tab="短信找回" key="2" class="w-full">
        <div class="step-form-form">
          <Steps :current="current">
            <Step title="短信确认" />
            <Step title="修改密码" />
            <Step title="完成" />
          </Steps>
        </div>
        <div class="mt-5">
          <Step1 v-show="current === 0" @next="handleStep1Next" />
          <Step2 v-show="current === 1" @next="handleStep2Next" v-if="state.initStep2" />
          <Step3 v-show="current === 2" v-if="state.initStep3" />
        </div>
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // import { useForm } from '/@/components/Form/index';
  // import { accountFormSchema } from './data';
  import { userEditPassApi } from '/@/api/sys/user';
  import { Tabs, TabPane, message, Steps, Step, Form, FormItem, Input } from 'ant-design-vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useFormRules, useFormValid, useLoginState, LoginStateEnum } from './useLogin';

  const { setLoginState } = useLoginState();
  const formRef = ref();
  const formData = reactive({
    password: '',
    repassword: '',
    orgPassword: '',
  });
  setLoginState(LoginStateEnum.EDIT_PASSWORD);
  const { validForm } = useFormValid(formRef);
  const { getFormRules } = useFormRules(formData);
  const { t } = useI18n();
  const emits = defineEmits(['success', 'register']);
  const activeKey = ref('1');
  const current = ref(0);
  const state = reactive({
    initStep2: false,
    initStep3: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      if (activeKey.value === '2') {
        closeModal();
        emits('success');
        return;
      }
      const data = await validForm();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      await userEditPassApi(data);
      message.success('修改密码成功');
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function handleStep1Next() {
    current.value++;
    state.initStep2 = true;
  }
  function handleStep2Next() {
    current.value++;
    state.initStep3 = true;
  }
  function handleChange() {
    formData.password = '';
    formData.repassword = '';
    formData.orgPassword = '';
  }
</script>
<style lang="less" scoped></style>
