import { BasicColumn } from '/@/components/Table';

export const basicColumns: BasicColumn[] = [
  {
    title: '操作时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '操作人',
    dataIndex: 'createBy',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
