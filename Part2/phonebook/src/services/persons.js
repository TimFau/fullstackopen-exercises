import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = (person) => {
    return axios.post(baseUrl, person)
}

const updatePerson = (id, person) => {
    let url = baseUrl + '/' + id
    return axios.put(url, person)
}

const deletePerson = (id) => {
    let url = baseUrl + '/' + id
    return axios.delete(url)
}

const persons = {
    getPersons,
    createPerson,
    updatePerson,
    deletePerson
}

export default persons