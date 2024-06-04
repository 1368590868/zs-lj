import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { TypographyText } from 'ant-design-vue';
import { deptListApi } from '/@/api/project/project';
import { useRouter } from 'vue-router';
const router = useRouter();
export const columns: BasicColumn[] = [
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 200,
  },
  {
    title: '管控中项目(个)',
    dataIndex: 'control',
    width: 200,
  },
  {
    title: '总预算(万元)',
    dataIndex: 'totalBudget',
    width: 200,
  },
  {
    title: '实际成本(万元)',
    dataIndex: 'totalCost',
    width: 200,
  },
  {
    title: '延期管控项目',
    dataIndex: 'deferProject',
    width: 200,
  },
  {
    title: '红色预警项目',
    dataIndex: 'redWarning',
    width: 200,
    slots: { customRender: 'redWarning' },
  },
  {
    title: '黄色预警项目',
    dataIndex: 'yellowWarning',
    width: 200,
    slots: { customRender: 'yellowWarning' },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '归属部门',
    component: 'ApiSelect',
    componentProps: {
      api: deptListApi,
      labelField: 'deptName',
      valueField: 'deptNumber',
      showSearch: true,
      filterOption: (input: string, option: any) => {
        console.log(input);
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
    },
    colProps: { span: 6 },
  },
];
