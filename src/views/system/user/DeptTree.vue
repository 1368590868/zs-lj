<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="组织列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      expandAll
      :replaceFields="{ key: 'id', title: 'label' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { deptTreeApi } from '/@/api/sys/dept';

  const emits = defineEmits(['select']);
  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    let params = {};
    treeData.value = (await deptTreeApi(params)) as unknown as TreeItem[];
  }

  function handleSelect(keys) {
    emits('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
