<template>
  <div>
    <input
      ref="inputRef"
      accept=".png, .jpg,.jpeg"
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
    console.log('rawFile', rawFile);
    if (!rawFile) return;
    let Base64File: any = '';
    let fileType = rawFile.name.slice(rawFile.name.indexOf('.'));
    if (fileType != '.png' && fileType != '.jpg' && fileType != '.jpeg') {
      message.error('请上传图片文件png、jpg、jpeg');
      return;
    }
    const inputRefDom = unref(inputRef);
    if (inputRefDom) {
      inputRefDom.value = '';
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      Base64File = e?.target.result;
      emits('success', Base64File);
    };
    reader.readAsDataURL(rawFile);
  };
</script>

<style scoped></style>
