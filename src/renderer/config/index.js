const isPro = Object.is(process.env.NODE_ENV, 'development')
module.exports = {
  baseUrl: isPro ? 'http://localhost/' : 'http://test.whileaway.io/'
}
