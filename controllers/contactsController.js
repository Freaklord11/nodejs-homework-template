// import * as contactsModels from "../models/contacts.js";
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require('../models/contacts.js');
// const catchAsync = require('../utils/catchAsync.js');
// const validator = require('../utils/validator.js');
// const HttpError = require('../utils/httpError.js');

const { catchAsync, contactValidators, HttpError } = require('../utils');


const listContactsController = catchAsync(async (req, res) => {
    const result = await listContacts();
    res.json(result);
})

const getContactByIdController = catchAsync(async (req, res) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    console.log(result)
    if (!result) {
        res.status(400).json({ error: `Contact id=${contactId} not found` })
    }
    res.json(result);
})

const removeContactController = catchAsync(async (req, res) => {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
        res.status(400).json({ error: `Contact id=${contactId} not found` })
    }
    res.json({ message: 'Contact removed'});
})

const addContactController = catchAsync(async (req, res) => {
    // console.log(contactValidators.addContactValidator('{qwe: 1}'))
    const { error } = contactValidators.addContactValidator(req.body);

    if (error) throw new HttpError(400, error)
    console.log(error);
    const result = await addContact(req.body);

    res.status(201).json(result);
})

const updateContactController = catchAsync(async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body)
    res.json(result);
})

module.exports = {
    listContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
}