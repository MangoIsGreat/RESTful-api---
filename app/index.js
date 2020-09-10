const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static")
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const routing = require("./routes");
const mongoose = require("mongoose")
const path = require("path")
const { connectionStr } = require("./config")
// 实例化一个app对象：
const app = new Koa();

mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("MongoDB 连接成功了..."))
// 监听数据库连接错误：
mongoose.connection.on("error", console.error)

app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true
  }
}));

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
