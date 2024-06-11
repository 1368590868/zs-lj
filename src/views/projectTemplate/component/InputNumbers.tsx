import { defineComponent, ref } from 'vue';
import { InputNumber } from 'ant-design-vue';

export default defineComponent({
  props: {
    min: { type: Number },
    max: { type: Number },
    value: { type: Array, default: () => [] },
    getFieldsValue: { type: Function },
    setFieldsValue: { type: Function },
  },
  setup(props: any) {
    const inputValue = ref<number[]>([]);
    const handleInput = async (index: number, val: number) => {
      inputValue.value[index] = val;
      //  将输入的值传递给父组件
      const arr = Array.from({ length: props?.getFieldsValue?.().phaseNum ?? 3 }).map((_, i) => {
        return inputValue.value[i] ?? 0;
      });
      props.setFieldsValue({
        phaseBudgetRatio: arr,
        phaseNum: props?.getFieldsValue?.().phaseNum ?? 3,
      });
    };

    return () =>
      Array.from({ length: props?.getFieldsValue?.().phaseNum ?? 3 }).map((_, i) => (
        <>
          <InputNumber
            value={props?.value?.[i]}
            placeholder={`请输入第${i + 1}阶段预算比例`}
            key={i}
            required
            min={props.min}
            max={props.max}
            precision={2}
            onChange={(inputValue: number) => handleInput(i, inputValue)}
          />
          &nbsp;&nbsp;
          <span>%</span>
          <div class={'h-1'}></div>
        </>
      ));
  },
});
