import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
// import { MarkDown } from '/@/components/Markdown';
export const columns: BasicColumn[] = [
  {
    title: '标题名称',
    dataIndex: 'noticeTitle',
    width: 250,
  },
  {
    title: '消息类型',
    dataIndex: 'noticeType',
    width: 120,
    customRender: ({ record }) => {
      const status = record.noticeType;
      const enable = ~~status === 1;
      const color = enable ? '#2db7f5' : '#f50';
      const text = enable ? '系统消息' : '公告消息';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '发布人',
    dataIndex: 'createBy',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    customRender: ({ record }) => {
      const status = record.noticeType;
      let color = '';
      let text = '';
      switch (status) {
        case '1':
          color = '#2db7f5';
          text = '低';
          break;
        case '2':
          color = '#2db7f5';
          text = '中';
          break;
        case '3':
          color = '#2db7f5';
          text = '高';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '通告对象',
    dataIndex: 'receiveType',
    customRender: ({ record }) => {
      const status = record.receiveType;
      let color = '';
      let text = '';
      switch (status) {
        case '1':
          color = '#2db7f5';
          text = '指定用户';
          break;
        case '2':
          color = '#2db7f5';
          text = '全部用户';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '发布状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? '#2db7f5' : '#2db7f5';
      const text = enable ? '正常' : '撤销';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '发布时间',
    dataIndex: 'sendTime',
  },
  {
    title: '撤销时间',
    dataIndex: 'revokeTime',
  },
  {
    title: '备注',
    dataIndex: 'remark',
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'noticeTitle',
    label: '标题名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
const isReceiveType = (menuType: string) => menuType === '1';
export const formSchema: FormSchema[] = [
  {
    field: 'noticeType',
    label: '消息类型',
    required: true,
    colProps: {
      span: 20,
    },
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '通知 ',
          value: '1',
        },
        {
          label: '公告',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'noticeTitle',
    label: '标题名称',
    required: true,
    colProps: {
      span: 20,
    },
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    required: true,
    colProps: {
      span: 20,
    },
    component: 'Input',
  },
  {
    field: 'endTime',
    label: '截至日期',
    required: true,
    colProps: {
      span: 20,
    },
    component: 'DatePicker',
  },
  {
    field: 'receiveType',
    label: '通告对象',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '指定用户',
          value: '1',
        },
        {
          label: '全部用户',
          value: '2',
        },
      ],
    },
  },
  {
    field: 'sendUser',
    component: 'Input',
    label: '指定用户',
    helpMessage: ['指定用户', '输入关键词进行搜索'],
    slot: 'remoteSearch',
    colProps: {
      span: 8,
    },
    ifShow: ({ values }) => isReceiveType(values.receiveType),
  },
  {
    field: 'priority',
    label: '优先级',
    colProps: {
      span: 20,
    },
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '低',
          value: '1',
        },
        {
          label: '中',
          value: '2',
        },
        {
          label: '高',
          value: '3',
        },
      ],
    },
  },
  {
    field: 'noticeContent',
    component: 'Input',
    label: '公告内容',
    slot: 'noticeContent',
  },
  {
    field: 'id',
    component: 'Input',
    label: 'id',
    show: false,
  },
];
export interface detailListItem {
  noticeTitle: string;
  createTime: string;
  noticeContent: string;
  noticeType: string;
  priority: null;
}
