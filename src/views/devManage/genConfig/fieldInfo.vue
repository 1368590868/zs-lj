<template>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleField">提交</a-button>
      </template>
      <!-- 列名称 -->
      <template #columnName="{ record, index }">
        <div @click="handleEdit('columnName', index)">
          <Input
            size="small"
            :ref="(el) => setRef(el, index)"
            v-if="editColList.columnName && editIndList.columnName === index"
            @blur="editColList.columnName = false"
            v-model:value="record.columnName"
          />
          <span v-else>{{ record.columnName }}</span>
        </div>
      </template>
      <!-- 列描述 -->
      <template #columnComment="{ record, index }">
        <div @click="handleEdit('columnComment', index)">
          <Input
            size="small"
            :ref="(el) => setRef(el, index)"
            v-if="editColList.columnComment && editIndList.columnComment === index"
            @blur="editColList.columnComment = false"
            v-model:value="record.columnComment"
          />
          <span v-else>{{ record.columnComment }}</span>
        </div>
      </template>
      <!-- JAVA类型 -->
      <template #javaType="{ record, index }">
        <div @click="handleEdit('javaType', index)">
          <Select
            v-model:value="record.javaType"
            :options="javaTypeOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.javaType = false"
            v-if="editColList.javaType && editIndList.javaType === index"
          />
          <span v-else>{{ record.javaType }}</span>
        </div>
      </template>
      <!-- JAVA属性 -->
      <template #javaField="{ record, index }">
        <div @click="handleEdit('javaField', index)">
          <Input
            size="small"
            :ref="(el) => setRef(el, index)"
            v-if="editColList.javaField && editIndList.javaField === index"
            @blur="editColList.javaField = false"
            v-model:value="record.javaField"
          />
          <span v-else>{{ record.javaField }}</span>
        </div>
      </template>
      <!-- 插入 -->
      <template #isInsert="{ record, index }">
        <div @click="handleEdit('isInsert', index)">
          <Select
            v-model:value="record.isInsert"
            :options="isInsertOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.isInsert = false"
            style="min-width: 80px"
            v-if="editColList.isInsert && editIndList.isInsert === index"
          />
          <div v-else class="blank-area">{{ getFilterStatus(record.isInsert) }}</div>
        </div>
      </template>
      <!-- 编辑 -->
      <template #isEdit="{ record, index }">
        <div @click="handleEdit('isEdit', index)">
          <Select
            v-model:value="record.isEdit"
            :options="isInsertOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.isEdit = false"
            style="min-width: 80px"
            v-if="editColList.isEdit && editIndList.isEdit === index"
          />
          <div v-else class="blank-area">{{ getFilterStatus(record.isEdit) }}</div>
        </div>
      </template>
      <!-- 列表 -->
      <template #isList="{ record, index }">
        <div @click="handleEdit('isList', index)">
          <Select
            v-model:value="record.isList"
            :options="isInsertOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.isList = false"
            style="min-width: 80px"
            v-if="editColList.isList && editIndList.isList === index"
          />
          <div v-else class="blank-area">{{ getFilterStatus(record.isList) }}</div>
        </div>
      </template>
      <!-- 查询 -->
      <template #isQuery="{ record, index }">
        <div @click="handleEdit('isQuery', index)">
          <Select
            v-model:value="record.isQuery"
            :options="isInsertOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.isQuery = false"
            style="min-width: 80px"
            v-if="editColList.isQuery && editIndList.isQuery === index"
          />
          <div v-else class="blank-area">{{ getFilterStatus(record.isQuery) }}</div>
        </div>
      </template>
      <!-- 查询方式 -->
      <template #queryType="{ record, index }">
        <div @click="handleEdit('queryType', index)">
          <Select
            v-model:value="record.queryType"
            :options="queryTypeOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.queryType = false"
            style="min-width: 80px"
            v-if="editColList.queryType && editIndList.queryType === index"
          />
          <div v-else class="blank-area">{{ record.queryType }}</div>
        </div>
      </template>
      <!-- 必填 -->
      <template #isRequired="{ record, index }">
        <div @click="handleEdit('isRequired', index)">
          <Select
            v-model:value="record.isRequired"
            :options="isInsertOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.isRequired = false"
            style="min-width: 80px"
            v-if="editColList.isRequired && editIndList.isRequired === index"
          />
          <div v-else class="blank-area">{{ getFilterStatus(record.isRequired) }}</div>
        </div>
      </template>
      <!-- 显示类型 -->
      <template #htmlType="{ record, index }">
        <div @click="handleEdit('htmlType', index)">
          <Select
            v-model:value="record.htmlType"
            :options="htmlTypeOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.htmlType = false"
            style="min-width: 80px"
            v-if="editColList.htmlType && editIndList.htmlType === index"
          />
          <div v-else class="blank-area">{{ record.htmlType }}</div>
        </div>
      </template>
      <!-- 字典类型 -->
      <template #dictType="{ record, index }">
        <div @click="handleEdit('dictType', index)">
          <Select
            v-model:value="record.dictType"
            :options="dictOptions"
            :ref="(el) => setRef(el, index)"
            size="small"
            @blur="editColList.dictType = false"
            style="min-width: 80px"
            v-if="editColList.dictType && editIndList.dictType === index"
          />
          <div v-else class="blank-area">{{ getFilterDict(record.dictType)?.label }}</div>
        </div>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import {
    fieldColumns,
    javaTypeOptions,
    isInsertOptions,
    queryTypeOptions,
    htmlTypeOptions,
  } from './genConfig';
  import { genSubmitApi, genEditDetailApi } from '/@/api/codegen/gen';
  import { useRoute } from 'vue-router';
  import { nextTick, reactive, ref } from 'vue';
  import { message, Input, Select } from 'ant-design-vue';
  import { listTypeDictApi } from '/@/api/sys/dictionary';

  const genData = ref();
  const dictOptions = ref([]);
  const [registerTable, { getDataSource, setTableData, reload }] = useTable({
    rowKey: 'id',
    columns: fieldColumns,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      return info;
    },
    pagination: {
      current: 1,
      pageSize: 1000,
    },
  });
  const editColList = reactive({
    columnName: false,
    columnComment: false,
    javaType: false,
    javaField: false,
    isInsert: false,
    isEdit: false,
    isList: false,
    isQuery: false,
    queryType: false,
    isRequired: false,
    htmlType: false,
    dictType: false,
  });
  const editIndList = reactive({
    columnName: '',
    columnComment: '',
    javaType: '',
    javaField: '',
    isInsert: '',
    isEdit: '',
    isList: '',
    isQuery: '',
    queryType: '',
    isRequired: '',
    htmlType: '',
    dictType: '',
  });
  const columnNameRef: any = ref([]);
  const handleEdit = (name, index) => {
    editIndList[name] = index;
    editColList[name] = true;
    nextTick(() => {
      columnNameRef.value[index].focus();
    });
  };
  const setRef = (el, index) => {
    if (el) {
      columnNameRef.value[index] = el;
    }
  };

  const handleField = async () => {
    try {
      let params = {
        basicInfo: genData.value.basicInfo,
        dsName: route.query.dsName,
        tableName: route.query.tableName,
        genInfo: genData.value.genInfo,
        columnInfos: getDataSource(),
      };
      await genSubmitApi(params);
      message.success('提交成功！');
      reload();
    } catch (error) {
      console.log(error);
    }
  };
  const route = useRoute();
  const getDetailList = async () => {
    let params = {
      dsName: route.query.dsName,
      tableName: route.query.tableName,
    };
    const res = await genEditDetailApi(params);
    genData.value = res;
    setTableData(res.columnInfos);
  };
  getDetailList();
  const getFilterStatus = (status) => {
    let txt;
    switch (status) {
      case '0':
        txt = '否';
        break;
      case '1':
        txt = '是';
        break;

      default:
        break;
    }
    return txt;
  };
  const getDictList = async () => {
    let params = {
      current: 1,
      size: 1000,
    };
    const res = await listTypeDictApi(params);
    let arr: any = [];
    res.records.forEach((it) => {
      arr.push({ label: it.dictName, value: it.dictType });
    });
    dictOptions.value = arr;
  };
  const getFilterDict = (status) => {
    let filerCol: any = dictOptions.value.filter((it: any) => {
      return it.value === status;
    });
    return filerCol[0];
  };
  getDictList();
</script>

<style scoped>
  .blank-area {
    height: 25px;
    text-align: center;
    background-color: transparent;
  }
</style>
