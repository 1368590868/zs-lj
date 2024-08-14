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
  75: '受托研发',
  76: '自主创新',
  77: '山区公路路基路面安全维',
  78: '公路桥梁安全维护关键技',
  79: '公路隧道建设管养关键技',
  80: '主任基金',
  81: '国拨项目_政府补助',
  82: '专项检测',
  83: '其他',
};

export const professionTypeTree = (disabled) => [
  {
    label: '科研',
    value: '科研',
    disabled,
    children: [
      { label: '国家级', value: '科研-国家级' },
      { label: '省部级', value: '科研-省部级' },
      { label: '地市级', value: '科研-地市级' },
      { label: '自筹', value: '科研-自筹' },
      { label: '其他', value: '科研-其他' },
    ],
  },
  {
    label: '试验检测',
    value: '试验检测',
    disabled,
    children: [
      { label: '现场检测', value: '试验检测-现场检测' },
      { label: '驻地检查', value: '试验检测-驻地检查' },
    ],
  },
  {
    label: '勘察设计',
    value: '勘察设计',
    disabled,
    children: [
      { label: '勘测类', value: '勘察设计-勘测类' },
      { label: '设计类', value: '勘察设计-设计类' },
      { label: '勘察设计类', value: '勘察设计-勘察设计类' },
      { label: '其他', value: '勘察设计-其他' },
    ],
  },
  {
    label: '咨询服务',
    value: '咨询服务',
    disabled,
    children: [
      { label: '咨询审查类', value: '咨询服务-咨询审查类' },
      { label: '可行性及评估类', value: '咨询服务-可行性及评估类' },
      { label: '环评水保类', value: '咨询服务-环评水保类' },
      { label: '结构监测', value: '咨询服务-结构监测' },
      { label: '土建监理', value: '咨询服务-土建监理' },
      { label: '机电监理', value: '咨询服务-机电监理' },
      { label: '其他', value: '咨询服务-其他' },
    ],
  },
  {
    label: '普通工程',
    value: '普通工程',
    disabled,
    children: [
      { label: '土建', value: '普通工程-土建' },
      { label: '机电', value: '普通工程-机电' },
      { label: '土建及机电', value: '普通工程-土建及机电' },
      { label: '路面', value: '普通工程-路面' },
      { label: '华驰机电', value: '普通工程-华驰机电' },
      { label: '平行钢丝斜拉索和吊杆安', value: '普通工程-平行钢丝斜拉索和吊杆安' },
      { label: '钢绞线斜拉索和吊杆安装', value: '普通工程-钢绞线斜拉索和吊杆安装' },
      { label: '悬索桥主缆安装', value: '普通工程-悬索桥主缆安装' },
      { label: '场馆用缆索安装', value: '普通工程-场馆用缆索安装' },
      { label: '其他', value: '普通工程-其他' },
    ],
  },
  {
    label: '特色工程',
    value: '特色工程',
    disabled,
    children: [
      { label: '土建', value: '特色工程-土建' },
      { label: '机电', value: '特色工程-机电' },
      { label: '土建及机电', value: '特色工程-土建及机电' },
      { label: '路面', value: '特色工程-路面' },
      { label: '钢桥面', value: '特色工程-钢桥面' },
      { label: '彩铺', value: '特色工程-彩铺' },
      { label: '防水', value: '特色工程-防水' },
      { label: '平行钢丝斜拉索和吊杆特', value: '特色工程-平行钢丝斜拉索和吊杆特' },
      { label: '钢绞线斜拉索和吊杆特安', value: '特色工程-钢绞线斜拉索和吊杆特安' },
      { label: '悬索桥主缆特安', value: '特色工程-悬索桥主缆特安' },
      { label: '场馆用缆索特安', value: '特色工程-场馆用缆索特安' },
      { label: '其他', value: '特色工程-其他' },
    ],
  },
  {
    label: '设计施工总承包',
    value: '设计施工总承包',
    disabled,
    children: [
      { label: '土建', value: '设计施工总承包-土建' },
      { label: '机电', value: '设计施工总承包-机电' },
      { label: '土建及机电', value: '设计施工总承包-土建及机电' },
      { label: '路面', value: '设计施工总承包-路面' },
      { label: '拉索', value: '设计施工总承包-拉索' },
      { label: '其他', value: '设计施工总承包-其他' },
    ],
  },
  {
    label: 'BT',
    value: 'BT',
    disabled,
    children: [{ label: 'BT', value: 'BT-BT' }],
  },
  {
    label: 'PPP',
    value: 'PPP',
    disabled,
    children: [
      { label: 'PPP', value: 'PPP-PPP' },
      { label: '运营综合', value: 'PPP-运营综合' },
      { label: '日常基建', value: 'PPP-日常基建' },
      { label: '日常咨询', value: 'PPP-日常咨询' },
      { label: '日常设计', value: 'PPP-日常设计' },
      { label: '日常监理', value: 'PPP-日常监理' },
      { label: '日常检测', value: 'PPP-日常检测' },
      { label: '日常外拔', value: 'PPP-日常外拔' },
      { label: '日常其他', value: 'PPP-日常其他' },
      { label: '专项基建', value: 'PPP-专项基建' },
      { label: '专项咨询', value: 'PPP-专项咨询' },
      { label: '专项设计', value: 'PPP-专项设计' },
      { label: '专项监理', value: 'PPP-专项监理' },
      { label: '专项检测', value: 'PPP-专项检测' },
      { label: '专项外拔', value: 'PPP-专项外拔' },
      { label: '专项其他', value: 'PPP-专项其他' },
    ],
  },
  {
    label: '产品',
    value: '产品',
    disabled,
    children: [
      { label: '结构工程产品', value: '产品-结构工程产品' },
      { label: '岩土工程产品', value: '产品-岩土工程产品' },
      { label: '工程材料产品', value: '产品-工程材料产品' },
      { label: '机电产品', value: '产品-机电产品' },
      { label: 'IT产品', value: '产品-IT产品' },
      { label: '软件产品', value: '产品-软件产品' },
      { label: '路面产品', value: '产品-路面产品' },
      { label: '彩铺', value: '产品-彩铺' },
      { label: '防水', value: '产品-防水' },
      { label: '机械设备（智翔）', value: '产品-机械设备（智翔）' },
      { label: '整车称重产品', value: '产品-整车称重产品' },
      { label: '弯板称重产品', value: '产品-弯板称重产品' },
      { label: '超限交通检测产品', value: '产品-超限交通检测产品' },
      { label: '交调交通检测产品', value: '产品-交调交通检测产品' },
      { label: '代理产品', value: '产品-代理产品' },
      { label: '双称台称重产品', value: '产品-双称台称重产品' },
      { label: '平行钢丝斜拉索和吊杆', value: '产品-平行钢丝斜拉索和吊杆' },
      { label: '钢绞线斜拉索和吊杆', value: '产品-钢绞线斜拉索和吊杆' },
      { label: '悬索桥主缆', value: '产品-悬索桥主缆' },
      { label: '场馆用缆索', value: '产品-场馆用缆索' },
      { label: '灯具', value: '产品-灯具' },
      { label: '其他', value: '产品-其他' },
    ],
  },
  {
    label: '信息产业',
    value: '信息产业',
    disabled,
    children: [
      { label: '交通基础设施监测', value: '信息产业-交通基础设施监测' },
      { label: '交通运输管理', value: '信息产业-交通运输管理' },
      { label: '公路养护管理', value: '信息产业-公路养护管理' },
    ],
  },
  {
    label: '自研',
    value: '自研',
    disabled,
    children: [
      { label: '受托研发', value: '自研-受托研发' },
      { label: '自主创新', value: '自研-自主创新' },
      { label: '山区公路路基路面安全维', value: '自研-山区公路路基路面安全维' },
      { label: '公路桥梁安全维护关键技', value: '自研-公路桥梁安全维护关键技' },
      { label: '公路隧道建设管养关键技', value: '自研-公路隧道建设管养关键技' },
      { label: '主任基金', value: '自研-主任基金' },
      { label: '国拨项目_政府补助', value: '自研-国拨项目_政府补助' },
      { label: '其他', value: '自研-其他' },
    ],
  },
  {
    label: '投资性物业',
    value: '投资性物业',
    disabled,
    children: [
      { label: '招商局大厦写字楼', value: '投资性物业-招商局大厦写字楼' },
      { label: '华商国际会议交流中心', value: '投资性物业-华商国际会议交流中心' },
      { label: '招商交科院车位', value: '投资性物业-招商交科院车位' },
      { label: '租入合同管理', value: '投资性物业-租入合同管理' },
      { label: '其他自管物业', value: '投资性物业-其他自管物业' },
    ],
  },
];

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
