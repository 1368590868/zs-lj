<template>
  <Drawer
    :title="configDetail.dictName"
    :width="720"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <Form
      labelAlign="left"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 12 }"
      layout="horizontal"
      style="margin-top: 30px"
    >
      <Row :gutter="24">
        <Col :span="9">
          <FormItem :label-col="{ span: 7 }" :wrapper-col="{ span: 24 }" label="字典标签">
            <a-input v-model:value="modelFrom.dictLabel" placeholder="请输入" />
          </FormItem>
        </Col>
        <Col :span="9">
          <FormItem :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" label="状态">
            <Select
              ref="select"
              v-model="modelFrom.status"
              style="width: 120px"
              @change="handleChange"
            >
              <SelectOption value="0">正常</SelectOption>
              <SelectOption value="2">删除</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="6">
          <Button type="primary" style="margin-right: 8px" @click="searchList">查询</Button>
          <Button type="primary" style="margin-right: 8px" @click="reset">重置</Button>
        </Col>
        <Col :span="24">
          <BasicTable
            title="字典标签列表"
            titleHelpMessage="字典标签列表"
            :columns="configColumns"
            :dataSource="configData"
            canResize
            bordered
            :actionColumn="actionColumn"
          >
            <template #toolbar>
              <a-button
                type="primary"
                @click="handleDataDict"
                v-if="hasPermission(['sys_dict_data_add'])"
              >
                新增
              </a-button>
            </template>
            <template #action="{ record }">
              <TableAction
                :actions="[
                  {
                    icon: 'clarity:note-edit-line',
                    ifShow: hasPermission(['sys_dict_data_update']),
                    onClick: handleEdit.bind(null, record),
                  },
                  {
                    icon: 'wpf:delete',
                    color: 'error',
                    ifShow: hasPermission(['sys_dict_data_remove']),
                    popConfirm: {
                      title: '是否确认删除',
                      confirm: handleDelete.bind(null, record),
                    },
                  },
                ]"
              />
            </template>
          </BasicTable>
        </Col>
      </Row>
    </Form>
  </Drawer>
  <ItemDrawer @register="registerDrawer" @success="handleSuccess" />
</template>

<script setup lang="ts">
  import {
    Drawer,
    Col,
    Row,
    Form,
    FormItem,
    Button,
    Select,
    SelectOption,
    message,
  } from 'ant-design-vue';
  import { reactive, ref, watch } from 'vue';
  import { drawerItem, configColumns } from './dict.data';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { listDataDictApi, removeDataDictApi } from '/@/api/sys/dictionary';
  import { useDrawer } from '/@/components/Drawer';
  import ItemDrawer from './ItemDrawer.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  const props = defineProps<{
    drawer: drawerItem;
    visible: boolean;
  }>();
  const { hasPermission } = usePermission();
  // 字典项传参
  let configDetail = reactive<drawerItem>({
    dictName: '',
    dictType: '',
  });
  // 搜索字典
  let modelFrom = reactive({
    dictLabel: '',
    status: '',
  });
  const actionColumn = ref({
    width: 100,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  });
  const [registerDrawer, { openDrawer }] = useDrawer();
  const configData = ref();
  // useForm处理
  const useForm = Form.useForm;
  const rulesRef = ref({});
  const { resetFields } = useForm(modelFrom, rulesRef);
  //  子传父
  const emits = defineEmits(['closeDrawer', 'success']);
  // 关闭
  const onClose = () => {
    emits('closeDrawer');
  };
  const reset = () => {
    resetFields();
    listDataDict();
  };
  // 状态选中回调
  const handleChange = (value) => {
    modelFrom.status = value;
  };
  // 新增字典项
  const handleDataDict = () => {
    openDrawer(true, {
      dictType: configDetail.dictType,
      isUpdate: false,
    });
  };
  // 获取字典项列表
  const listDataDict = async () => {
    let params = {
      dictType: configDetail.dictType,
      dictLabel: modelFrom.dictLabel,
      status: modelFrom.status,
      size: 15,
      current: 1,
      pages: 1,
    };
    const res = await listDataDictApi(params);
    configData.value = res.records;
  };
  // 字典项编辑
  function handleEdit(record) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  // 字典项删除
  const handleDelete = async (record: Recordable) => {
    await removeDataDictApi(record.id);
    message.success('删除字典类型成功');
    listDataDict();
  };

  // 新增、编辑成功后操作
  const handleSuccess = () => {
    listDataDict();
  };
  // 新增、编辑成功后操作
  const searchList = () => {
    listDataDict();
  };

  // 字典项列表
  watch(
    () => props.drawer,
    (newValue) => {
      const list = newValue;
      if (list.id) {
        configDetail.dictName = list.dictName;
        configDetail.dictType = list.dictType;
        configDetail.id = list.id;
        listDataDict();
      }
    },
    {
      deep: true,
    },
  );
</script>

<style scoped></style>
