const express = require('express');
const router = express.Router();

// Получение всех контактов
module.exports = (contacts) => {
  router.get('/', (req, res) => {
    res.json(contacts);
  });

  // Создание нового контакта
  router.post('/', (req, res) => {
    const newContact = {
      id: contacts.length + 1, // Простой ID
      ...req.body,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  });

  // Обновление контакта по ID
  router.put('/:id', (req, res) => {
    const index = contacts.findIndex(contact => contact.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Contact not found' });

    contacts[index] = { id: contacts[index].id, ...req.body };
    res.json(contacts[index]);
  });

  // Удаление контакта по ID
  router.delete('/:id', (req, res) => {
    const index = contacts.findIndex(contact => contact.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Contact not found' });

    const deletedContact = contacts.splice(index, 1);
    res.json({ message: 'Contact deleted', contact: deletedContact[0] });
  });

  return router;
};
