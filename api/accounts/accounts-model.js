const db = require('../../data/db-config')

const getAll =  async () => {
  // select * from accounts
  const rows = await db('accounts')
    .select('id', 'name', 'budget')
    return rows
}

const getById = async id => {
  // select * from accounts where id=12
  const record = await db('accounts')
    .where('id', id)
    return record
}

const create = async account => {
  // insert into accounts (name, budget) values ('account-14', '5000');
  const [newid] = await db('accounts').insert(account)
  const newAccount = await getById(newid)
  return newAccount

}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
