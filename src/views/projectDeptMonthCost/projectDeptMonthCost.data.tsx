import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h, onMounted, watchEffect } from 'vue';
import { deptListApi } from '/@/api/project/project';
export const columns: BasicColumn[] = [
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '1月(元)',
    dataIndex: 'month1',
    width: 120,
    align: 'right',
  },
  {
    title: '2月(元)',
    dataIndex: 'month2',
    width: 120,
    align: 'right',
  },
  {
    title: '3月(元)',
    dataIndex: 'month3',
    width: 120,
    align: 'right',
  },
  {
    title: '4月(元)',
    dataIndex: 'month4',
    width: 120,
    align: 'right',
  },
  {
    title: '5月(元)',
    dataIndex: 'month5',
    width: 120,
    align: 'right',
  },
  {
    title: '6月(元)',
    dataIndex: 'month6',
    width: 120,
    align: 'right',
  },
  {
    title: '7月(元)',
    dataIndex: 'month7',
    width: 120,
    align: 'right',
  },
  {
    title: '8月(元)',
    dataIndex: 'month8',
    width: 120,
    align: 'right',
  },
  {
    title: '9月(元)',
    dataIndex: 'month9',
    width: 120,
    align: 'right',
  },
  {
    title: '10月(元)',
    dataIndex: 'month10',
    width: 120,
    align: 'right',
  },
  {
    title: '11月(元)',
    dataIndex: 'month11',
    width: 120,
    align: 'right',
  },
  {
    title: '12月(元)',
    dataIndex: 'month12',
    width: 120,
    align: 'right',
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
    field: 'year',
    label: '统计年',
    component: 'Input',
    render: ({ model, field }) => {
      return h(YearPicker, { model, field, defaultValue: new Date().getFullYear() });
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
    defaultValue: { type: String as any, default: () => '' },
  },
  setup(props) {
    const selectedYear = ref<string>('');
    const isOpen = ref(false);
    onMounted(() => {
      selectedYear.value = props.defaultValue + '' ?? '';
    });

    watchEffect(() => {
      props.model[props.field] = selectedYear.value;
    });

    const handlePanelChange = (value) => {
      selectedYear.value = moment(value).format('YYYY');

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
        allowClear={false}
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
