const Router = require("koa-router");
const jwt = require("koa-jwt");
const {
  find,
  findById,
  update,
  create,
  checkQuestionExist,
  delete: del,
  checkQuestioner,
} = require("../controllers/questions");
const router = new Router({ prefix: "/questions" });
const { secret } = require("../config");

const auth = jwt({ secret });

// 查（列表）数据：
router.get("/", find);

router.get("/:id", checkQuestionExist, findById);

// 增加数据：
router.post("/", auth, create);

// 修改数据,patch方法为修改部分信息，put方法为修改所有信息：
router.patch("/:id", auth, checkQuestionExist, update);

router.delete("/:id", checkQuestionExist, checkQuestioner, del);

module.exports = router;
