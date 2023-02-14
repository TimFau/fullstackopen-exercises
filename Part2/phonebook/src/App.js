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
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilterChange = (event) => setNameFilter(event.target.value.toLowerCase())
  const handleSetMessage = (msg, type) => {
    setMessageType(type)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const Notification = ({msg, type}) => {
    if (msg === null) {
      return null
    }

    return (
      <div className={`notification ${type}`}>
        {msg}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    let newPersonsArray = [...persons],
        newPersonObject = {name: newName, number: newNumber}
    const nameAlreadyExists = persons.find(person => person.name === newName) !== undefined,
          confirmChangeNumberMsg = `${newName} is already added to the phonebook, replace the older number with a new one?`
    if (!newName || !newNumber) {
      alert('Please enter a name and number')
    } else {
      if (nameAlreadyExists && window.confirm(confirmChangeNumberMsg)) {
        const index = persons.map(person => person.name).indexOf(newName),
              id = persons[index].id
        personsService.updatePerson(id, newPersonObject).catch(error => {
          console.log('error', error)
          handleSetMessage(`Information of ${newName} has already been removed from the server`, 'error')
        })
        newPersonsArray[index].number = newNumber
      } else {
        personsService.createPerson(newPersonObject).then(createdPerson => {
          // console.log('createdPerson', createdPerson)
          newPersonObject.id = newPersonsArray[newPersonsArray.length - 1].id + 1
          newPersonsArray = newPersonsArray.concat(newPersonObject)
          handleSetMessage(`${newName} was added`, 'success')
          setPersons(newPersonsArray)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log(error)
          handleSetMessage(error.response.data.error, 'error')
        })
      }
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
      <Notification msg={message} type={messageType} />

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