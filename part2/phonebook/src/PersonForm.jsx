const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addContact}) => {
  return (<form>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit" onClick={addContact}>add</button>
    </div>
  </form>)
}

export default PersonForm;