const fs = require('fs');

// membuat directory

const dirPath = './data';

if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file directory

const path = 'data/contacts.json';

if(!fs.existsSync(path)){
    fs.writeFileSync(path, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const findContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact)=> contact.nama.toLowerCase() == nama.toLowerCase()
    );

    return contact;
}

// Menimpa data json dengan data yang baru ditambhkan

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// Cari nama yang duplikat

const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact)=> contact.nama === nama);
}

// Function Delete contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filteredContact = contacts.filter((contact)=> contact.nama !== nama);
    saveContacts(filteredContact);

}

// Mennyimpan update contact

const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    const filteredContact = contacts.filter((contact)=> contact.nama !== contactBaru.oldName);
    delete contactBaru.oldName;
    filteredContact.push(contactBaru);
    saveContacts(filteredContact);
}


module.exports = {loadContact, findContact, addContact, cekDuplikat, updateContacts, deleteContact };