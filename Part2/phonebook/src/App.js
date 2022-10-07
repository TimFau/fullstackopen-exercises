import { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilterChange = (event) => setNameFilter(event.target.value.toLowerCase())

  const addPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.find(person => person.name === newName) !== undefined
    if (!newName || !newNumber) {
      alert('Please enter a name and number')
    } else if (alreadyExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      let newPersonObject = {name: newName, number: newNumber}
      personsService.createPerson(newPersonObject)
      setPersons(persons.concat(newPersonObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (event, name, id) => {
    event.preventDefault()
    let confirmMsg = `Delete ${name} ?`
    let index = persons.map(person => person.id).indexOf(id)
    let newPersonsArray = [...persons]
    if (window.confirm(confirmMsg)) {
        newPersonsArray.splice(index, 1)
        personsService.deletePerson(id)
        setPersons(newPersonsArray)
    }
  }

  useEffect(() => {
    personsService
      .getPersons()
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
        window.persons = response.data
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange} />

      <h2>Add a new person</h2>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App