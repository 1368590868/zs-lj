<template>
  <div class="h-30 text-2xl">
    {{ tipText.controlOpinion }}：申请{{ tipText.projectName }}项目{{ typeText }}，请审批！
  </div>
</template>

<script lang="ts" setup>
  import { detail } from '/@/api/project/project';
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    /**项目的详情ID,通过路由参数id获取 */
    id: {
      type: String,
      default: '',
    },
    /**审批类型，通过路由参数type获取 */
    type: {
      type: String,
      default: '1',
    },
  });
  const typeText = props.type === '1' ? '管控结束' : '管控延期';
  const tipText = ref({
    projectName: '',
    controlOpinion: '',
  });
  onMounted(async () => {
    const res = await detail(props.id);
    tipText.value = res;
  });
</script>
