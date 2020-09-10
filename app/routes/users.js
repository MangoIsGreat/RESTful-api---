const Router = require("koa-router");
const jwt = require("koa-jwt");
const {
  find,
  findById,
  update,
  create,
  delete: del,
  login,
  checkOwner,
} = require("../controllers/users");
const router = new Router({ prefix: "/users" });
const { secret } = require("../config");

const auth = jwt({ secret });

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
router.post("/login", login);

module.exports = router;
