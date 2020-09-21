const Router = require("koa-router");
const jwt = require("koa-jwt");
const {
  find,
  findById,
  update,
  create,
  checkAnswersExist,
  delete: del,
  checkAnswer,
} = require("../controllers/answers");
const router = new Router({ prefix: "/answers" });
const { secret } = require("../config");

const auth = jwt({ secret });

// 查（列表）数据：
router.get("/", find);

router.get("/:id", checkAnswersExist, findById);

// 增加数据：
router.post("/", auth, create);

// 修改数据,patch方法为修改部分信息，put方法为修改所有信息：
router.patch("/:id", auth, checkAnswersExist, update);

router.delete("/:id", checkAnswersExist, checkAnswer, del);

module.exports = router;
