const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function readContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  
  return JSON.parse(data)
} 

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

function listContacts() {
return readContacts()
}

async function getContactById(contactId) {

  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {return null}
    
  return contact;

}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex(contact => contact.id === contactId)

  if (index === -1) { return null }

  const newContact = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1)
  ]

  await writeContacts(newContact);

  return contacts[index];
}

async function addContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };
  
  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};