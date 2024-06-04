// 定义货币格式化函数
export function useCurrencyFormatter(value: number | string) {
  // 格式化货币的计算属性工厂函数
  if (!value || isNaN(+value)) return '';

  // 使用Intl.NumberFormat进行货币格式化
  const formatter = new Intl.NumberFormat('zh-CN', {
    currency: 'CNY', // 这里可以根据实际情况替换为相应的ISO货币代码
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
  });

  return formatter.format(+value);
}
