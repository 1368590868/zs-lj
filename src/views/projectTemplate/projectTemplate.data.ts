import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { InputNumber, Tag } from 'ant-design-vue';
import { professionTypeEnum, professionTypeTree, projectTypeEnum } from '/@/enums/projectControl';
import InputNumbers from './component/InputNumbers';

export const columns: BasicColumn[] = [
  {
    title: '项目类型',
    dataIndex: 'projectType',
    width: 100,
  },
  {
    title: '专业类型',
    dataIndex: 'professionType',
    width: 180,
  },
  {
    title: '里程碑阶段数',
    dataIndex: 'phaseNum',
    width: 120,
  },
  //   阶段预算比例（JSON格式字符串存储）
  {
    title: '阶段预算比例',
    dataIndex: 'phaseBudgetRatio',
    width: 500,
    customRender: ({ record }) => {
      return h(
        'span',
        JSON.parse(record.phaseBudgetRatio ?? [])
          .map((v) => v + '%')
          .join()
          .replace(/,/g, '；'),
      );
    },
  },
  {
    title: '编制人',
    dataIndex: 'createByName',
    width: 200,
  },
  {
    title: '编制时间',
    dataIndex: 'createTime',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '项目类型',
    field: 'projectType',
    component: 'Select',
    componentProps: {
      showSearch: true,
      mode: 'multiple',
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      options: Object.values(projectTypeEnum).map((val) => ({ label: val, value: val })),
    },
    colProps: { span: 6 },
  },
  {
    label: '专业类型',
    field: 'professionTypes',
    component: 'TreeSelect',
    componentProps: {
      dropdownStyle: { maxHeight: '300px' },
      treeData: professionTypeTree(true),
      replaceFields: {
        label: 'label',
        key: 'value',
        value: 'value',
      },
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      getPopupContainer: () => document.body,
    },
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '项目类型',
    field: 'projectType',
    component: 'Select',
    required: true,
    componentProps: {
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      options: Object.values(projectTypeEnum).map((val) => ({ label: val, value: val })),
    },
  },
  {
    label: '专业类型',
    field: 'professionTypes',
    component: 'TreeSelect',
    componentProps: {
      dropdownStyle: { maxHeight: '300px' },
      treeData: professionTypeTree(true),
      replaceFields: {
        label: 'label',
        key: 'value',
        value: 'value',
      },
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return option.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    label: '管控阶段数',
    field: 'phaseNum',
    component: 'Select',
    required: true,
    componentProps: {
      options: Array.from({ length: 18 }, (v, k) => k + 3).map((val) => ({
        label: val,
        value: val,
      })),
      showSearch: true,
      filterOption: (input: string, option: any) => {
        return (option.label + '').toLowerCase().indexOf((input + '').toLowerCase()) >= 0;
      },
      defaultValue: 3,
      getPopupContainer: () => document.body,
    },
  },
  {
    label: '阶段预算比例',
    field: 'phaseBudgetRatio',
    component: 'Input',
    required: true,
    slot: 'phaseBudgetRatio',
  },
];
