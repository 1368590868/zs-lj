import { FormSchema } from '/@/components/Table';
export const searchFormSchema: FormSchema[] = [
  {
    field: 'noticeTitle',
    label: '公告标题',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'configTitle',
    label: '系统名称',
    colProps: {
      span: 10,
    },
    component: 'Input',
  },
  {
    field: 'configLoginImg',
    label: '登录背景图((暂未开通))',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configLoginImg1',
  },
  {
    field: 'configLoginLogo',
    label: '登录页logo((暂未开通))',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configLoginLogo1',
  },
  {
    field: 'configSystemLogoMax',
    label: '系统logo(大)((暂未开通))',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configSystemLogoMax1',
  },
  {
    field: 'configSystemLogoMix',
    label: '系统logo(小)',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configSystemLogoMix',
  },
  {
    field: 'configAppLogo',
    label: 'app公司logo',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configAppLogo',
  },
  {
    field: 'configAppLoginLogo',
    label: 'app登录页logo((暂未开通))',
    colProps: {
      span: 20,
    },
    component: 'Upload',
    slot: 'configAppLoginLogo1',
  },
];
