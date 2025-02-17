import { Component } from "react";
import ContactList from "./ContactsList/ContactsList";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";

const CONTACTS_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  // Add contacts to localStorage
  async componentDidMount() {
    const data = localStorage.getItem(CONTACTS_KEY);

    try {
      if(data) {
        this.setState({ contacts: JSON.parse(data)})
      }
    } catch(error) {
      console.error(error);
    }
  }

  // Update contacts in localStorage
  componentDidUpdate(_prevProps, prevState) {
    if(prevState?.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          margin: 50,
          padding: 20,
          borderRadius: 10,
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          fontSize: 40,
          maxWidth: 400,
          color: '#010101'
        }}
        className="phonebookSection"
      >
        <h1 style={{fontSize: 40}}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>

        <Filter filter={this.state.filter} handleFilterChange={this.changeFilter}/>
        <ContactList 
          contacts={this.getFilteredContacts()}
          onDeleteContact={this.deleteContact}
        />
       
      </div>
    );
  }
  
};


export default App;