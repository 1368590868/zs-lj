<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="查看详情"
    width="900px"
    @ok="handleSubmit"
  >
    <Row :gutter="24">
      <Col :span="24"
        ><span class="text-size-[20px]">{{ detailList.noticeTitle }}</span>
      </Col>
      <Col :span="24">
        <Tag color="pink">{{ priorityTitle }}</Tag>
        <span color="pink">{{ detailList.createTime }}</span>
      </Col>
      <Col :span="24">
        <md-editor v-model="detailList.noticeContent" preview-only />
      </Col>
    </Row>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Row, Col, Tag } from 'ant-design-vue';
  import { detailNoticeApi } from '/@/api/sys/notice';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import { detailListItem } from './notice.data';
  import { computed, reactive } from 'vue';
  let detailList = reactive<detailListItem>({
    noticeTitle: '',
    createTime: '',
    noticeContent: '',
    noticeType: '',
    priority: null,
  });
  const [register, { closeModal }] = useModalInner(async (data) => {
    const res = await detailNoticeApi(data.record.id);
    console.log('res', res);
    detailList.noticeTitle = res.noticeTitle;
    detailList.createTime = res.createTime;
    detailList.noticeContent = res.noticeContent;
    detailList.noticeType = res.noticeType;
    detailList.priority = res.priority;
  });
  function handleSubmit() {
    closeModal();
  }
  defineEmits(['register']);
  function isEmpty(value) {
    if ([null, undefined, '', 'undefined', 'null', 'Null'].includes(value)) {
      return '4';
    }
    return value;
  }
  const priorityTitle = computed(() => {
    let id = isEmpty(detailList.priority);
    let txt = '';
    switch (id) {
      case '1':
        txt = '低';
        break;
      case '2':
        txt = '中';
        break;
      case '3':
        txt = '高';
        break;
      case '4':
        txt = '无';
        break;
    }
    return txt;
  });
</script>
