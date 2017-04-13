function buildConfig(env) {
  return require('./webpack.config.' + env + '.js')
}

module.exports = buildConfig;
