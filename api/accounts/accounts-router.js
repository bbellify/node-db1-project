const router = require('express').Router()
const Account = require('./accounts-model')

const { 
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(rows => {
      res.json(rows)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Account.getById(req.params.id)
    .then( rec => {
      res.json(rec)
    })
    .catch(next)
})

router.post('/', checkAccountPayload, (req, res, next) => {
  Account.create(req.body.new)
    .then(rec => {
      res.status(201).json(rec)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Account.updateById(req.params.id, req.body.new)
    .then(rec => {
      res.status(200).json(rec)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then( rec => {
      res.json(rec)
    })
    .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 400).json({
    message: `${err.message}`,
    stack: err.stack
  })
})

module.exports = router;
