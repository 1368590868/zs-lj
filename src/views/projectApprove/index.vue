<template>
  <div class="h-30 text-2xl">
    {{ tipText.createByName }}：申请{{ tipText.projectName }}项目{{
      tipText.flowType === 1 ? '管控延期' : '管控结束'
    }}，请审批！
  </div>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { findByFlowIdApi } from '/@/api/projectApprove/projectApprove';

  const props = defineProps({
    /**审批实例ID */
    id: {
      type: String,
      default: '',
    },
  });

  const tipText = ref({
    projectName: '',
    createByName: '',
    flowType: 1,
  });
  watchEffect(async () => {
    const res = await findByFlowIdApi({ flowId: props.id });
    tipText.value = res;
  });
</script>
