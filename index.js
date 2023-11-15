const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const argv = require('yargs').argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case 'get':
      getContactById(id)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case 'add':
      addContact(name, email, phone)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    case 'remove':
      removeContact(id)
        .then(data => console.table(data))
        .catch(error => console.error(error));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);