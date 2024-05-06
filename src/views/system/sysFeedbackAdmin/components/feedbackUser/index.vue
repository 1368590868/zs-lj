<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-fieldTime="{ model, field }">
        <DatePicker.RangePicker v-model:value="model[field]" show-time />
      </template>
      <template #attachments="{ record }">
        <div class="flex items-center">
          <div v-for="item in record.attachments" :key="item">
            <Image v-if="filterImg(item)" :width="50" :src="item" />
            <a-button type="primary" shape="circle" size="small" v-else @click="handleFile(item)">
              <DownloadOutlined />
            </a-button>
          </div>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '处理',
              onClick: handleCheck.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除用户反馈',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <StatusModel @register="registerStatusModal" @success="success" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns, searchFormSchema } from './sysFeedback.data';
  import { pageApi, removeApi } from '/@/api/sys/sysFeedback';
  import StatusModel from './StatusModel.vue';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { useModal } from '/@/components/Modal';
  import { message, Image, DatePicker } from 'ant-design-vue';

  const [registerStatusModal, { openModal: openStatusModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '用户反馈列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 60,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      fieldMapToTime: [['fieldTime', ['stime', 'etime'], 'YYYY-MM-DD HH:mm:ss']],
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  // 成功
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    reload();
    message.success('删除成功');
  };
  // 成功
  const success = () => {
    reload();
  };
  // 成功
  function handleCheck(record) {
    openStatusModal(true, { record });
  }
  // 下载
  const handleFile = (url) => {
    window.open(url, '_blank');
  };
  // 预览图片
  const filterImg = (url) => {
    let isImg = true;
    if (url) {
      if (
        url.indexOf('png') != -1 ||
        url.indexOf('jpg') != -1 ||
        url.indexOf('jpeg') != -1 ||
        url.indexOf('TIFF') != -1 ||
        url.indexOf('GIF') != -1 ||
        url.indexOf('BMP') != -1
      ) {
      } else {
        isImg = false;
      }
    }
    return isImg;
  };
</script>
