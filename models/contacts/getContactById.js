const listContacts = require('./listContacts')

const getContactById = async id => {
  const contacts = await listContacts()

  const foundСontact = contacts.find(contact => contact.id === id)

  if (!foundСontact) {
    return null
  }
  return foundСontact
}

module.exports = getContactById
