<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <Card>
      <template #title>
        <div class="flex justify-between">
          <div>设置项目阶段里程碑及预算</div>
          <div>
            <a-button type="primary" @click="onRemark">设置项目里程碑时间和标题</a-button>
          </div>
        </div>
      </template>
      <BasicForm @register="registerGroup" @submit="handleSubmitGroup">
        <template #phaseBudgetRatio="{ model, field }">
          <InputNumber
            :min="0"
            :max="100"
            :formatter="(value) => `${value}%`"
            :parser="(value) => value.replace('%', '')"
            v-model:value="model[field]"
          />
        </template>
      </BasicForm>
    </Card>
    <div class="mt-6"></div>
    <Card title="提示">
      <Table
        :columns="tipsColumns"
        :dataSource="tipsArr"
        :striped="true"
        rowKey="key"
        showTableSetting
        :pagination="false"
        :showHeader="false"
        :showIndexColumn="false"
        align="left"
        :rowClassName="(record, index) => (index % 2 === 1 ? null : 'table-striped')"
      />
    </Card>
    <div class="mt-6"></div>
    <div class="flex justify-center">
      <Space>
        <a-button @click="onCancel">返回</a-button>
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </Space>
    </div>
    <ProjectDetailModal @register="registerModal" @success="onModalSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { Card, InputNumber, Table, Space, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail } from '/@/api/project/project';
  import { onMounted, reactive, ref, unref } from 'vue';
  import { useDescription, Description } from '/@/components/Description';
  import { useRouter } from 'vue-router';
  import { formSchema, schema } from './projectMilestoneConfig.data';
  import ProjectDetailModal from './projectMilestoneConfigModal.vue';
  import { useModal } from '/@/components/Modal';
  import { addApi } from '/@/api/projectPhase/projectPhase';

  const router = useRouter();
  const templateData = ref([]);
  const [registerModal, { openModal }] = useModal();

  const tipsArr = [
    { title: '1.可拆解3-20个阶段，管控时间为合同开始时间到结束时间', key: '1' },
    { title: '2.各个阶段的预算总金额不超过项目总预算', key: '1' },
    { title: '3.可拆解3-20个阶段，管控时间为合同开始时间到结束时间', key: '1' },
    { title: '4.各个阶段的预算总金额不超过项目总预算', key: '1' },
  ];
  const tipsColumns = [{ title: 'tips', dataIndex: 'title', key: 'tips' }];

  const count = ref(0);
  const [
    registerGroup,
    {
      appendSchemaByField: appendSchemaByFieldGroup,
      getFieldsValue: getFieldsValueGroup,
      resetSchema,
      setFieldsValue,
      validate,
    },
  ] = useForm({
    schemas: [],
    labelWidth: 100,
    baseColProps: { span: 8 },
    showActionButtonGroup: false,
    fieldMapToTime: [['date', ['startDate', 'endDate'], 'YYYY-MM-DD']],
  });

  const dataSource = reactive({});
  const [register] = useDescription({
    title: '项目基础信息',
    bordered: false,
    data: dataSource,
    schema,
  });

  onMounted(() => {
    getDetail();
  });

  const getDetail = async () => {
    const params = router.currentRoute.value.query;
    const data = await detail(params.id);
    Object.assign(dataSource, data);
  };

  const onRemark = () => {
    openModal(true, {
      isUpdate: true,
      dataSource,
    });
  };
  const handleSubmitGroup = () => {
    console.log(getFieldsValueGroup());
  };
  const onModalSuccess = (val) => {
    templateData.value = val;
    initForm();
  };

  const initForm = async () => {
    count.value = 0;
    resetSchema(formSchema(count));
    JSON.parse(unref(templateData)[0]['phaseBudgetRatio']).map((x) => {
      addGroup();
    });

    initValue();
  };
  const initValue = () => {
    const rowData = unref(templateData)[0];
    let field: any[] = [];
    JSON.parse(rowData['phaseBudgetRatio']).map((x) => {
      field.push({ phaseBudgetRatio: x });
    });
    console.log(field, 'field');
    field.map((x, i) => {
      setFieldsValue({
        [`field[${i}].phaseBudgetRatio`]: x.phaseBudgetRatio,
        [`field[${i}].date`]: [dataSource['planEndDate'], dataSource['planEndDate']],
      });
    });
  };
  // 自动添加字段组
  const addGroup = () => {
    formSchema(count).map((x) => {
      // 解决重置表单后，重复添加字段组的问题
      if (count.value === 0) return;
      appendSchemaByFieldGroup(x, '');
    });
    count.value++;
  };

  const onSubmit = async () => {
    const values = await validate();
    await addApi(convertObjectToArray(values));
    console.log(convertObjectToArray(values), 'values');
    message.success('添加成功');
  };
  const onCancel = () => {
    router.push('/project/projectList');
  };

  interface FormDataItem {
    phaseTitle: string;
    date: string[];
    phaseBudgetRatio: string;
    phaseBudgetCost: string;
  }
  /**
   *
   * @param data 转换数据
   * @returns 返回Form数组
   */
  function convertObjectToArray(data: Record<string, string | string[]>): FormDataItem[] {
    const keys = Object.keys(data);
    const result: FormDataItem[] = [];

    keys.forEach((key) => {
      const indexMatch = key.match(/\d+/);
      if (indexMatch) {
        const index = parseInt(indexMatch[0]);
        if (!result[index]) {
          result[index] = {
            phaseTitle: '',
            date: [],
            phaseBudgetRatio: '',
            phaseBudgetCost: '',
          };
        }
        const property = key.split('.').pop()!;
        if (Array.isArray(data[key])) {
          result[index][property] = data[key] as string[];
        } else {
          result[index][property] = data[key] as string;
        }
      }
    });

    return result;
  }
</script>

<style lang="less" scoped>
  :global(.ant-input-number) {
    width: 80%;
  }
  .ant-table-striped :global(.table-striped) td {
    background-color: #fafafa;
  }
</style>
