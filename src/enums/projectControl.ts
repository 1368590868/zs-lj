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
  /**进行中 */
  IN_PROGRESS = 0,
  /**已完成 */
  COMPLETED = 1,
  /**待完成 */
  TO_BE_COMPLETED = 2,
  /**待开始 */
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

// 项目角色枚举
export enum ProjectRoleEnum {
  /**分管领导 */
  LEADER = 'xmzctj_leader',
  /**项目负责人 */
  XMFZR = 'xmzctj_xmfzr',
  /**成本负责人*/
  CBFZR = 'xmzctj_cbfzr',
  /**运营管理部 */
  YYB = 'xmzctj_yyb',
  /**费控员 */
  FKY = 'xmzctj_fky',
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
  0: '不管控',
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
  0: '小型',
  1: '一般',
  2: '大型',
  3: '特大型',
  4: '重大型',
};

// 专业类型
export const professionTypeEnum = {
  0: '国家级',
  1: '省部级',
  2: '地市级',
  3: '自筹',
  4: '现场检测',
  5: '驻地检查',
  6: '勘测类',
  7: '设计类',
  8: '勘察设计类',
  9: '咨询审查类',
  10: '可行性及评估类',
  11: '环评水保类',
  12: '结构监测',
  13: '土建监理',
  14: '机电监理',
  15: '土建',
  16: '机电',
  17: '土建及机电',
  18: '路面',
  19: '华驰机电',
  20: '平行钢丝斜拉索和吊杆安',
  21: '钢绞线斜拉索和吊杆安装',
  22: '悬索桥主缆安装',
  23: '场馆用缆索安装',
  24: '钢桥面',
  25: '彩铺',
  26: '防水',
  27: '平行钢丝斜拉索和吊杆特',
  28: '钢绞线斜拉索和吊杆特安',
  29: '悬索桥主缆特安',
  30: '场馆用缆索特安',
  31: '拉索',
  32: 'BT',
  33: 'PPP',
  34: '运营综合',
  35: '日常基建',
  36: '日常咨询',
  37: '日常设计',
  38: '日常监理',
  39: '日常检测',
  40: '日常外拔',
  41: '日常其他',
  42: '专项基建',
  43: '专项咨询',
  44: '专项设计',
  45: '专项监理',
  46: '专项外拔',
  47: '专项其他',
  48: '结构工程产品',
  49: '岩土工程产品',
  50: '工程材料产品',
  51: '机电产品',
  52: 'IT产品',
  53: '软件产品',
  54: '路面产品',
  55: '机械设备（智翔）',
  56: '整车称重产品',
  57: '弯板称重产品',
  58: '超限交通检测产品',
  59: '交调交通检测产品',
  60: '代理产品',
  61: '双称台称重产品',
  62: '平行钢丝斜拉索和吊杆',
  63: '钢绞线斜拉索和吊杆',
  64: '悬索桥主缆',
  65: '场馆用缆索',
  66: '灯具',
  67: '交通基础设施监测',
  68: '交通运输管理',
  69: '公路养护管理',
  70: '招商局大厦写字楼',
  71: '华商国际会议交流中心',
  72: '招商交科院车位',
  73: '租入合同管理',
  74: '其他自管物业',
  75: '其他',
};

// 我的成本记录状态
export const myCostStatusEnum = {
  0: '待审核',
  1: '已通过',
  2: '已驳回',
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
