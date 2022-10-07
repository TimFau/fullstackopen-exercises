const Person = ({name, number, id, deletePerson}) => (
    <div>
        <span>{name} {number}</span> <button onClick={event => deletePerson(event, name, id)}>Delete</button>
    </div>
)

export const Persons = ({persons = '', nameFilter, deletePerson}) => (
    persons.filter(
        person => person.name.toLowerCase().includes(nameFilter)
    ).map(
        person => <Person name={person.name} number={person.number} id={person.id} key={person.id} deletePerson={deletePerson} />
    )
)