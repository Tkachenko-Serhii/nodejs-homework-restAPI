const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const router = express.Router()

const contactsOperations = require('../../models/contacts')

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(10).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ru'] } })
    .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
      throw new NotFound()
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw res.status(400).json({ message: 'missing required name field' })
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deleteContact = await contactsOperations.removeContact(id)
    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw res.status(400).json({ message: 'missing fields' })
    }
    const { id } = req.params
    const updateContact = await contactsOperations.updateContactsById({ id, ...req.body })
    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
