import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '标题',
    dataIndex: 'title',
    customRender: ({ record }) => {
      return h('div', `${record.year}年${record.month}月项目产值`);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'projectName',
    customRender: ({ record }) => {
      return h('div', `${record.year}-${record.month}-26`);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  { field: 'projectNumber', label: '项目编号', component: 'Input', colProps: { span: 6 } },
];
