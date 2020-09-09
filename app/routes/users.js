const Router = require("koa-router");
const {
  find,
  findById,
  update,
  create,
  delete: del,
  login
} = require("../controllers/users");
const router = new Router({ prefix: "/users" });

// 查（列表）数据：
router.get("/", find);

router.get("/:id", findById);

// 增加数据：
router.post("/", create);

// 修改数据,patch方法为修改部分信息，put方法为修改所有信息：
router.patch("/:id", update);

// 删除数据：
router.delete("/:id", del);

// 登录接口：
router.post("/login", login)

module.exports = router;
