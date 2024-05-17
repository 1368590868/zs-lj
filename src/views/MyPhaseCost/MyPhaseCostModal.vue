<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="审批意见"
    width="700px"
    @ok="handleSubmit"
  >
    <div> </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { pageApi } from '/@/api/projectAuditOpinion/projectAuditOpinion';
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    console.log(data, 'data');
    const projectPhaseCostId = data.record.id;
    // 获取审批意见详情
    const res = await pageApi({ projectPhaseCostId });
    console.log(res);
    setModalProps({ confirmLoading: false });
  });

  //   提交
  const handleSubmit = async () => {
    closeModal();
  };
</script>

<style scoped></style>
