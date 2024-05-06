import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const javaTypeOptions = [
  {
    label: 'Long',
    value: 'Long',
  },
  {
    label: 'String',
    value: 'String',
  },
  {
    label: 'Integer',
    value: 'Integer',
  },
  {
    label: 'Double',
    value: 'Double',
  },
  {
    label: 'BigDecimal',
    value: 'BigDecimal',
  },
  {
    label: 'Date',
    value: 'Date',
  },
  {
    label: 'Boolean',
    value: 'Boolean',
  },
];
export const isInsertOptions = [
  {
    label: '是',
    value: '1',
  },
  {
    label: '否',
    value: '0',
  },
];
export const queryTypeOptions = [
  {
    label: '=',
    value: '=',
  },
  {
    label: '!=',
    value: '!=',
  },
  {
    label: '>',
    value: '>',
  },
  {
    label: '>=',
    value: '>=',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '<=',
    value: '<=',
  },
  {
    label: 'LIKE',
    value: 'LIKE',
  },
];
export const htmlTypeOptions = [
  {
    label: '文本框',
    value: '文本框',
  },
  {
    label: '文本域',
    value: '文本域',
  },
  {
    label: '下拉框',
    value: '下拉框',
  },
  {
    label: '单选框',
    value: '单选框',
  },
  {
    label: '复选框',
    value: '复选框',
  },
  {
    label: '日期控件',
    value: '日期控件',
  },
  {
    label: '图片上传',
    value: '图片上传',
  },
  {
    label: '文件上传',
    value: '文件上传',
  },
  {
    label: '富文本控件',
    value: '富文本控件',
  },
];
export const fieldColumns: BasicColumn[] = [
  {
    title: '列名称',
    dataIndex: 'columnName',
    slots: { customRender: 'columnName' },
  },
  {
    title: '列描述',
    dataIndex: 'columnComment',
    slots: { customRender: 'columnComment' },
  },
  {
    title: '列类型',
    dataIndex: 'columnType',
    width: 120,
  },
  {
    title: 'JAVA类型',
    dataIndex: 'javaType',
    slots: { customRender: 'javaType' },
  },
  {
    title: 'java属性',
    dataIndex: 'javaField',
    slots: { customRender: 'javaField' },
  },
  {
    title: '插入',
    dataIndex: 'isInsert',
    slots: { customRender: 'isInsert' },
  },
  {
    title: '编辑',
    dataIndex: 'isEdit',
    slots: { customRender: 'isEdit' },
  },
  {
    title: '列表',
    dataIndex: 'isList',
    slots: { customRender: 'isList' },
  },
  {
    title: '查询',
    dataIndex: 'isQuery',
    slots: { customRender: 'isQuery' },
  },
  {
    title: '查询方式',
    dataIndex: 'queryType',
    slots: { customRender: 'queryType' },
  },
  {
    title: '必填',
    dataIndex: 'isRequired',
    slots: { customRender: 'isRequired' },
  },
  {
    title: '显示类型',
    dataIndex: 'htmlType',
    slots: { customRender: 'htmlType' },
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    slots: { customRender: 'dictType' },
  },
];
export const baseInfoSourceSchema: FormSchema[] = [
  {
    field: 'tableName',
    label: '表名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'tableComment',
    label: '表描述',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'className',
    label: '实体类名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'functionAuthor',
    label: '作者',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
];
export const generateSourceSchema: FormSchema[] = [
  {
    field: 'tplCategory',
    label: '生成模板',
    required: true,
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '单表(增删改查)', value: 'crud' },
        { label: '树表(增删改查)', value: 'tree' },
        { label: '主子表(增删改查)', value: 'sub' },
      ],
    },
  },
  {
    field: 'packageName',
    label: '生成包路径',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'moduleName',
    label: '生成模块名',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'businessName',
    label: '生成工程名',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'genPath',
    label: '生成路径',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'functionName',
    label: '工程路径',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'parentMenuId',
    label: '上级菜单',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'genType',
    label: '生成代码方式',
    required: true,
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: 'zip压缩包', value: '0' },
        { label: '自定义路径', value: '1' },
      ],
    },
    colProps: { span: 12 },
  },
];
