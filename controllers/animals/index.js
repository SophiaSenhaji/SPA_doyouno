const Animal = require('../../schema/schemaAnimal');

const getDate = dateString => {
    const [year, month, day] = dateString.split(/-/g);
    const newDate = new Date(year, month - 1, day);
    return newDate instanceof Date ? newDate.valueOf() : Date.now();
}

const getAnimalById = (req, res) => {
    const id = req.params.id;
    Animal.findById(id, (error, animal) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(animal);
    })
}

const getAnimalByRfid = (req, res) => {
    const id = req.params.id;
    Animal.findOne({ rfidNumber: id }, (error, animal) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        if (!animal) {
            res.status(404).json({ message: 'RFID number not found' })
            return;
        }
        res.json(animal);
    })
}

const getAnimals = (req, res) => {
    Animal.find({}, (error, animals) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(animals)
    }).sort({ receptionDate: 'asc' })
}

const validateAnimal = (animal) => {
    if (!animal) return { message: 'Invalid form data' };
    const rfidRegex = new RegExp(/.{5}/)
    const {
        rfidNumber,
        species,
        height,
        weight,
        description,
        receptionDate,
        birthDate
    } = animal;

    if (rfidNumber && !rfidRegex.test(rfidNumber)) return { message: 'Invalid rfidNumber', property: 'rfidNumber' };
    if (!species) return { message: 'Invalid species', property: 'species' };
    if (Number.isNaN(height) || !height || height < 0) return { message: 'Invalid height', property: 'height' };
    if (Number.isNaN(weight) || !weight || weight < 0) return { message: 'Invalid weight', property: 'weight' };
    if (!description) return { message: 'Invalid description', property: 'description' };
    if (Number.isNaN(getDate(receptionDate))) return { message: 'Invalid receptionDate', property: 'receptionDate' };
    if (birthDate && Number.isNaN(getDate(birthDate))) return { message: 'Invalid birthDate', property: 'birthDate' };
    if (birthDate && getDate(birthDate) > getDate(receptionDate)) return { message: 'Birth date cannot be after reception date', property: 'receptionDate' };
}

/**
 * If the animal has an id, checks it, then adds the animal or updates it
 */
const createOrUpdateAnimal = (req, res) => {
    const animal = req.body;
    const error = validateAnimal(animal);
    if (error) {
        res.status(403).json(error);
        return;
    }
    const {
        receptionDate,
        birthDate,
        id,
        rfidNumber
    } = animal;

    const result = {
        ...animal,
        receptionDate: getDate(receptionDate),
        birthDate: birthDate ? getDate(birthDate) : undefined
    };

    if (!rfidNumber) delete result.rfidNumber

    if (id) {
        Animal.findByIdAndUpdate(id, result, () => res.json(result))
    } else {
        // if rfid is set, check if an animal already has it (to avoid duplicate rfids) then create it (could not set rfidNumber as unique in the schema because it's not required)
        if (result.rfidNumber) {
            Animal.findOne({ rfidNumber: result.rfidNumber }, (error, animal) => {
                if (!animal) Animal.create(result, () => res.json(result))
                else {
                    res.status(403).json({ message: 'RFID already used', property: 'rfidNumber' });
                    return;
                }   
            })
        } else {
            Animal.create(result, () => res.json(result))
        }
    }

}

module.exports = { getAnimalById, getAnimals, createOrUpdateAnimal, getAnimalByRfid };