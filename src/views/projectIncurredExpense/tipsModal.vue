<template>
  <BasicModal
    @register="register"
    v-bind="$attrs"
    :footer="false"
    :title="getTitle"
    width="600px"
    @ok="handleSubmit"
  >
    <div class="flex justify-center items-center h-[200px] text-xl">
      提交成功，待项目负责人审核
    </div>
    <div class="flex justify-center">
      <Space :size="50">
        <a-button type="primary" @click="onContinue">继续提交</a-button>
        <a-button type="primary" @click="onDetail">提交记录</a-button>
      </Space>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { Space } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const getTitle = computed(() => '提示');
  const router = useRouter();
  const [register, { closeModal }] = useModalInner();

  const onContinue = () => {
    closeModal();
  };
  const onDetail = () => {
    router.push({ name: 'MyPhaseCost' });
  };
  //   提交
  const handleSubmit = async () => {};
</script>

<style scoped></style>
