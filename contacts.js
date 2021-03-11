const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const readFile = async (contactsPath) => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (err) {
    console.error(err.message);
  }
};

const writeFile = async (contactsPath, data) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, "  "));
  } catch (err) {
    console.error(err.message);
  }
};

const listContacts = async () => {
  const contacts = await readFile(contactsPath);
  console.table(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await readFile(contactsPath);
  const contactById = contacts.find((item) => item.id === contactId);

  console.table(contactById);
};

const removeContact = async (contactId) => {
  const contacts = await readFile(contactsPath);
  const newContacts = contacts.filter((item) => item.id !== contactId);

  await writeFile(contactsPath, newContacts);

  console.table(newContacts);
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await readFile(contactsPath);
  const newContacts = [...contacts, newContact];

  await writeFile(contactsPath, newContacts);

  console.table(newContacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
