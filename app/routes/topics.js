const Router = require("koa-router");
const jwt = require("koa-jwt");
const {
  find,
  findById,
  update,
  create,
  listFollowers,
  checkTopicExist,
} = require("../controllers/topics");
const router = new Router({ prefix: "/topics" });
const { secret } = require("../config");

const auth = jwt({ secret });

// 查（列表）数据：
router.get("/", find);

router.get("/:id", checkTopicExist, findById);

// 增加数据：
router.post("/", auth, create);

// 修改数据,patch方法为修改部分信息，put方法为修改所有信息：
router.patch("/:id", auth, checkTopicExist, update);

router.get("/:id/followers", checkTopicExist, listFollowers);

module.exports = router;
