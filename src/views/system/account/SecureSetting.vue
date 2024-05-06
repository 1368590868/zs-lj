<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <!-- <Row :gutter="24">
      <Col :span="22">
        <div>账户密码</div>
        <div>当前密码强度: 强</div>
      </Col>
      <Col :span="2"> 修改密码 </Col>
    </Row> -->
    <List>
      <template v-for="item in secureSettingList" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div class="extra" @click="editPass">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </CollapseContainer>
  <AccountModal @register="registerModal" />
</template>
<script lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container/index';
  import { List, ListItem, ListItemMeta } from 'ant-design-vue';
  import AccountModal from './AccountModal.vue';
  import { secureSettingList } from './data';
  import { useModal } from '/@/components/Modal';
  const [registerModal, { openModal }] = useModal();
  const editPass = () => {
    openModal(true);
  };
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
