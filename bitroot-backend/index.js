const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuid = require('uuid')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let contacts = [];

// Create New Contact
app.post('/contacts', (req, res) => {
    const newContact = req.body;
    newContact.id = uuid.v4();
    // Check for duplicate phone numbers
    const duplicate = contacts.some(contact => contact.phone === newContact.phone);
    if (duplicate) {
        console.log("found duplicate")
        return res.status(400).json({ error: 'Duplicate phone number' });
    }

    contacts.push(newContact);
    res.status(201).send({
        "id": newContact.id,
        newContact,
    });
});

// Delete Contact
app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id;
    contacts = contacts.filter(contact => contact.id !== id);
    res.status(204).end();
});

// Fetch All Contacts
app.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
});

// Search Contacts
app.get('/contacts/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const searchResults = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query)
    );
    res.status(200).json(searchResults);
});

// Update Contact
app.put('/contacts/:id', (req, res) => {
    const id = req.params.id;
    const updatedContact = req.body;

    contacts = contacts.map(contact => {
        if (contact.id === id) {
            return { ...contact, ...updatedContact };
        }
        return contact;
    });

    res.status(200).json(updatedContact);
});


// Export all contacts to CSV
app.get('/contacts/export/csv', (req, res) => {
    const csvContent = contacts.map(contact => `${contact.name},${contact.phone}`).join('\n');
    fs.writeFile('contacts.csv', csvContent, err => {
        if (err) {
            return res.status(500).json({ error: 'Failed to export contacts to CSV' });
        }
        res.download('contacts.csv');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
