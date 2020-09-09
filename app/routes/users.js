const Router = require("koa-router");
const {
  find,
  findById,
  update,
  create,
  delete: del,
} = require("../controllers/users");
const router = new Router({ prefix: "/users" });

// 查（列表）数据：
router.get("/", find);

router.get("/:id", findById);

// 增加数据：
router.post("/", create);

// 修改数据：
router.put("/:id", update);

// 删除数据：
router.delete("/:id", del);

module.exports = router;
