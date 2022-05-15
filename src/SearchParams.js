import { useState, useEffect } from 'react';
import useBreedList from './useBreedList';
import Pet from './Pet';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [breeds] = useBreedList(animal);
    const [pets, setPets] = useState([]);

    // const petHook = useState([]);
    // const pets = petHook[0];
    // const setPets = petHook[1];

    // const { pet: state, setPet: setState } = useState("");

    useEffect(() => {
        requestPets();
    }, []);

    async function requestPets() {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
            );
        const json = await res.json();

        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location {location}
                    <input 
                        id="location" 
                        value={location} 
                        placeholder="Location" 
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        >
                         <option />
                         {ANIMALS.map((oneAnimal) => (
                                 <option key={oneAnimal} value={oneAnimal}>
                                     {oneAnimal}
                                 </option>
                             ))}   
                        </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e) => {
                            setBreed(e.target.value);
                        }}
                        onBlur={(e) => {
                            setBreed(e.target.value);
                        }}
                        >
                         <option />
                         {breeds.map((allBreed) => (
                                 <option key={allBreed} value={allBreed}>
                                     {allBreed}
                                 </option>
                             ))}   
                        </select>
                </label>
                <button>Submit</button>
            </form>
            {
                pets.map(pet => (
                    <Pet 
                        key={pet.id} 
                        name={pet.name} 
                        animal={pet.animal} 
                        breed={pet.breed} 
                    />
                ))
            }
        </div>
    );
};

export default SearchParams;