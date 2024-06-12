<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="审批意见"
    width="700px"
    @ok="handleSubmit"
    :show-cancel-btn="false"
  >
    <div v-for="item of detail" :key="item.id" class="flex justify-between">
      <span>{{ item.createByName }}: {{ item.auditOpinion }}</span>
      <span class="text-xs">{{ item.createTime }}</span>
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { pageApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
  import { ref } from 'vue';
  const detail = ref<Recordable[]>([]);
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    const projectPhaseCostId = data.record.id;
    // 获取审批意见详情
    const res = await pageApi({ projectPhaseCostId });
    detail.value = res.records;
    console.log(res);
    setModalProps({ confirmLoading: false });
  });

  //   提交
  const handleSubmit = async () => {
    closeModal();
  };
</script>

<style scoped></style>
