// 两次密码一致性
export const checkPassword = (rule, value, callback) => {
  const level = [{}];
  const regChinese = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
  if (regChinese.test(value)) {
    return callback('不能有中文');
  }
  if (/\s/g.test(value)) {
    return callback('不能有空格');
  }
  if (!value) {
    return callback('密码不能为空');
  }
  if (value.length < 8) {
    return callback('密码不少于8位');
  }
  if (value.length > 16) {
    return callback('密码不大于16位');
  }
  // 校验是数字
  const regex1 = /^\d+$/;
  // 校验字母
  const regex2 = /^[A-Za-z]+$/;
  // 校验符号
  const regex3 =
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]+$/;
  if (regex1.test(value)) {
    level.push('low');
  } else if (regex2.test(value)) {
    level.push('low');
  } else if (regex3.test(value)) {
    level.push('low');
  } else if (/^[A-Za-z\d]+$/.test(value)) {
    level.push('low');
    level.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、\d]+$/.test(
      value,
    )
  ) {
    level.push('low');
    level.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z]+$/.test(
      value,
    )
  ) {
    level.push('low');
    level.push('middle');
  } else if (
    /^[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、A-Za-z\d]+$/.test(
      value,
    )
  ) {
    level.push('low');
    level.push('middle');
    level.push('high');
  }

  return callback();
};
// 手机号
export const validatorPhone = (rule, value, callback) => {
  // 如果为空值，就抛出错误
  if (!value) {
    callback();
  } else {
    // 正则判断手机号格式的格式，正则判断失败抛出错误，否则直接callback()
    if (!/^1[2-9]\d{9}$/.test(value)) {
      callback(new Error('手机号格式不正确!'));
    } else {
      callback();
    }
  }
};
// 验证码
export const validateCode = (rule, value, callback) => {
  const numberReg = /^\d+$|^\d+[.]?\d+$/;
  const numberMax = /^[0-9]{6}$/;
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入数字'));
    } else if (!numberMax.test(value)) {
      callback(new Error('请输入6位数字'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 邮箱
export const validateEmail = (rule, value, callback) => {
  // 如果为空值，就抛出错误
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!value) {
    callback();
  } else {
    // 正则判断手机号格式的格式，正则判断失败抛出错误，否则直接callback()
    if (!reg.test(value)) {
      callback(new Error('邮箱格式不正确!'));
    } else {
      callback();
    }
  }
};
// 身份证
export const validateIdCard = (rule, value, callback) => {
  // 如果为空值，就抛出错误
  const reg = /(^\d{18}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!value) {
    callback();
  } else {
    // 正则判断手机号格式的格式，正则判断失败抛出错误，否则直接callback()
    if (!reg.test(value)) {
      callback(new Error('身份证格式不正确!'));
    } else {
      callback();
    }
  }
};

// 只能为中文校验
export const isChinese = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5]+$/;
  if (reg.test(value)) {
    callback(new Error('格式有误,不能为中文'));
  } else {
    callback();
  }
};
