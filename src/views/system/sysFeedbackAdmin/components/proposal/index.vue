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
              label: '已读',
              onClick: handleCheck.bind(null, record),
            },
            {
              icon: 'wpf:delete',
              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { pageApi, removeApi, readApi } from '/@/api/sys/sysProposal';
  import { columns, searchFormSchema } from './sysProposal.data';
  import { DownloadOutlined } from '@ant-design/icons-vue';
  import { Image, DatePicker, message } from 'ant-design-vue';

  const [registerTable, { reload }] = useTable({
    title: '优化建议列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 80,
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
  // 已读
  const handleCheck = async (record: Recordable) => {
    await readApi(record.id);
    reload();
    message.success('已读成功');
  };
  // 删除用户建议
  const handleDelete = async (record: Recordable) => {
    await removeApi(record.id);
    reload();
    message.success('删除成功');
  };
  // 下载
  const handleFile = (url) => {
    window.open(url, '_blank');
  };
  // 预览图片
  const filterImg = (url) => {
    console.log('url', url);
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
