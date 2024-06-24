<template>
  <PageWrapper>
    <Description @register="register" />
    <div class="mt-6"></div>
    <Card>
      <template #title>
        <div class="flex justify-between">
          <div>设置项目里程碑</div>
          <div v-if="isDefer !== '1'">
            <a-button type="primary" @click="onRemark">更换模板</a-button>
          </div>
        </div>
      </template>
      <BasicForm @register="registerGroup">
        <template #phaseTitle="{ model, field }">
          <!-- 需要使用field判断 -->
          <Input
            :maxlength="50"
            :disabled="phaseTitleDisabled(field)"
            v-model:value="model[field]"
            placeholder="请输入里程碑名称"
          />
        </template>
        <template #phaseBudgetRatio="{ model, field }">
          <InputNumber
            :min="1"
            :max="100"
            :precision="0"
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
        </template>
        <template #date="{ model, field }">
          <Space>
            <DatePicker :value="model[field]?.[0]" disabled />
            -
            <!-- 当选择日期后，重新组装日期格式-->
            <DatePicker
              :allowClear="false"
              v-if="fieldArr.length !== +field.match(/\d+/)[0] + 1"
              v-model:value="model[field + 'date']"
              :disabledDate="disabledDate"
              :disabled="
                isDefer !== '1'
                  ? fieldArr.length === +field.match(/\d+/)[0] + 1
                    ? model[field][1]
                    : false
                  : fieldArr.length === +field.match(/\d+/)[0]
                  ? false
                  : true
              "
              @change="(date) => dateChange(date, model, field)"
            />
            <DatePicker v-else v-model:value="dataSource['planEndDate']" disabled />
          </Space>
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
  import {
    Card,
    InputNumber,
    Table,
    Space,
    message,
    Modal,
    Input,
    DatePicker,
    TypographyText,
  } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { detail } from '/@/api/project/project';
  import { computed, createVNode, h, onMounted, reactive, ref, unref } from 'vue';
  import { useDescription, Description } from '/@/components/Description';
  import { useRouter } from 'vue-router';
  import { formSchema, schema } from './projectMilestoneConfig.data';
  import ProjectDetailModal from './projectMilestoneConfigModal.vue';
  import { useModal } from '/@/components/Modal';
  import { addApi, pageApi } from '/@/api/projectPhase/projectPhase';
  import _ from 'lodash-es';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { pageApi as templatePageApi } from '/@/api/projectTemplate/projectTemplate';
  import moment from 'moment';

  const router = useRouter();
  const templateData = ref<any[]>([]);
  const fieldArr = ref<any[]>([]);
  const isDefer = computed(() => {
    return router.currentRoute.value.query.isDefer;
  });
  const [registerModal, { openModal }] = useModal();

  const tipsArr = [
    {
      title: h(TypographyText, { type: 'danger' }, '1.管控时间为工程计划开始时间到结束时间；'),
      key: '1',
    },
    {
      title: h(
        TypographyText,
        { type: 'danger' },
        '2.里程碑阶段数和对应的预算比例是根据模板计数；',
      ),
      key: '2',
    },
    {
      title: h(
        TypographyText,
        { type: 'danger' },
        '3.只需要设置里程碑标题和阶段时间，请谨慎设置，提交后不允许修改。',
      ),
      key: '3',
    },
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
      resetFields,
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

  const dateChange = (date, model, field) => {
    model[`field[${+field.match(/\d+/)[0] + 1}].date`] = [
      moment(date).add(1, 'days').format('YYYY-MM-DD'),
      model[`field[${+field.match(/\d+/)[0] + 1}].date`][1],
    ];

    model[`field[${+field.match(/\d+/)[0]}].date`] = [
      model[`field[${+field.match(/\d+/)[0]}].date`][0],
      moment(date).format('YYYY-MM-DD'),
    ];

    model[field + 'date'] = moment(date).format('YYYY-MM-DD');
  };

  const dataSource = reactive({ planStartDate: '1997-01-01', planEndDate: '2099-12-01' });
  const [register] = useDescription({
    title: '项目基础信息',
    bordered: false,
    data: dataSource,
    schema,
  });

  const disabledDate = (current) => {
    const startDate = new Date(
      isDefer.value === '1'
        ? moment().add(1, 'days').format('YYYY-MM-DD')
        : dataSource['planStartDate'],
    );
    const endDate = new Date(isDefer.value === '1' ? '2099-12-01' : dataSource['planEndDate']);

    // Disable dates outside the specified range
    return current && (current < startDate || current > endDate);
  };

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
        [`field[${i}].datedate`]: x['phaseEndDate'],
        [`field[${i}].id`]: x['id'],
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

  const onModalSuccess = (val) => {
    resetFields();
    templateData.value = val;
    initForm();
  };

  const initForm = async () => {
    count.value = 0;
    resetSchema(formSchema(count));
    JSON.parse(unref(templateData)[0]['phaseBudgetRatio']).map((x) => {
      addGroup();
    });
    fieldArr.value = JSON.parse(unref(templateData)[0]['phaseBudgetRatio']);

    if (isDefer.value === '1') {
      addGroup();
      // 为新增项日期赋值为结束日期 + 1
      setFieldsValue({
        [`field[${fieldArr.value.length}].date`]: [
          moment(dataSource['planEndDate']).add(1, 'days').format('YYYY-MM-DD'),
          null,
        ],
      });
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

    const params = getFieldsValueGroup()
      .field.filter((x) => x.phaseBudgetRatio)
      .map((x) => ({
        ...x,
        projectId: router.currentRoute.value.query.id,
        phaseStartDate: moment(x.date[0]).format('YYYY-MM-DD'),
        phaseEndDate: moment(x.date[1]).format('YYYY-MM-DD'),
        id: x.id ?? null,
      }));
    // 延期模式最后一项没有填写则提示，并赋值给enddate
    if (isDefer.value === '1' && !params.at(-1).datedate) {
      message.error('请填写结束日期');
      return;
    }
    if (convertObjectToArray(values).some((x) => x.date.some((y) => !y)) && isDefer.value !== '1') {
      message.error('请填写完整日期范围');
      return;
    }
    // 计算比例总和是否为100
    if (params.map((x) => +x.phaseBudgetRatio).reduce((a, b) => a + b) !== 100) {
      message.error('预算比例总和必须为100%');
      return;
    }
    Modal.confirm({
      title: '确认提交吗？',
      icon: createVNode(ExclamationCircleOutlined),
      content: '提交后将不能修改，请仔细检查填写数据！',
      okText: '确认',
      onOk: () => onSubmit(),
      cancelText: '取消',
    });
  };

  const onSubmit = async () => {
    const params = getFieldsValueGroup()
      .field.filter((x) => x.phaseBudgetRatio)
      .map((x) => ({
        ...x,
        projectId: router.currentRoute.value.query.id,
        phaseStartDate: moment(x.date[0]).format('YYYY-MM-DD'),
        phaseEndDate: x.date[1]
          ? moment(x.date[1]).format('YYYY-MM-DD')
          : moment(x.datedate).format('YYYY-MM-DD'),
        id: x.id ?? null,
      }));

    await addApi(params);
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
    id: string;
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
            id: '',
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
    width: 100%;
  }
  .ant-table-striped :global(.table-striped) td {
    background-color: #fafafa;
  }
</style>
