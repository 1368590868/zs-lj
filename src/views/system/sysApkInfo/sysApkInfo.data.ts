import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '版本号',
    dataIndex: 'versionCode',
  },
  {
    title: '对外展示版本号',
    dataIndex: 'versionName',
  },
  {
    title: '版本更新信息',
    dataIndex: 'versionContent',
  },
  {
    title: '下载路径',
    dataIndex: 'apkPath',
  },
  {
    title: '大小信息',
    dataIndex: 'apkSize',
  },
  {
    title: '模块key',
    dataIndex: 'modelKey',
  },
  {
    title: '是否强制更新',
    dataIndex: 'force',
    width: 200,
    customRender: ({ record }) => {
      const status = record.force;
      const text = status ? '否' : '是';
      return text;
    },
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '版本号',
    field: 'versionCode',
    component: 'Input',
  },
  {
    label: '对外展示版本号',
    field: 'versionName',
    component: 'Input',
  },
  {
    label: '版本更新信息',
    field: 'versionContent',
    component: 'Input',
  },
  {
    label: 'apk下载路径',
    field: 'apkPath',
    component: 'Input',
    slot: 'apkPath',
  },
  {
    label: 'apk大小信息',
    field: 'apkSize',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '模块key',
    field: 'modelKey',
    component: 'Input',
  },
  {
    label: '强制更新',
    field: 'force',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '是 ',
          value: 0,
        },
        {
          label: '否',
          value: 1,
        },
      ],
    },
  },
];
