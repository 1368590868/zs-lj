import { reactive } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 200,
  },
  {
    title: '字典编码',
    dataIndex: 'dictType',
    width: 250,
  },
  {
    title: '描述',
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
export const configColumns: BasicColumn[] = [
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    width: 200,
  },
  {
    title: '数据值',
    dataIndex: 'dictValue',
    width: 250,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dictType',
    label: '字典编码',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'dictType',
    label: '字典编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'remark',
    label: '字典描述',
    component: 'Input',
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

export const formSchemaValue: FormSchema[] = [
  {
    field: 'dictLabel',
    label: '字典标签',
    required: true,
    component: 'Input',
  },
  {
    field: 'dictValue',
    label: '数据值',
    required: true,
    component: 'Input',
  },
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: 'dictType',
    field: 'dictType',
    component: 'Input',
    show: false,
  },
];
export interface drawerItem {
  dictName: string;
  dictType: string;
  id?: number;
}
export interface addDrawerItem {
  dictSort: string;
  dictLabel: string;
  dictValue: string;
  dictType: string;
  remark: string;
  id?: number;
}
export const rulesItemRef = reactive({
  dictLabel: [
    {
      required: true,
      message: '字典标签不能为空',
    },
  ],
  dictValue: [
    {
      required: true,
      message: '字典键值不能为空',
    },
  ],
});
