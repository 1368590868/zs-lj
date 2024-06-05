import { BasicColumn } from '/@/components/Table';

export const basicColumns: BasicColumn[] = [
  {
    title: '操作时间',
    dataIndex: 'createTime',
    width: 200,
  },
  {
    title: '操作人',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '操作记录',
    dataIndex: 'logText',
  },
];
