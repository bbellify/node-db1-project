const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  
  if (name === undefined || budget === undefined ) {
    next({ status: 400, message: 'name and budget are required'})
  } else if (typeof name !== 'string') {
    next({ status: 400, message: 'name of account must be a string'})
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: 'name of account must be between 3 and 100'})
  } else if (typeof budget !== 'number') {
    next({ status: 400, message: 'budget of account must be a number'})
  } else if (budget > 1000000 || budget < 1) {
    next({ status: 400, message: 'budget of account is too large or too small'})
  } else {
    req.body.new = { name: name.trim(), budget: budget}
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  Account.getAll()
    .then(rows => {
      console.log(rows)
    })
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
