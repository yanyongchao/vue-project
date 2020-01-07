const Mock = require('mockjs')// mockjs 导入依赖模块

const userinfo = Mock.mock(
  {
    userid: '@id()', // 随机生成用户id
    username: '@cname()', // 随机生成中文名字
    date: '@date()', // 随机生成日期
    avatar: '@image(\'200x200\',\'red\',\'#fff\',\'avatar\')', // 生成图片
    description: '@paragraph()', // 描述
    ip: '@ip()', // IP地址
    email: '@email()' // email
  }
)

module.exports = [
  {
    url: '/user/info',
    type: 'get',
    response: (req, res) => {
      const data = {
        code: 20000,
        data: userinfo
      }
      res.json(data)
    }
  }
]