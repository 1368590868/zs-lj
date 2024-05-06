<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="数据源列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      expandAll
      :replaceFields="{ key: 'name', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { dataSourceListApi } from '/@/api/codegen/dataSource';

  const emits = defineEmits(['select']);
  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    let params = {
      size: 1000,
    };
    const res = await dataSourceListApi(params);
    treeData.value = res.records as unknown as TreeItem[];
  }

  function handleSelect(keys) {
    emits('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
