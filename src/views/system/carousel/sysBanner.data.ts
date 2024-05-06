import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '图片地址',
    dataIndex: 'imgUrl',
    width: 200,
    slots: { customRender: 'imgUrl' },
  },
  {
    title: '跳转地址',
    dataIndex: 'skipUrl',
    width: 200,
  },
  {
    title: '删除标志',
    dataIndex: 'status',
    customRender: ({ record }) => {
      const sex = record.status;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '正常';
          break;
        case 2:
          txt = '删除';
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
    title: '创建者',
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新者',
    dataIndex: 'updateBy',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '排序',
    dataIndex: 'order',
  },
  {
    title: '是否显示',
    dataIndex: 'visible',
    customRender: ({ record }) => {
      const sex = record.visible;
      let txt = '';
      switch (sex) {
        case 0:
          txt = '不显示';
          break;
        case 2:
          txt = '显示';
          break;
      }
      return txt;
    },
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
    label: '内容',
    field: 'content',
    component: 'Input',
  },
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },

  {
    label: '跳转地址',
    field: 'skipUrl',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '排序',
    field: 'order',
    component: 'Input',
  },
  {
    label: '是否显示',
    field: 'visible',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '不显示', value: 0 },
        { label: '显示', value: 1 },
      ],
    },
  },
  {
    label: '图片地址',
    field: 'imgUrl',
    required: true,
    component: 'Upload',
    slot: 'imgUrl',
    colProps: { lg: 24, md: 24 },
  },
];
