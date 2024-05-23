// 项目进度
export const projectProgressEnum = {
  0: '进行中',
  1: '已完成',
  2: '待完成',
};

//   管控状态
export const controlStatusEnum = {
  0: '无',
  1: '未配置',
  2: '管控中',
  3: '待完成',
  4: '延期配置',
  5: '已结束',
  6: '待判定',
  7: '延期审核中',
  8: '结束审核中',
};

//  预警状态
export const warningStatusEnum = {
  0: '正常',
  1: '黄色预警',
  2: '红色预警',
};

// 预警颜色
export const warningColorEnum = {
  0: '#27CB0D',
  1: '#EFAD03',
  2: '#FF7455',
};

// 成本科目
export const costSubjectEnum = {
  0: '住宿费',
  1: '租车费',
  2: '餐费',
  3: '燃油费',
  4: '过路费',
  5: '评审费',
  6: '设备租赁费',
  7: '外拨',
  8: '项目建设费',
  9: '耗材费',
  10: '房租费',
  11: '餐补费',
  12: '其他',
};

// 里程碑管控状态
export const milestoneControlStatusEnum = {
  0: '待开始',
  1: '进行中',
  2: '待审核',
  3: '已完成',
};

// 项目类型
export const projectTypeEnum = {
  0: '小型项目',
  1: '一般项目',
  2: '大型项目',
  3: '特大型项目',
  4: '重大型项目',
};

// 专业类型
export const professionTypeEnum = {
  0: '现场检测',
  1: '技术咨询',
  2: '健康监测',
  3: '勘察设计',
  4: '软件开发',
  5: '室内检测',
  6: '驻地监测',
  7: '驻地检测',
  8: '咨询服务',
  9: '咨询评估',
  10: '工地实验室',
  11: '科研',
  12: '其他',
};

// 我的成本记录状态
export const myCostStatusEnum = {
  0: '待审核',
  1: '已通过',
  2: '已驳回',
  3: '失效作废',
};

// 月度成本审核状态
export const costChargeEnum = {
  0: '待审核',
  1: '已通过',
  2: '已驳回',
  3: '存在前一级未审核数据',
};

// 全国省份枚举
export const provinceEnum = [
  { code: '11', name: '北京市' },
  { code: '12', name: '天津市' },
  { code: '13', name: '河北省' },
  { code: '14', name: '山西省' },
  { code: '15', name: '内蒙古自治区' },
  { code: '21', name: '辽宁省' },
  { code: '22', name: '吉林省' },
  { code: '23', name: '黑龙江省' },
  { code: '31', name: '上海市' },
  { code: '32', name: '江苏省' },
  { code: '33', name: '浙江省' },
  { code: '34', name: '安徽省' },
  { code: '35', name: '福建省' },
  { code: '36', name: '江西省' },
  { code: '37', name: '山东省' },
  { code: '41', name: '河南省' },
  { code: '42', name: '湖北省' },
  { code: '43', name: '湖南省' },
  { code: '44', name: '广东省' },
  { code: '45', name: '广西壮族自治区' },
  { code: '46', name: '海南省' },
  { code: '50', name: '重庆市' },
  { code: '51', name: '四川省' },
  { code: '52', name: '贵州省' },
  { code: '53', name: '云南省' },
  { code: '54', name: '西藏自治区' },
  { code: '61', name: '陕西省' },
  { code: '62', name: '甘肃省' },
  { code: '63', name: '青海省' },
  { code: '64', name: '宁夏回族自治区' },
  { code: '65', name: '新疆维吾尔自治区' },
];
