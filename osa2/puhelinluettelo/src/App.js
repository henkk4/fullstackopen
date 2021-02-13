import React, { useState, useEffect } from 'react'
import personService from './services/persons'



const App = () => {
  // Hooks
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ filter, setFilter ] = useState('')

  const [message, setMessage] = useState(null)

  const [wasError, setError] = useState(false)

  useEffect(() => {
      personService
      .getAll()
      .then(response => {
          console.log("promise fulfilled")
          setPersons(response)
      })
  }, [])

  // Eventhadlers
  const handleFilter = (event) => {
    console.log(event.target.value)
      setFilter(event.target.value)
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const addName = (event) => {
      event.preventDefault()
      const nameObject = {
          name: newName,
          number: newNumber
      }
      const names = persons.map(one => one.name)
      if (names.indexOf(newName) === -1) {
        personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('') 
          setMessage(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      }
      else {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              const id = persons.find(person => person.name === newName).id
              console.log(id)
              personService
              .update(id, nameObject)
              .then(response => {
                setPersons(persons.map(person => person.id !== id ? person : response))
                setMessage(
                  `Changed ${nameObject.name}'s number`
                )
                setTimeout(() => {
                  setMessage(null)
                }, 4000)
              })
              .catch(error => {
                setError(true)
                setMessage(
                  `Information of ${nameObject.name} has already been removed from server`
                )
                setTimeout(() => {
                  setMessage(null)
                  setError(false)
                }, 4000)
              })
          }
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} error={wasError} />
        <Filter value={filter} onChange={handleFilter} />
      <h2>add a new</h2>
        <PersonForm onSubmit={addName} newName={newName} handleNewName={handleNewName}
                    newNumber={newNumber} handleNewNumber={handleNewNumber}
        />
      <h2>Numbers</h2>
        <Names persons={persons} filter={filter} setPersons={setPersons}
               setMessage={setMessage}/>
    </div>
  )

}

const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.value}
                                     onChange={props.onChange} />
        </div>
    )
}

const Names = ({persons, filter, setPersons, setMessage}) => {
    // Handle delete
    const handleDelete = (id, name) => {
      if(window.confirm(`Delete ${name}?`)) {
        personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
      }
      
    }

    // This returns filtered array
    const namesFiltered = () => {
        const filtered = persons.filter(person => 
            person.name.toLowerCase().indexOf(filter.toLowerCase()) != -1)
        return filtered
    }

    return (
        <div>
            {namesFiltered().map((onePerson, i) => 
                <div key={i}> 
                    {onePerson.name + " " + onePerson.number}
                    <button onClick={() => handleDelete(onePerson.id, onePerson.name)}>Delete</button> 
                </div>)}
        </div>
    )
}

const PersonForm = (props) => {
    return (
        <div>
           <form onSubmit={props.onSubmit}>
            <div>
              name: <input value={props.newName}
                           onChange={props.handleNewName} />
            </div>
            <div>
              number: <input value={props.newNumber}
                             onChange={props.handleNewNumber} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form> 
        </div>
        
    )
}

const Notification = ({ message, error}) => {
  if (message === null) {
    return null
  }
  if (error) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default App