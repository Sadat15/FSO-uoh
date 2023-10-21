import personService from './services/Persons.js';

const Persons = ({filtering, persons, setPersons, setMessage, setStatus}) => {

  const deleteContact = (id) => {
    const [personToDelete] = persons.filter(person => person.id == id);
    console.log(personToDelete);
    personService
      .deletePerson(id)
      .catch(error => {
        setStatus("error");
        setMessage(`Information of ${personToDelete.name} has already been removed from the server`);
        setTimeout(() => {
          setStatus(null);
          setMessage(null);
        }, 5000)
      })
    setPersons(persons.filter(person => person.id !== id));
  }

  return (!filtering 
    ? persons.map((person) => <div key={person.id}>{person.name} {person.number} <button type="submit" onClick={() => {if(confirm(`Delete ${person.name} ?`))deleteContact(person.id)}}>delete</button></div>)
    : persons.filter((person) => person.name.toLowerCase().includes(filtering.toLowerCase())).map((person) => <div key={person.id}>{person.name} {person.number} <button type="submit" onClick={deleteContact}>delete</button></div>)
  )
}

export default Persons;