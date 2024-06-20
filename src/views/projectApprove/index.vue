<template>
  <PageWrapper title="审批信息">
    <Card>
      <div class="h-30 text-2xl">
        {{ tipText.controlOpinion }}：申请{{ tipText.projectName }}项目{{ typeText }}，请审批！
      </div>
    </Card>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useRouter } from 'vue-router';
  import { detail } from '/@/api/project/project';
  import { onMounted, ref } from 'vue';

  const router = useRouter();
  const { id, type = '1' } = router.currentRoute.value.params;
  const typeText = type === '1' ? '管控结束' : '管控延期';
  const tipText = ref({
    projectName: '',
    controlOpinion: '',
  });
  onMounted(async () => {
    const res = await detail(id);
    tipText.value = res;
  });
</script>
