<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        autocomplete
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>
    <FormItem name="code" class="enter-x">
      <div class="codefix">
        <Input
          size="large"
          visibilityToggle
          v-model:value="formData.code"
          placeholder="请输入验证码"
        />
        <Image @click="handleCode" :preview="false" :width="100" :src="imgCode" />
      </div>
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Divider, Image, message } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { getLoginCode } from '/@/api/login/login';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { AesEncryption, encryptByBase64, decodeByBase64 } from '/@/utils/cipher';
  import { cacheLoginCipher } from '/@/settings/encryptionSetting';

  const props = defineProps({
    modelTenantKey: {
      type: String,
    },
  });
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification } = useMessage();
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const imgCode = ref<string>();
  const imgUuid = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData: any = reactive({
    account: '',
    password: '',
    code: '',
    grant_type: '',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);
  const key = cacheLoginCipher.key;
  const iv = cacheLoginCipher.iv;
  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    if (props.modelTenantKey) {
      console.log('props.modelTenantKey', props.modelTenantKey);
      sessionStorage.setItem('tenantId', props.modelTenantKey);
    }

    if (sessionStorage.getItem('tenantId') == null || sessionStorage.getItem('tenantId') == '') {
      message.error('地址栏租户不正确');
      return;
    }
    try {
      loading.value = true;
      const encryption = new AesEncryption({ key, iv });
      const userInfo = await userStore.login({
        password: encryption.encryptByAES(data.password),
        username: data.account,
        grant_type: 'password',
        code: data.code || props.modelTenantKey,
        uuid: imgUuid.value,
        mode: 'none', //不要默认的错误提示
      });
      handleCode();
      if (userInfo) {
        // 记住密码
        if (rememberMe.value) {
          localStorage.setItem('userNameRemember', data.account);
          localStorage.setItem(
            'userPasswordRemember',
            encryptByBase64(data.password), //base加密
          );
        } else {
          localStorage.removeItem('userNameRemember');
          localStorage.removeItem('userPasswordRemember');
        }

        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.nickName}`,
          duration: 3,
        });
      }
    } catch (error) {
      handleCode();
    } finally {
      loading.value = false;
    }
  }
  const handleCode = async () => {
    const res = await getLoginCode();
    imgCode.value = `data:image/png;base64,${res.img}`;
    imgUuid.value = res.uuid;
  };
  handleCode();
  // 检查加载页面时，查看账户密码是否存在
  const hasUserCodeOrPassword = () => {
    if (localStorage.getItem('userNameRemember') && localStorage.getItem('userPasswordRemember')) {
      formData.account = localStorage.getItem('userNameRemember');
      let pwd: any = localStorage.getItem('userPasswordRemember');
      formData.password = decodeByBase64(pwd); //解密
      rememberMe.value = true;
    }
  };

  hasUserCodeOrPassword();
</script>
<style lang="less" scoped>
  .codefix {
    display: flex;
    input {
      flex: 1;
      margin-right: 10px;
    }
    > div {
      border: 1px solid #d9d9d9;
      width: 100px;
      cursor: pointer;
    }
  }
</style>
