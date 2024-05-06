import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { modelListApi } from '/@/api/codegen/module';

export const columns: BasicColumn[] = [
  {
    title: '租户名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '租户key',
    dataIndex: 'tenantKey',
    width: 200,
  },
  {
    title: '租户地址',
    dataIndex: 'addr',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    width: 200,
  },
  {
    title: '修改人',
    dataIndex: 'updateBy',
    width: 200,
  },
  {
    title: '租户id',
    dataIndex: 'tenantId',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '租户名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '租户地址',
    field: 'addr',
    component: 'Input',
  },
  {
    label: '租户key',
    field: 'tenantKey',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
  },
  {
    label: '关联系统',
    field: 'modelIds',
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
    field: 'configTitle',
    label: '系统名称',
    component: 'Input',
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
];
