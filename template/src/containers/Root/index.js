module.exports = process.env.NODE_ENV === 'production' || process.env.PROD ? require('./Rood.prod') : require('./Root.dev')
