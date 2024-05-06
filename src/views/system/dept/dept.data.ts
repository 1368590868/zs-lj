import { reactive } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { validatorPhone, validateEmail } from '/@/utils/lib/validate';
import { listDataDictApi } from '/@/api/sys/dictionary';
export const columns: BasicColumn[] = [
  {
    title: '组织名称',
    dataIndex: 'deptName',
    width: 200,
    align: 'left',
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    width: 150,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    width: 180,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '昵称',
    dataIndex: 'email1',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 80,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '组织名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const modelFrom = reactive({
  parentId: '',
  deptName: '',
  orderNum: '',
  leader: '',
  phone: '',
  email: '',
  id: '',
});
export const rulesRef = reactive({
  deptName: [
    {
      required: true,
      message: '组织名称不能为空',
    },
  ],
  orderNum: [
    {
      required: true,
      message: '显示顺序不能为空',
    },
  ],
  parentId: [
    {
      required: true,
      message: '上级组织不能为空',
    },
  ],
  phone: [{ validator: validatorPhone, trigger: 'change' }],
  email: [{ validator: validateEmail, trigger: 'change' }],
});
const isDeptType = (type: string) => type === '0';
export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '组织类型',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '单位', value: '0' },
        { label: '部门', value: '1' },
      ],
    },
    colProps: { lg: 24, md: 24 },
    dynamicDisabled: ({ values }) => {
      return values.id;
    },
  },
  {
    field: 'deptName',
    label: '组织名称',
    component: 'Input',
    rules: [
      { required: true, message: '组织名称不能为空', trigger: 'change' },
      { max: 30, message: '组织名称长度不能超过30个字符', trigger: 'change' },
    ],
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'parentId',
    label: '上级组织',
    required: true,
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    ifShow: ({ values }) => !isDeptType(values.type),
  },
  {
    field: 'orderNum',
    label: '显示顺序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'leader',
    label: '负责人',
    component: 'Input',
  },
  {
    field: 'phone',
    label: '联系电话',
    component: 'Input',
    rules: [
      { required: true, message: '手机号不能为空', trigger: 'change' },
      { validator: validatorPhone, trigger: 'change' },
    ],
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    rules: [{ validator: validateEmail, trigger: 'change' }],
  },
  {
    field: 'companyRegion',
    label: '行政区域',
    component: 'Cascader',
    slot: 'Cascader',
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'companyOwner',
    label: '法定代表人',
    required: true,
    component: 'Input',
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'companyType',
    label: '企业类型',
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_com_type',
        size: 100,
        current: 1,
        pages: 1,
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
    colProps: { span: 3 },
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'companyIndustry',
    label: '所属行业',
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_industry_type',
        size: 100,
        current: 1,
        pages: 1,
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
    colProps: { span: 3 },
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'companyEstablishTime',
    label: '成立时间',
    component: 'DatePicker',
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'companyAddr',
    label: '企业注册地址',
    required: true,
    component: 'Input',
    colProps: { lg: 24, md: 24 },
    ifShow: ({ values }) => isDeptType(values.type),
  },
  {
    field: 'companyNum',
    label: '统一社会信用代码',
    component: 'Input',
    labelWidth: 120,
    colProps: { lg: 24, md: 24 },
    ifShow: ({ values }) => isDeptType(values.type),
    rules: [{ min: 18, max: 18, message: '统一社会信用代码只能18位', trigger: 'change' }],
  },
];
