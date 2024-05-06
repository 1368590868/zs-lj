<template>
  <div>
    <input
      ref="inputRef"
      accept=".png,.jpg,.gif"
      type="file"
      v-show="false"
      @change="handleInputClick"
    />
    <Button type="primary" @click="importExcel">{{ props.title }}</Button>
  </div>
</template>

<script setup lang="ts">
  import { ref, unref } from 'vue';
  import { Button, message } from 'ant-design-vue';
  const props = defineProps<{
    title: string;
  }>();
  const inputRef = ref<HTMLInputElement | null>(null);

  const emits = defineEmits(['success']);
  const importExcel = () => {
    const inputRefDom = unref(inputRef);
    inputRefDom && inputRefDom.click();
  };
  // excel导入
  const handleInputClick = async (e) => {
    const files = e && (e.target as HTMLInputElement).files;
    const rawFile = files && files[0];
    if (!rawFile) return;
    if (
      rawFile.type != 'image/jpeg' &&
      rawFile.type != 'image/png' &&
      rawFile.type != 'image/gif'
    ) {
      message.error('请上传图片文件png、jpg、gif');
      return;
    }
    const inputRefDom = unref(inputRef);
    if (inputRefDom) {
      inputRefDom.value = '';
    }

    emits('success', rawFile);
  };
</script>

<style scoped></style>
