<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="70vw"
    @ok="handleSubmit"
  >
    <div class="max-h-[60vh] flex flex-col"
      ><BasicTable @register="registerTable" :canResize="false" />
    </div>
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { computed, reactive, ref, unref } from 'vue';
  import { message } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { pageApi } from '/@/api/projectTemplate/projectTemplate';
  import { columns, searchFormSchema } from '../projectTemplate/projectTemplate.data';

  const isUpdate = ref(true);
  const emits = defineEmits(['success', 'register']);
  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    title: '项目模板列表',
    api: pageApi,
    columns,
    formConfig: {
      labelWidth: 80,
      colon: true,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
    },
    beforeFetch: (info) => {
      if (info?.professionTypes) {
        const professionTypes = info.professionTypes.split('-');
        if (professionTypes.length === 2) {
          info.professionType = professionTypes[1];
          info.businessType = professionTypes[0];
        } else {
          info.businessType = professionTypes[0];
        }
        Reflect.deleteProperty(info, 'professionTypes');
      }
      return info;
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      title: '模板编号',
      width: 100,
    },
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({ confirmLoading: false });
  });
  const getTitle = computed(() => '选择项目模板');

  //   提交
  const handleSubmit = async () => {
    if (getSelectRows().length === 0) {
      message.error('请选择一个模板');
      return;
    }
    closeModal();
    emits('success', getSelectRows());
    message.success('添加成功');
    clearSelectedRowKeys();
  };
</script>

<style scoped></style>
