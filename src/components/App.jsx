import React, { useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './redux/filterSlice';
import { deleteContact, replaceContacts } from './redux/contactsSlice';
import selectors from './redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getContacts);
  const filter = useSelector(selectors.getFilter);

  const submitForm = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };

    if (contacts.some(contact => name === contact.name)) {
      alert(`{$name} is already in contacts.`);
      return;
    }

    dispatch(setFilter(newContact));
  };

  const changeFilter = event => {
    setFilter({ filter: event.target.value });
  };

  const deleteContact = id => {
    dispatch(deleteContact(id));
  };

  const getFilteredContacts = (contacts, filter) => {
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    const getStorageContacts = localStorage.getItem('contacts');
    if (getStorageContacts) {
      return { contacts: JSON.parse(getStorageContacts) };
    }
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  });

  return (
    <div
      style={{
        paddingLeft: '20px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={submitForm} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getFilteredContacts(contacts, filter)}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
