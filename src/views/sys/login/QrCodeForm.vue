<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x">手机APP扫码</div>
    <div class="enter-x min-w-64 min-h-64">
      <div class="text-center" v-if="ifBlock">
        <img style="width: 200px" :src="imgCodeUrl" @click.stop="" />
      </div>
      <div v-if="!ifBlock" class="text-center relative flex flex-col justify-center items-center">
        <img class="opacity-20" style="width: 200px" :src="imgCodeUrl" @click.stop="" />
        <div class="absolute top-20 left-26">
          <img style="width: 45px" :src="qcRead" @click.stop=""
        /></div>
        <div class="text-xl">扫描成功!</div>
        <div class="text-gray-600">请在手机/平板上根据提示确认登录</div>
      </div>

      <Divider class="enter-x">{{ t('sys.login.scanSign') }}</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBack">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>
<script lang="ts" setup>
  import { computed, onBeforeMount, onMounted, ref, unref, watch, watchEffect } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button, Divider, message } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import qcRead from '/@/assets/images/qcRead.png';
  import { useLoginState, LoginStateEnum } from './useLogin';
  import { codeTokenApi, codeCheckApi } from '/@/api/login/codeLogin';
  import { useUserStore } from '/@/store/modules/user';

  let timer;
  const imgCodeUrl = ref();
  const cookieValue = ref();
  const cookieState = ref();
  const ifBlock = ref(true);
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);
  const getCodeImg = async () => {
    const res = await codeTokenApi();
    imgCodeUrl.value = 'data:image/png;base64,' + res.base64Qrcode;
    cookieValue.value = res.token;
    getCodeStatus();
  };

  const getCodeStatus = async () => {
    let params = {
      token: cookieValue.value,
    };
    const res = await codeCheckApi(params);
    cookieState.value = res.state;
    if (res.state === '204') {
      message.success('扫码成功,请稍等');
      const token = `bearer ${res.authorzToken}`;
      const userStore = useUserStore();
      userStore.qcLogin(token);
      ifBlock.value = false;
      clearInterval(Number(timer));
    } else if (res.state === '202') {
      ifBlock.value = false;
    } else {
      ifBlock.value = true;
    }
  };

  onMounted(() => {});
  const handleBack = () => {
    clearInterval(Number(timer));
    handleBackLogin();
  };
  onBeforeMount(() => {
    // 清理定时器要处理 timer 的类型
    clearInterval(Number(timer));
  });
  watchEffect(() => {
    if (cookieValue.value) {
      timer = setInterval(() => {
        getCodeStatus();
      }, 3000);
    }
  });
  watch(
    () => getShow,
    () => {
      if (getShow.value) {
        getCodeImg();
      }
    },
    {
      deep: true,
    },
  );
</script>
<style lang="less" scoped>
  .imgBlock {
    width: 200px;
    height: 200px;
    background: rgba(red, red#ccc, 1);
  }
</style>
