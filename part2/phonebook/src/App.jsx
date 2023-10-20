import { useState, useEffect } from 'react'
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import personService from './services/Persons.js';
import Notification from './Notification.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtering, setNewFiltering] = useState('');
  const [messageContent, setMessageContent] = useState(null);


  const fetchContacts = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }

  useEffect(fetchContacts, [])

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    let personExists = persons.find(person => person.name == newName);

    if(personExists) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with the a new one?`)) {
        const [updatedPerson] = persons.filter(person => person.name == newName);
        updatedPerson.number = newNumber;
        personService
          .updateNumber(updatedPerson)
          .then(setPersons(persons.map((person) => person.id !== updatedPerson.id ? person : updatedPerson)))
        setNewName('');
        setNewNumber('');
        setMessageContent(`Phone number for ${updatedPerson.name} was successfully updated.`);
        setTimeout(() => {
          setMessageContent(null)
        }, 5000)
      }
      return;

    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setMessageContent(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessageContent(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilteringChange = (event) => {
    setNewFiltering(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {messageContent === null ? <></> : <Notification message={messageContent}/>}
      <Filter filtering={filtering} handleFilteringChange={handleFilteringChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact}/>
      <h2>Numbers</h2>
      <Persons filtering={filtering} persons={persons} setPersons={setPersons}/>
    </div>
  );
}

export default App;