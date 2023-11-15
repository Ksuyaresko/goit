const fs = require('node:fs').promises;
const path = require('node:path');
const nanoid = require('nanoid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

function listContacts() {
    // ...твій код. Повертає масив контактів.
    return  (async () => {
        const data = await fs.readFile(contactsPath)
        return JSON.parse(data.toString())
    })()
}

function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    return  (async () => {
        const data = await fs.readFile(contactsPath)
        const dataParsed = JSON.parse(data.toString())
        const contact = Array.isArray(dataParsed) ? dataParsed.find((item) => item.id === contactId) : null
        return contact || null
    })()
}

function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    return  (async () => {
        const data = await fs.readFile(contactsPath)
        const dataParsed = JSON.parse(data.toString())
        const contact = Array.isArray(dataParsed) ? dataParsed.find((item) => item.id === contactId) : null
        if (!contact) return null
        await fs.writeFile(contactsPath, JSON.stringify(dataParsed.filter((item) => item.id !== contactId)))
        return contact
    })()
}

function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    return  (async () => {
        const newContact = {
            name, email, phone, id: nanoid.nanoid(),
        }
        const data = await fs.readFile(contactsPath)
        const dataParsed = JSON.parse(data.toString())
        await fs.writeFile(contactsPath, JSON.stringify(dataParsed.concat([newContact])))
        return newContact
    })()
}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}