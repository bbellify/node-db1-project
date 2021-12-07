const db = require('../../data/db-config')

const getAll =  async () => {
  // select * from accounts
  const rows = await db('accounts')
    .select('id', 'name', 'budget')
    return rows
}

const getById = async id => {
  // select * from accounts where id=12
  const [record] = await db('accounts')
    .where('id', id)
    return record
}

const create = async account => {
  // insert into accounts (name, budget) values ('account-14', '5000');
  const [newid] = await db('accounts').insert(account)
  const newAccount = await getById(newid)
  return newAccount
}

const updateById = async (id, account) => {
  await db('accounts')
    .update(account)
    .where('id', id)
  const updated = await getById(id)
  return updated
}

const deleteById = async id => {
  const deleted = await getById(id)
  
  const isDeleted =  await db('accounts')
    .delete()
    .where('id', id)

  if (isDeleted)
    return deleted
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
