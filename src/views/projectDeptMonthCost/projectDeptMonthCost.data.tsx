import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { deptListApi } from '/@/api/project/project';
import { useCurrencyFormatter } from '/@/hooks/web/useCurrencyFormatter';
export const columns: BasicColumn[] = [
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '1月',
    dataIndex: 'month1',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month1 ?? 0);
    },
  },
  {
    title: '2月',
    dataIndex: 'month2',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month2 ?? 0);
    },
  },
  {
    title: '3月',
    dataIndex: 'month3',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month3 ?? 0);
    },
  },
  {
    title: '4月',
    dataIndex: 'month4',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month4 ?? 0);
    },
  },
  {
    title: '5月',
    dataIndex: 'month5',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month5 ?? 0);
    },
  },
  {
    title: '6月',
    dataIndex: 'month6',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month6 ?? 0);
    },
  },
  {
    title: '7月',
    dataIndex: 'month7',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month7 ?? 0);
    },
  },
  {
    title: '8月',
    dataIndex: 'month8',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record.month8 ?? 0);
    },
  },
  {
    title: '9月',
    dataIndex: 'month9',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month9 ?? 0);
    },
  },
  {
    title: '10月',
    dataIndex: 'month10',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month10 ?? 0);
    },
  },
  {
    title: '11月',
    dataIndex: 'month11',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month11 ?? 0);
    },
  },
  {
    title: '12月',
    dataIndex: 'month12',
    width: 120,
    customRender: ({ record }) => {
      return useCurrencyFormatter(record?.month12 ?? 0);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptCode',
    label: '业务部门',
    component: 'ApiSelect',
    componentProps: {
      api: deptListApi,
      labelField: 'deptName',
      valueField: 'deptCode',
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
  {
    field: 'redWarning',
    label: '统计年',
    component: 'Input',
    render: ({ model, field }) => {
      return h(YearPicker, { model, field });
    },
    colProps: { span: 6 },
  },
];

import { defineComponent, ref } from 'vue';
import { DatePicker } from 'ant-design-vue';
import moment from 'moment';

export const YearPicker = defineComponent({
  props: {
    field: { type: String as any, default: () => '' },
    model: { type: Object as any, defualt: () => {} },
  },
  setup(props) {
    const selectedYear = ref<string>('');
    const isOpen = ref(false);

    const handlePanelChange = (value) => {
      selectedYear.value = moment(value).format('YYYY');
      props.model[props.field] = selectedYear.value;
      isOpen.value = false;
    };

    const handleOpenChange = (open) => {
      isOpen.value = open;
    };

    const clearSelectedYear = () => {
      selectedYear.value = ''; // 清除选中的年份
      props.model[props.field] = null; // 将 model 中的值设置为 null
    };

    return () => (
      <DatePicker
        value={selectedYear.value}
        mode="year"
        format="YYYY"
        allowClear={true}
        onChange={(date) => {
          if (!date) clearSelectedYear(); // 当值被清除时，将 selectedYear 设置为 null
        }}
        open={isOpen.value}
        onPanelChange={handlePanelChange}
        onOpenChange={handleOpenChange}
      />
    );
  },
});
