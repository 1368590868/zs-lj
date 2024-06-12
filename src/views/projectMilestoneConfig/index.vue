<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <Card>
      <template #title>
        <div class="flex justify-between">
          <div>设置项目阶段里程碑及预算</div>
          <div v-if="isDefer !== '1'">
            <a-button type="primary" @click="onRemark">选择模板</a-button>
          </div>
        </div>
      </template>
      <BasicForm @register="registerGroup" @submit="handleSubmitGroup">
        <template #phaseTitle="{ model, field }">
          <!-- 需要使用field判断 -->
          <Input
            required
            :disabled="phaseTitleDisabled(field)"
            v-model:value="model[field]"
            placeholder="请输入里程碑名称"
          />
        </template>
        <template #phaseBudgetRatio="{ model, field }">
          <InputNumber
            class="w-[calc(100% - 1rem)]]"
            :min="0"
            :max="100"
            :disabled="isDefer !== '1'"
            v-model:value="model[field]"
            @change="
              () => {
                model[`field[${field.match(/\d+/)?.[0]}].phaseBudgetCost`] = _.round(
                  dataSource['generalBudget'] * (model[field] / 100),
                  2,
                ).toFixed(2);
              }
            "
          />
          <span>&nbsp;&nbsp;%</span>
        </template>
      </BasicForm>
    </Card>
    <div class="mt-6"></div>
    <div class="flex justify-center">
      <Space :size="50">
        <a-button class="w-[150px]" @click="onCancel">返回</a-button>
        <a-button class="w-[150px]" type="primary" @click="confirmDialog">提交</a-button>
      </Space>
    </div>
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

    <ProjectDetailModal @register="registerModal" @success="onModalSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form';
  import { Card, InputNumber, Table, Space, message, Modal, Input } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail } from '/@/api/project/project';
  import { computed, createVNode, onMounted, reactive, ref, unref } from 'vue';
  import { useDescription, Description } from '/@/components/Description';
  import { useRouter } from 'vue-router';
  import { formSchema, schema } from './projectMilestoneConfig.data';
  import ProjectDetailModal from './projectMilestoneConfigModal.vue';
  import { useModal } from '/@/components/Modal';
  import { addApi, pageApi } from '/@/api/projectPhase/projectPhase';
  import _ from 'lodash-es';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { pageApi as templatePageApi } from '/@/api/projectTemplate/projectTemplate';
  const router = useRouter();
  const templateData = ref<any[]>([]);
  const isDefer = computed(() => {
    return router.currentRoute.value.query.isDefer;
  });
  const [registerModal, { openModal }] = useModal();

  const tipsArr = [
    { title: '1.管控时间为工程计划开始时间到结束时间；', key: '1' },
    { title: '2.里程碑阶段数和对应的预算比例是根据模板计数；', key: '1' },
    { title: '3.只需要设置里程碑标题和阶段时间，请谨慎设置，提交后不允许修改；', key: '1' },
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
    colon: true,
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

  const phaseTitleDisabled = (field: string) => {
    // 找出最后一个阶段索引
    const currentLength = JSON.parse(templateData.value[0]['phaseBudgetRatio'])?.length;
    return (
      isDefer.value === '1' &&
      templateData.value.length > 0 &&
      currentLength !== +(field.match(/\d+/)?.[0] ?? 0)
    );
  };

  onMounted(async () => {
    // 是否延期配置 1是 0否
    await getDetail();
    if (isDefer.value === '1') {
      await getPhaseList();
    } else {
      // 获取通用模板
      await getTemplate();
    }
  });
  const getPhaseList = async () => {
    const res = await pageApi({ projectId: router.currentRoute.value.query.id });
    const arr = res.records.map((x) => x.phaseBudgetRatio);
    // 重新初始化表单
    templateData.value = [{ phaseBudgetRatio: JSON.stringify(arr) }];
    initForm();
    res.records.map((x, i) => {
      setFieldsValue({
        [`field[${i}].phaseTitle`]: x['phaseTitle'],
        [`field[${i}].phaseBudgetRatio`]: x['phaseBudgetRatio'],
        [`field[${i}].date`]: [x['phaseStartDate'], x['phaseEndDate']],
        [`field[${i}].phaseBudgetCost`]: _.round(
          dataSource['generalBudget'] * (x.phaseBudgetRatio / 100),
          2,
        ).toFixed(2),
      });
    });
  };
  const getDetail = async () => {
    const params = router.currentRoute.value.query;
    const data = await detail(params.id);
    Object.assign(dataSource, data);
  };
  const getTemplate = async () => {
    const res = await templatePageApi({ current: 1, size: 1 });
    templateData.value = res.records;
    initForm();
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
    console.log(val, 'val');
    templateData.value = val;
    initForm();
  };

  const initForm = async () => {
    count.value = 0;
    resetSchema(formSchema(count));
    JSON.parse(unref(templateData)[0]['phaseBudgetRatio']).map((x) => {
      addGroup();
    });
    if (isDefer.value === '1') {
      addGroup();
    }

    initValue();
  };
  const initValue = () => {
    const rowData = unref(templateData)[0];
    let field: any[] = [];
    JSON.parse(rowData['phaseBudgetRatio']).map((x) => {
      field.push({ phaseBudgetRatio: x });
    });
    field.map((x, i) => {
      setFieldsValue({
        [`field[${i}].phaseBudgetRatio`]: x['phaseBudgetRatio'],
        [`field[${i}].date`]: [
          i === 0 ? dataSource['planStartDate'] : null,
          i === field.length - 1 ? dataSource['planEndDate'] : null,
        ],
        [`field[${i}].phaseBudgetCost`]: _.round(
          dataSource['generalBudget'] * (x.phaseBudgetRatio / 100),
          2,
        ).toFixed(2),
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

  const confirmDialog = async () => {
    const values = await validate();
    if (convertObjectToArray(values).length === 0) {
      message.error('请选择项目模板');
      return;
    }
    Modal.confirm({
      title: '确认提交吗？',
      icon: createVNode(ExclamationCircleOutlined),
      content: '提交后将不能修改，请仔细检查填写数据！',
      okText: '确认',
      onOk: () => onSubmit(values),
      cancelText: '取消',
    });
  };

  const onSubmit = async (values) => {
    await addApi(
      convertObjectToArray(values).map((x) => ({
        ...x,
        projectId: router.currentRoute.value.query.id,
        phaseStartDate: x.date[0],
        phaseEndDate: x.date[1],
      })),
    );
    console.log(convertObjectToArray(values), 'values');
    message.success('添加成功');
    router.push('/projectPhase');
  };
  const onCancel = () => {
    router.go(-1);
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
