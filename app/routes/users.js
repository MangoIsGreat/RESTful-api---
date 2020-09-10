const Router = require("koa-router");
const jwt = require("jsonwebtoken")
const {
  find,
  findById,
  update,
  create,
  delete: del,
  login,
  checkOwner
} = require("../controllers/users");
const router = new Router({ prefix: "/users" });
const { secret } = require("../config")

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, secret)
    // 使用ctx.state来存储用户信息：
    ctx.state.user = user
  } catch (err) {
    ctx.throw(401, err.message)
  }

  await next()
}

// 查（列表）数据：
router.get("/", find);

router.get("/:id", findById);

// 增加数据：
router.post("/", create);

// 修改数据,patch方法为修改部分信息，put方法为修改所有信息：
router.patch("/:id", auth, checkOwner, update);

// 删除数据：
router.delete("/:id", auth, checkOwner, del);

// 登录接口：
router.post("/login", login)

module.exports = router;
