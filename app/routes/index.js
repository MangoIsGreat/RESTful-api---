// 写一个自动读取路由文件的脚本：
const fs = require("fs");
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    // 如果文件名为index.js则终止读取：
    if (file === "index.js") {
      return;
    }
    const route = require(`./${file}`);
    // 批量注册路由：
    app.use(route.routes()).use(route.allowedMethods());
  });
};
