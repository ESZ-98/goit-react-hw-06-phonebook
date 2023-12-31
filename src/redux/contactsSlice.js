import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const getStorageContacts = localStorage.getItem('contacts');
const contactsFromStorage = JSON.parse(getStorageContacts);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsFromStorage || contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(formName, formNumber) {
        return {
          payload: {
            id: nanoid(),
            name: formName,
            number: formNumber,
          },
        };
      },
    },

    contactsFromStorage() {
      if (getStorageContacts) {
        return { contacts: JSON.parse(getStorageContacts) };
      }
    },

    deleteContacts(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);

      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
