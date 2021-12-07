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

router.get('/:id', (req, res, next) => {
  Account.getById(req.params.id)
    .then( rec => {
      res.json(rec)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Account.create(req.body)
    .then(rec => {
      res.json(rec)
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 400).json({
    message: `${err.message}`,
    stack: err.stack
  })
})

module.exports = router;
