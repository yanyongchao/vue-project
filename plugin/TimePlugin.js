class TimePlugin {
  apply (compiler) {
    compiler.hooks.beforeRun.tap('timePlugin', compiler => {
      console.log('\n----------------编译开始----------------')
    })
    compiler.hooks.done.tap('timePlugin', stat => {
      const buildTime = (stat.endTime - stat.startTime) / 1000
      console.log(`构建时间: ${buildTime}秒`)
      console.log('\n----------------编译结束----------------')
    })
  }
}

module.exports = TimePlugin
