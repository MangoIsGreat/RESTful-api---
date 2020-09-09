// 定义一个内存数据库：
const User = require("../models/users")

class UsersCtl {
  async find(ctx) {
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) { ctx.throw(404, "用户不存在") }
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false }
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) { ctx.throw(404, "该用户不存在") }
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true }
    })
    // 获取请求体中的name属性：
    const {name} = ctx.request.body
    const repeatedUser = await User.findOne({name})
    if (repeatedUser) {ctx.throw(409, '用户已占用')}
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) { ctx.throw(404, "用户不存在") }
    ctx.status = 204
  }
}

module.exports = new UsersCtl();