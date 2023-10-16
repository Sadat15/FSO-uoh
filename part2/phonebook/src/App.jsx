import { useState, useEffect } from 'react'
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filtering, setNewFiltering] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data;
        setPersons(persons);
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    let personExists = persons.find(el => el.name == newName);

    if(personExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
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
      <Filter filtering={filtering} handleFilteringChange={handleFilteringChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact}/>
      <h2>Numbers</h2>
      <Persons filtering={filtering} persons={persons}/>
    </div>
  );
}

export default App;