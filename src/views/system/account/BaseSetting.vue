<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <Row :gutter="24">
      <Col :span="14">
        <BasicForm @register="register">
          <template #remark="{ model, field }">
            <Input.TextArea rows="4" v-model:value="model[field]" showCount :maxlength="300" />
          </template>
        </BasicForm>
      </Col>
      <Col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :value="avatar"
            :uploadApi="(uploadApi as any)"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </Col>
    </Row>
    <Button type="primary" @click="handleSubmit"> 更新基本信息 </Button>
  </CollapseContainer>
</template>

<script lang="ts" setup>
  import { Button, Row, Col, Input } from 'ant-design-vue';
  import { computed, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadApi } from '/@/api/sys/upload';
  import headerImg from '/@/assets/images/logoAvatar.png';
  import { baseSetSchemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { userEditInfoApi } from '/@/api/sys/user';
  const { createMessage } = useMessage();
  const userStore = useUserStore();
  const [register, { setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    schemas: baseSetSchemas,
    showActionButtonGroup: false,
  });
  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo;
    return avatar || headerImg;
  });
  onMounted(() => {
    let userDetail = {
      ...userStore.getUserInfo,
      avatar: '',
    };
    setFieldsValue({ ...userDetail });
  });
  const updateAvatar = async (src: string, data) => {
    const userInfo = userStore.getUserInfo;
    let params = {
      avatar: data.data,
    };
    await userEditInfoApi(params);
    userInfo.avatar = src;
    userStore.setUserInfo(userInfo);
  };
  const handleSubmit = async () => {
    const values = await validate();
    let params = {
      ...values,
      avatar: avatar.value,
    };
    await userEditInfoApi(values);
    userStore.setUserInfo(params);
    createMessage.success('更新成功！');
  };
</script>
<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
