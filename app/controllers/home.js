class HomeCtl {
  index(ctx) {
    ctx.body = "这是首页";
  }
  upload(ctx) {
    const file = ctx.request.files.file
    ctx.body = {
      path: file.path
    }
  }
}

module.exports = new HomeCtl();
