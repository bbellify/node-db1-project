const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  Account.getById(req.params.id)
    .then(r => {
      if (!r) {
        next({ status: 404, message: 'account not found'})
      } else {
        next()
      }
    })
    .catch(next)
}
