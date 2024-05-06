<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="分配用户"
    destroyOnClose
    width="700px"
    @ok="handleSubmit"
  >
    <Transfer
      :list-style="{
        width: '300px',
        height: '500px',
      }"
      :titles="['未选用户', '选中用户']"
      :data-source="mockData"
      show-search
      :filter-option="filterOption"
      :target-keys="targetKeys"
      :render="(item) => item.title"
      @change="handleChange"
      @search="handleSearch"
    />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Transfer } from 'ant-design-vue';
  import { ref } from 'vue';
  import { getUserListApi } from '/@/api/sys/user';
  import { addAuthUserApi } from '/@/api/sys/role';

  const emits = defineEmits(['success', 'register']);
  interface MockData {
    key: string;
    title: string;
    dept: string;
    name: string;
    chosen: boolean;
  }
  const infoData = ref(); // 列数据
  const mockData: any = ref<MockData[]>([]); // 数据
  const targetKeys = ref<string[]>([]); // 显示右侧的集合
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    infoData.value = data.record;
    targetKeys.value = data.record.userIds;
    setModalProps({ confirmLoading: false });
    getTransferList('');
  });
  const getTransferList = async (name) => {
    const mData: any = [];
    const res = await getUserListApi({ size: 1000, nickName: name });
    res.records.forEach((it) => {
      const data = {
        key: it.id,
        title: it.nickName + `(${it.phone})`,
        name: it.nickName,
        dept: it.deptId,
        chosen: false,
      };
      mData.push(data);
    });
    mockData.value = mData;
  };
  const handleSubmit = async () => {
    try {
      setModalProps({ confirmLoading: true });
      let params = {
        roleId: infoData.value.id,
        userIds: targetKeys.value,
      };
      await addAuthUserApi(params);
      closeModal();
      emits('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
  // 接受 返回参数
  const filterOption = (option: MockData) => {
    return option;
  };

  const handleChange = (keys: string[]) => {
    targetKeys.value = keys;
  };
  const handleSearch = (dir: string, value: string) => {
    if (dir === 'left') {
      getTransferList(value);
    }
  };
</script>

<style scoped></style>
