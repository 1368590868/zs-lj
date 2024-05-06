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
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from './sysFeedback.data';
  import { pageApi } from '/@/api/sys/sysFeedback';
  import { Image, DatePicker } from 'ant-design-vue';
  import { DownloadOutlined } from '@ant-design/icons-vue';

  const [registerTable] = useTable({
    title: '用户反馈列表',
    api: pageApi,
    columns,
    searchInfo: {
      user: true,
    },
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
  });
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
