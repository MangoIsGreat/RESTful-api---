const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const routing = require("./routes");
const mongoose = require("mongoose")
const { connectionStr } = require("./config")
// 实例化一个app对象：
const app = new Koa();

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("MongoDB 连接成功了..."))
// 监听数据库连接错误：
mongoose.connection.on("error", console.error)

// 将router注册到app中：
app.use(bodyparser());
app.use(error({
    postFormat: (err, {stack, ...rest}) => {
        return process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
    }
}))
app.use(parameter(app))
routing(app);

app.listen(3000, () => {
  console.log("程序启动成功...");
});
