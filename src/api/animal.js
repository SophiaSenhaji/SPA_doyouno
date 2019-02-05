const apiURL = 'http://localhost:8000/animals';
const searchURL = 'http://localhost:8000/search'

export const getAnimals = async () => {
    let animals = await fetch(apiURL);
    return await animals.json();
}

export const addOrUpdateAnimal = async animal => {
    const result = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    });
    return await result.json()
}

export const getAnimalById = async (id = '') => {
    let response = await fetch(`${apiURL}/${id}`);
    const animal = await response.json();
    return Object.keys(animal).length > 0 ? animal : null;
}

export const getAnimalByRfid = async (id = '') => {
    let response = await fetch(`${searchURL}/${id}`);
    const animal = await response.json();
    return Object.keys(animal).length > 0 ? animal : null;
}