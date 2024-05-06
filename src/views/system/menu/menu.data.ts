import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h, reactive } from 'vue';
import { Icon } from '/@/components/Icon';
import { modelListApi } from '/@/api/codegen/module';
export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
  },
  {
    title: '组件',
    dataIndex: 'component',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
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
export const btnColumns: BasicColumn[] = [
  {
    title: '按钮名称',
    dataIndex: 'menuName',
    width: 200,
  },
  {
    title: '上级菜单',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    width: 50,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  },
];

const isDir = (menuType: string) => menuType === 'M';
const isMenu = (menuType: string) => menuType === 'C';
const isButton = (menuType: string) => menuType === 'F';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const searchBtnFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '按钮名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'modelKey',
    label: '模块名称',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: modelListApi,
      params: {
        size: 1000,
        current: 1,
        pages: 1,
      },
      resultField: 'records',
      labelField: 'name',
      valueField: 'modelKey',
    },
  },
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'M',
    componentProps: {
      options: [
        { label: '目录', value: 'M' },
        { label: '菜单', value: 'C' },
        { label: '按钮', value: 'F' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    // show: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'orderNum',
    label: '显示顺序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    required: true,
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.menuType),
  },

  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => !isButton(values.menuType),
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'visible',
    label: '是否显示',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '显示', value: '0' },
        { label: '隐藏', value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.menuType),
  },
  {
    field: 'imgIcon',
    label: 'APP图标',
    component: 'Input',
    colProps: { lg: 24, md: 24 },
    show: ({ values }) => !isDir(values.menuType),
    slot: 'imgIcon',
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: 'type',
    component: 'Input',
    show: false,
  },
];
export const formBtnSchema: FormSchema[] = [
  {
    field: 'modelKey',
    label: '模块名称',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: modelListApi,
      params: {
        size: 1000,
        current: 1,
        pages: 1,
      },
      resultField: 'records',
      labelField: 'name',
      valueField: 'modelKey',
    },
  },
  {
    field: 'menuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'F',
    componentProps: {
      options: [
        { label: '目录', value: 'M' },
        { label: '菜单', value: 'C' },
        { label: '按钮', value: 'F' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: '按钮名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'orderNum',
    label: '显示顺序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.menuType),
  },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: 'type',
    component: 'Input',
    show: false,
  },
];

export const modelFrom = reactive({
  menuType: 'M',
  menuName: '',
  parentId: '',
  orderNum: '',
  icon: '',
  path: '',
  component: '',
  remark: '',
  perms: '',
  id: '',
});
export const rulesRef = reactive({
  menuName: [
    {
      required: true,
      message: '菜单不能为空',
    },
  ],
  orderNum: [
    {
      required: true,
      message: '显示顺序',
    },
  ],
  icon: [
    {
      required: true,
      message: '图标不能为空',
    },
  ],
});
export interface drawerItem {
  menuType: string;
  menuName: string;
  parentId?: number;
  orderNum?: number;
  icon: string;
  path: string;
  component: string;
  remark: string;
  perms: string;
  id?: number;
}
