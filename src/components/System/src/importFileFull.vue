<template>
  <div>
    <input ref="inputRef" type="file" v-show="false" @change="handleInputClick" />
    <Button type="primary" @click="importFull">{{ props.title }}</Button>
  </div>
</template>

<script setup lang="ts">
  import { ref, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  const props = defineProps<{
    title: string;
  }>();
  const inputRef = ref<HTMLInputElement | null>(null);

  const emits = defineEmits(['success']);
  const importFull = () => {
    const inputRefDom = unref(inputRef);
    inputRefDom && inputRefDom.click();
  };
  // 导入
  const handleInputClick = async (e) => {
    const files = e && (e.target as HTMLInputElement).files;
    const rawFile = files && files[0];
    if (!rawFile) return;
    const inputRefDom = unref(inputRef);
    if (inputRefDom) {
      inputRefDom.value = '';
    }
    emits('success', rawFile);
  };
</script>

<style scoped></style>
