const isPro = Object.is(process.env.NODE_ENV, 'development')
const baseUrl = isPro ? 'http://localhost:8080/' : 'http://apit.whileaway.io/'
export {baseUrl}
