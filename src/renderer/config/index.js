const isPro = Object.is(process.env.NODE_ENV, 'development')
const baseUrl = isPro ? 'http://localhost/' : 'http://test.whileaway.io/'
export {baseUrl}
