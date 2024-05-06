import { FormSchema } from '/@/components/Form/index';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
];

// 基础设置 form
export const baseSetSchemas: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '用户账号',
    colProps: { span: 18 },
    dynamicDisabled: true,
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
  },
  {
    field: 'nickName',
    component: 'Input',
    label: '昵称',
    colProps: { span: 18 },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { span: 18 },
    slot: 'remark',
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'orgPassword',
    label: '旧密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'password',
    label: '登录密码',
    component: 'InputPassword',
    required: true,
    slot: 'password',
  },
  {
    field: 'repassword',
    label: '确认密码',
    component: 'InputPassword',
    required: true,
    slot: 'repassword',
  },
];
