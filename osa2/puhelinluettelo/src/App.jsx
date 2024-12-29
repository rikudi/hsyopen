import { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'
import Notification from './components/Notification'
import './App.css'

// Main App component
const App = () => {
  // State variables
  const [persons, setPersons] = useState([]) // List of persons
  const [newName, setNewName] = useState('') // New name input
  const [newNum, setNewNum] = useState('') // New number input
  const [filterText, setFilterText] = useState('') // Filter text input
  const [notification, setNotification] = useState(null) // Notification message

  // Fetch initial data from the server when the component is rendered for the first time
  useEffect(() => {
    console.log('fetching initial data')
    personService.getAll()
      .then(response => {
        setPersons(response.data)
        console.log('data fetched:', response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        alert('Failed to fetch data from server. Please try again later.')
      })
  }, [])

  // Event handler for name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Event handler for number input change
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  // Event handler for filter text input change
  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  // Event handler for deleting a person
  const handleDelete = (id) => {
    console.log('delete id:', id)
    const person = persons.find(person => person.id === id)
    console.log('person:', person)
    if (!person) {
      showNotification('Person not found', 'error')
      return
    }
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          console.log('person deleted:', id)
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          showNotification(
            `Information of ${person.name} has already been removed from server`, 
            'error'
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // Event handler for form submission
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
      number: newNum
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
        showNotification(`Added ${response.data.name}`, 'success')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        showNotification(error.response?.data?.error || 'Failed to add person to server', 'error')
      })
  }

  // Function to update a person's information
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
        showNotification(error.response?.data?.error || `Information of ${newPerson.name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  // Function to show notification messages
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, type === 'success' ? 2000 : 5000) // 2 seconds for success, 5 seconds for error
  }

  // Filter persons based on the filter text
  const personsToShow = filterText
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : persons

  // Render the component
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