<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="模块列表"
      toolbar
      :show-icon="false"
      search
      ref="treeRef"
      :clickRowToExpand="false"
      :treeData="treeData"
      expandAll
      :replaceFields="{ key: 'modelKey', title: 'name' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, unref } from 'vue';

  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { modelListApi } from '/@/api/codegen/module';

  const emits = defineEmits(['select']);
  const treeData = ref<TreeItem[]>([]);

  async function fetch() {
    let params = {
      size: 1000,
    };
    const res = await modelListApi(params);
    res.records.forEach((it) => {
      delete it.icon;
    });
    treeData.value = res.records as unknown as TreeItem[];
    let keys = [treeData.value[0].modelKey];
    getTree().setSelectedKeys([treeData.value[0].modelKey]);
    handleSelect(keys);
  }
  const treeRef = ref<Nullable<TreeActionType>>(null);
  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  function handleSelect(keys) {
    emits('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
