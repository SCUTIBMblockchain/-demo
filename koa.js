const Koa = require('koa')
const app = Koa()
const koa = require('koa-router')()
const json = require('koa-json')
const logger = require('koa-logger')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')

app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

app.use(function* (next) {
  let start = new Date()
  yield next
  let ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

koa.use('/auth', auth.routes())
koa.use('/api', api.routes())

app.use(koa.routes())

app.listen(8889, () => {
  console.log('Koa is listening in 8889')
})

module.exports = app
