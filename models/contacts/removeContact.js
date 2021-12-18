const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts')

const removeContact = async id => {
  const contacts = await listContacts()

  const foundIdx = contacts.findIndex(contact => contact.id === id)

  if (foundIdx === -1) {
    return null
  }

  const newContacts = contacts.filter((_, index) => index !== foundIdx)

  await updateContacts(newContacts)

  return contacts[foundIdx]
}

module.exports = removeContact
