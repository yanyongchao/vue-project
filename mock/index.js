const bodyParser = require('body-parser')
const path = require('path')
const user = require('./user')
const chalk = require('chalk')
const chokidar = require('chokidar')

const mocks = [
  ...user
]

const mockDir = path.join(process.cwd(), 'mock')

function unregisterRoutes () {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

function registerRoutes (app) {
  let mockLastIndex
  console.log(mocks)
  for (const mock of mocks) {
    app[mock.type]('/mock' + mock.url, mock.response)
  }
  const mockRoutesLength = Object.keys(mocks).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

module.exports = function (app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex
  
  // watch files, hot reload mock server
  chokidar.watch(mockDir, {
    ignored: /index/,
    ignoreInitial: true
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') {
      try {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)
  
        // clear routes cache
        unregisterRoutes()
  
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex
  
        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
