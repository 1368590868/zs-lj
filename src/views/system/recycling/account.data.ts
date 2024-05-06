import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'account',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '头像',
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
    title: '生日',
    dataIndex: 'birthday',
    width: 200,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'deptId',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      const status = record.status;
      let txt = '';
      switch (status) {
        case '0':
          txt = '正常';
          break;
        case '1':
          txt = '停用';
          break;
        case '2':
          txt = '删除';
          break;
      }
      return txt;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
    },
    colProps: { span: 3 },
  },
  {
    field: 'nickName',
    label: '真实名字',
    labelWidth: 80,
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'phone',
    label: '手机号',
    labelWidth: 60,
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'status',
    label: '用户状态',
    component: 'Select',
    labelWidth: 80,
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
        { label: '删除', value: '2' },
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
    field: 'account',
    label: '用户名',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'nickName',
    label: '昵称',
    required: true,
    component: 'Input',
  },
  {
    label: '手机号',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '部门',
    field: 'deptId',
    component: 'Input',
  },
  {
    label: '角色权限',
    field: 'deptId',
    component: 'Input',
  },
  {
    label: '头像',
    field: 'avatar',
    component: 'Upload',
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'sex',
    component: 'Input',
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
];
export interface drawerItem {
  userId?: number;
  roleIds?: string[];
}
