const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const array = await listContacts();
  if (array.length === 0) return null;
  const contact = array.find(item => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const array = await listContacts();
  if (array.length === 0) return null;
  const contact = array.find(item => item.id === contactId);
  if (contact === undefined) return null;
  const newArray = array.filter(item => item.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newArray, null, 2), 'utf8');
  return contact;
}

async function addContact(name, email, phone) {
  const array = await listContacts();
  let contact = array.find(item => item.email === email || name.email === name);
  if (contact !== undefined) throw new Error('CONTACT_EXISTS');
  contact = { id: nanoid(), name, email, phone };
  array.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(array, null, 2), 'utf8');
  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};