const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const updateContactById = async ({ id, name, email, phone }) => {
  const contacts = await listContacts()

  const foundIdx = contacts.findIndex(contact => contact.id === id)

  if (foundIdx === -1) {
    return null
  }

  contacts[foundIdx] = { id, name, email, phone }

  await updateContacts(contacts)

  return contacts[foundIdx]
}

module.exports = updateContactById
