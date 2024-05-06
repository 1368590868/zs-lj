# 第一次代码获取

在自有项目仓库，整合本项目代码 可以同步更新本项目最新代码

1、自有项目仓库地址 添加本项目示例:git remote add origin 别名 项目地址, 例: git remote add ctc http://100.97.70.7:8089/sample/CTC-fast-web

2、查看是否添加成功git remote -v 显示 CTC http://100.97.70.7:8089/sample/CTC-fast-web(fetch) CTC http://100.97.70.7:8089/sample/CTC-fast-web(push) 为成功

3、拉取代码 拉去 dev 分支示例:git pull origin 别名 项目分支 例: git pull CTC dev

# 环境准备

本地环境需要安装 Yarn1.x、Node.js 和 Git

必须使用 Yarn1.x，否则依赖可能安装不上。 Node.js 版本要求 12.x 以上，且不能为 13.x 版本，这里推荐 14.x 及以上。

# 工具配置

如果您使用的 IDE 是 vscode(推荐)的话，可以安装以下工具来提高开发效率及代码格式化

Iconify IntelliSense - Iconify 图标插件 windicss IntelliSense - windicss 提示插件 I18n-ally - i18n 插件 Vetur - vue 开发必备 （也可以选择 Volar） ESLint - 脚本代码检查 Prettier - 代码格式化 Stylelint - css 格式化 DotENV - .env 文件 高亮

# CTC-FAST-WEB

是一个基于 Vue3.0、Vite、 Ant-Design-Vue、TypeScript 的后台解决方案，目标是为开发中大型项目提供开箱即用的解决方案。包括二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能。

# 全局安装 yarn

必须使用 Yarn 进行依赖安装（若其他包管理器安装不了需要自行处理）。如果未安装 yarn，可以用下面命令来进行全局安装

npm i -g yarn

# 验证

yarn -v # 出现对应版本号即代表安装成功安装依赖 yarn(必须)

# 本地运行本项目

运行项目 yarn dev

构建项目 yarn build

# 旧版浏览器兼容

在 .env.production 内

设置 VITE_LEGACY=true 即可打包出兼容旧版浏览器的代码

# 预览

发布之前可以在本地进行预览，有多种方式，这里介绍两种

不能直接打开构建后的 html 文件

使用项目自定的命令进行预览(推荐) 先打包在进行预览 yarn preview 直接预览本地 dist 文件目录 yarn preview:dist

本地服务器预览(通过 live-server)

1.全局安装 live-server yarn global add live-server 2. 进入打包的后目录 cd ./dist 本地预览，默认端口 8080 live-server 指定端口 live-server --port 9000

# 本地开发推荐掌握知识

Vue3 文档 Vue-RFCS Vue2 迁移到 3 TypeScript Vue-router Ant-Design-Vue Es6 Vitejs WindiCss

# vite 插件推荐

vite-plugin-mock - 用于本地及开发环境数据 mock vite-plugin-html - 用于 html 模版转换，可以在 html 文件内进行书写模版语法 vite-plugin-style-import - 用于组件库样式按需引入 vite-plugin-imagemin - 用于打包压缩图片资源 vite-plugin-theme - 用于在线切换主题色/黑暗主题适配等主题相关配置 vite-plugin-compression - 用于打包输出.gz|.br 文件 vite-plugin-svg-icons - 快速生成 svg sprite

# 浏览器支持

本地开发推荐使用 Chrome 最新版浏览器，不支持 Chrome 80 以下版本。支持 IEIE EdgeEdge FirefoxFirefox ChromeChrome SafariSafari 生产环境支持现代浏览器，不支持 IE。

# 问题汇总

1、个人中心更新信息LOGO 变回默认头像的bug
① 通过更新ctc-fast最新代码即可解决
② 手动修改
1、frontend\src\assets\images\logoAvatar.png //新增照片
2、views\system\account\BaseSetting.vue  
import headerImg from '/@/assets/images/logoAvatar.png'; // 替换 
 const handleSubmit = async () => { // 替换 
    const values = await validate();
    let params = {
      ...values,
      avatar: avatar.value,
    };
    await userEditInfoApi(values);
    userStore.setUserInfo(params);
    createMessage.success('更新成功！');
  };
3、frontend\src\components\Cropper\src\CopperModal.vue 
 189行增加错误提示
  if (result.data.code === 1) {
         message.error(result.data.msg);
         return;
  }  
4、frontend\src\layouts\default\header\components\lock\LockModal.vue
import headerImg from '/@/assets/images/logoAvatar.png'; // 替换  
5、frontend\src\layouts\default\header\components\user-dropdown\index.vue
import headerImg from '/@/assets/images/logoAvatar.png'; // 替换  
6、frontend\src\views\dashboard\workbench\components\WorkbenchHeader.vue
import headerImg from '/@/assets/images/logoAvatar.png'; // 替换  
7、frontend\src\views\sys\lock\LockPage.vue
import headerImg from '/@/assets/images/logoAvatar.png'; // 替换 

