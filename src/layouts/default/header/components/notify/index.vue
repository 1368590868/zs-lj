<template>
  <div :class="prefixCls">
    <Popover title="未读消息" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="count" dot :numberStyle="numberStyle">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs @change="changeTabs" v-model:activeKey="activeKey">
          <TabPane key="1">
            <template #tab>
              公告
              <span> ({{ notice1 }}) </span>
            </template>
            <div
              class="cursor-pointer"
              v-for="item in listData.records"
              :key="item.id"
              @click="goNotice(item.id)"
            >
              <Tag class="tag" color="green">
                {{ item.noticeTitle }}
              </Tag>
              {{ item.sendTime }}
            </div>
          </TabPane>
          <TabPane key="2">
            <template #tab>
              消息
              <span> ({{ notice2 }})</span>
            </template>
            <div
              class="cursor-pointer"
              v-for="item in listData1.records"
              :key="item.id"
              @click="goNotice(item.id)"
            >
              <Tag class="tag" color="green">
                {{ item.noticeTitle }}
              </Tag>
              {{ item.sendTime }}
            </div>
          </TabPane>
        </Tabs>
      </template>
    </Popover>
    <NoticeDetail @register="registerDetail" />
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Popover, Tabs, Badge, TabPane, Tag } from 'ant-design-vue';
  import NoticeDetail from './notifyModal.vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { queryNoticeApi } from '/@/api/sys/notice';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';
  const { prefixCls } = useDesign('header-notify');
  // const listData = ref(tabListData);
  const listData = ref();
  const listData1 = ref();
  const notice1 = ref();
  const notice2 = ref();
  const activeKey = ref('1');
  const numberStyle = {};
  const count = computed(() => {
    let count = notice1.value + notice2.value;
    return count;
  });
  const [registerDetail, { openModal }] = useModal();
  function changeTabs(key) {
    if (key === 1) {
      activeKey.value = '1';
    } else if (key === 2) {
      activeKey.value = '2';
    }
    getNoticeList();
  }
  const getNoticeList = async () => {
    try {
      let params = {
        size: 10,
        current: 1,
        pages: 1,
      };
      const res = await queryNoticeApi(1, params);
      const res1 = await queryNoticeApi(2, params);
      listData.value = res;
      listData1.value = res1;
      notice1.value = res.total;
      notice2.value = res1.total;
    } catch (error) {
      console.log(error);
    }
  };
  getNoticeList();
  const goNotice = (id) => {
    // router.push('/system/notice');
    openModal(true, {
      isUpdate: false,
      id,
    });
    getNoticeList();
  };
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
