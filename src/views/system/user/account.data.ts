import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { validatorPhone, validateEmail } from '/@/utils/lib/validate';
import { listDataDictApi } from '/@/api/sys/dictionary';
import { modelListApi } from '/@/api/codegen/module';

export const columns: BasicColumn[] = [
  {
    title: '手机号码',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '用户头像',
    dataIndex: 'avatar',
    width: 120,
    slots: { customRender: 'avatar' },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 50,
    customRender: ({ record }) => {
      const sex = record.sex;
      let txt = '';
      switch (sex) {
        case '0':
          txt = '未知';
          break;
        case '1':
          txt = '男';
          break;
        case '2':
          txt = '女';
          break;
      }
      return txt;
    },
  },
  {
    title: '用户生日',
    dataIndex: 'birthday',
    width: 100,
  },

  {
    title: '组织',
    dataIndex: 'deptId',
  },
  {
    title: '状态',
    dataIndex: 'lockFlag',
    width: 50,
    customRender: ({ record }) => {
      const status = record.lockFlag;
      let txt = '';
      switch (status) {
        case 0:
          txt = '正常';
          break;
        case 1:
          txt = '停用';
          break;
      }
      return txt;
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 80,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 80,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'phone',
    label: '手机号码',
    labelWidth: 80,
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_user_sex',
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
    colProps: { span: 3 },
  },
  {
    field: 'nickName',
    label: '用户昵称',
    labelWidth: 80,
    component: 'Input',
    colProps: { span: 4 },
  },

  {
    field: 'lockFlag',
    label: '状态',
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      options: [
        { label: '正常', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    colProps: { span: 3 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户账号',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
    dynamicDisabled: true,
  },
  {
    field: 'passwrod',
    label: '登录密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'repassword',
    label: '确认密码',
    component: 'InputPassword',
    required: true,
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '手机号码',
    field: 'phone',
    rules: [
      { required: true, message: '手机号不能为空', trigger: 'change' },
      { validator: validatorPhone, trigger: 'change' },
    ],
    component: 'Input',
  },
  {
    field: 'nickName',
    required: true,
    label: '用户昵称',
    component: 'Input',
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'Input',
  },
  {
    field: 'email',
    label: '用户邮箱',
    component: 'Input',
    rules: [{ validator: validateEmail, trigger: 'change' }],
  },
  {
    label: '用户生日',
    field: 'birthday',
    colProps: {
      span: 20,
    },
    component: 'DatePicker',
  },

  {
    label: '性别',
    field: 'sex',
    component: 'ApiSelect',
    componentProps: {
      api: listDataDictApi,
      params: {
        dictType: 'sys_user_sex',
      },
      resultField: 'records',
      labelField: 'dictLabel',
      valueField: 'dictValue',
    },
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '组织',
    field: 'deptId',
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
  },

  {
    label: '关联系统',
    field: 'modelIds',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      optionFilterProp: 'label',
      api: modelListApi,
      params: {
        current: 1,
        size: 1000,
      },
      resultField: 'records',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '配置角色',
    field: 'roleIds',
    required: true,
    component: 'Input',
    slot: 'roleIds',
  },
];
export interface drawerItem {
  userId?: number;
  roleIds?: string[];
  tenantIds?: string[];
}
