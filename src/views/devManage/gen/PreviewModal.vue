<template>
  <BasicModal width="80%" v-bind="$attrs" @register="registerModal" title="代码预览">
    <template #footer>
      <a-button type="primary" @click="copyClick">一键复制</a-button>
    </template>
    <Tabs v-model:activeKey="activeKey" hide-add>
      <template v-for="item in settingList" :key="item.key">
        <TabPane class="pl-2" :tab="item.name">
          <codemirror v-model="item.content" :extensions="extensions" />
        </TabPane>
      </template>
    </Tabs>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import useClipboard from 'vue-clipboard3';
  import { Codemirror } from 'vue-codemirror';
  import { Tabs, TabPane, message } from 'ant-design-vue';
  import { genDetailApi } from '/@/api/codegen/gen';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { ref } from 'vue';

  const { toClipboard } = useClipboard();
  // const pages = [];
  interface TabItem {
    key: string;
    name: string;
    content: string;
  }
  const extensions = [oneDark];
  const settingList = ref<TabItem[]>([]);
  const activeKey = ref('1');
  defineEmits(['success', 'register']);
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    settingList.value = [];
    let params = {
      dsName: data.treeId,
      tableName: data.record.tableName,
    };
    const res = await genDetailApi(params);
    for (let key in res) {
      var reg = new RegExp('template/', '');
      let a = key.replace(reg, '');
      var reg1 = new RegExp('.vm', '');
      let b = a.replace(reg1, '');
      settingList.value.push({
        key: key,
        name: b,
        content: res[key],
      });
    }
    activeKey.value = settingList.value[0].key;
    setModalProps({ confirmLoading: false });
  });
  const copyClick = async () => {
    try {
      const item = settingList.value.filter((it) => {
        return it.key == activeKey.value;
      });
      await toClipboard(item[0].content);
      message.success('复制成功');
    } catch (e) {}
  };
</script>

<style scoped></style>
