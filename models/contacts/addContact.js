const { nanoid } = require('nanoid')
const listContacts = require('./listContacts')
const updadeContacts = require('./updateContacts')

const addContact = async data => {
  const contacts = await listContacts()
  const newContact = { id: nanoid(), ...data }
  contacts.push(newContact)
  await updadeContacts(contacts)
  return newContact
}

module.exports = addContact
