// 预警状态
export enum WarningStatusEnum {
  GREEN = '0',
  YELLOW = '1',
  RED = '2',
}
// 管控状态
export enum ControlStatusEnum {
  /**无 */
  NONE = '0',
  /**未配置 */
  UNCONFIGURED = '1',
  /**管控中 */
  CONTROL = '2',
  /**待完成 */
  TO_BE_COMPLETED = '3',
  /**延期配置 */
  DELAY_CONFIGURATION = '4',
  /**已结束 */
  END = '5',
  /**待判定 */
  TO_BE_JUDGED = '6',
  /**延期审核中 */
  DELAY_AUDIT = '7',
  /**结束审核中 */
  END_AUDIT = '8',
}
// 工程进度
export enum ProjectProgressEnum {
  IN_PROGRESS = 0,
  COMPLETED = 1,
  TO_BE_COMPLETED = 2,
  TO_BE_STARTED = 3,
}
// 项目负责人审核状态
export enum ProjectOwnerStatusEnum {
  /**待审核 */
  TO_BE_AUDITED = 0,
  /**通过 */
  PASSED = 1,
  /**驳回 */
  REJECTED = 2,
}

//  预警状态
export const warningStatusOptions = {
  0: '正常',
  1: '黄色预警',
  2: '红色预警',
};

// 项目进度
export const projectProgressOptions = {
  0: '进行中',
  1: '已完成',
  2: '待完成',
  3: '待开始',
};

//   管控状态
export const controlStatusOptions = {
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

// 预警颜色
export const warningColorEnum = {
  0: '#27CB0D',
  1: '#EFAD03',
  2: '#FF7455',
};

// 成本科目
export const costSubjectEnum = {
  0: '交通费',
  1: '住宿费',
  2: '差旅补贴',
  3: '车辆租用费',
  4: '车辆油费',
  5: '过路及维修费',
  6: '印刷出版资料费',
  7: '租房费',
  8: '招待费',
  9: '会议费',
  10: '外拨费用',
  11: '设备租赁费用',
  12: '人力成本',
  13: '其他费用',
};

// 里程碑管控状态
export const milestoneControlStatusEnum = {
  0: '待开始',
  1: '进行中',
  2: '已结束',
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

// 单条记录审核状态
export const singleCostStatusOptions = {
  0: '待审核',
  1: '已通过',
  2: '已驳回',
  3: '待审核',
};

// 月度成本审核状态
export const costChargeOptions = {
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
