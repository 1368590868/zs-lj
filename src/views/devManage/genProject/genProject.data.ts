import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '工程名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '数据库用户名',
    dataIndex: 'userName',
    width: 200,
  },
  // {
  //   title: '数据库密码',
  //   dataIndex: 'password',
  //   width: 200,
  // },
  {
    title: '状态',
    dataIndex: 'status',
    width: 200,
    customRender: ({ record }) => {
      const sex = record.status;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '正常';
          break;
        case 1:
          txt = '删除';
          break;
      }
      return txt;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'order',
    width: 200,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '租户id',
    dataIndex: 'tenantId',
    width: 200,
  },
  {
    title: '数据库ip',
    dataIndex: 'ip',
    width: 200,
  },
  {
    title: '数据库端口',
    dataIndex: 'port',
    width: 200,
  },
  {
    title: '数据库',
    dataIndex: 'database',
    width: 200,
  },
  {
    title: '是否集成短信',
    dataIndex: 'isSms',
    width: 200,
    customRender: ({ record }) => {
      const sex = record.isSms;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '否';
          break;
        case 1:
          txt = '是';
          break;
      }
      return txt;
    },
  },
  {
    title: '是否集成文件',
    dataIndex: 'isOss',
    width: 200,
    customRender: ({ record }) => {
      const sex = record.isOss;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '否';
          break;
        case 1:
          txt = '是';
          break;
      }
      return txt;
    },
  },
  {
    title: '是否下载maven',
    dataIndex: 'isMaven',
    width: 200,
    customRender: ({ record }) => {
      const sex = record.isMaven;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '否';
          break;
        case 1:
          txt = '是';
          break;
      }
      return txt;
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '工程名',
    component: 'Input',
    colProps: { span: 4 },
  },
];
export const formSchema: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '工程名称',
    field: 'name',
    rules: [
      { required: true, message: '工程名称不能为空', trigger: 'change' },
      { max: 38, message: '工程名称长度不能超过38个字符', trigger: 'change' },
    ],
    component: 'Input',
  },
  {
    label: '数据库ip',
    field: 'ip',
    required: true,
    component: 'Input',
  },
  {
    label: '数据库端口',
    field: 'port',
    required: true,
    component: 'Input',
  },
  {
    label: '数据库',
    field: 'database',
    required: true,
    component: 'Input',
  },
  {
    label: '数据库用户名',
    field: 'userName',
    required: true,
    component: 'Input',
  },
  {
    label: '数据库密码',
    field: 'password',
    required: true,
    component: 'Input',
  },
  {
    field: 'oldPassword',
    label: '密码',
    required: true,
    component: 'Input',
    colProps: { span: 24 },
    show: false,
  },
  {
    label: '集成短信',
    field: 'isSms',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    label: '集成文件上传',
    field: 'isOss',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    label: '下载maven',
    field: 'isMaven',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '否', value: 0 },
        { label: '是', value: 1 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: { lg: 24, md: 24 },
  },
];
