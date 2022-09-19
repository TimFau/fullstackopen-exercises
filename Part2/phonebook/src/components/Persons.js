const Person = ({name, number}) => <div>{name} {number}</div>

export const Persons = ({persons = '', nameFilter}) => (
    persons.filter(
        person => person.name.toLowerCase().includes(nameFilter)
    ).map(
        person => <Person name={person.name} number={person.number} key={person.name} />
    )
)