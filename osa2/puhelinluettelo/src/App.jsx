import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'
import Notification from './components/Notification' // Import Notification component

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState(null) // Add notification state

  // The useEffect hook is used to fetch the initial data from the server when the component is rendered for the first time.
  useEffect(() => {
    console.log('fetching initial data')
    personService.getAll()
      .then(response => {
        setPersons(response.data)
        console.log('data fetched:', response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        alert('Failed to fetch data from server. Is json-server running?')
      })
  }, [])


  /* EVENT HANDLERS FOR NAME AND NUMBER INPUTS */ 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

// finds person id from persons array and deletes from db if successful
const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id)
        .then(response => {
          console.log('person deleted:', response)
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${person.name}`, 'error') // Use 'error' type for deletion
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          showNotification('Person already deleted from the server', 'error')
        })
    }
  }

 /* FORM HANDLER*/
  const handleSubmit = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNum }
        updatePerson(existingPerson.id, updatedPerson)
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNum,
      id: Math.floor(Math.random() * 1000).toString()
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
        showNotification(`Added ${personObject.name}`, 'success')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        showNotification('Failed to add person to server', 'error')
      })
  }

  const updatePerson = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .then(response => {
        setPersons(persons.map(person => 
          person.id === id ? response.data : person
        ))
        setNewName('')
        setNewNum('')
        showNotification(`Updated ${newPerson.name}`, 'success')
      })
      .catch(error => {
        console.error('Error updating person:', error)
        showNotification(`Information of ${newPerson.name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, type === 'success' ? 2000 : 5000) // 2 seconds for success, 5 seconds for error
  }


// The personsToShow variable is used to filter the persons array based on the filterText state.
  const personsToShow = filterText
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form 
        newName={newName}
        newNum={newNum}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        handleUpdate={updatePerson}
      />
      <h2>Numbers</h2>
      <Numbers persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App