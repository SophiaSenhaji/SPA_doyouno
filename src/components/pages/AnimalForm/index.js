import React, { Component } from 'react';
import { addOrUpdateAnimal, getAnimalById } from '../../../api/animal';
import Header from '../../Header';
import { getDate, getDateString } from '../../../utils/date';

const date = new Date();

const defaultState = {
    rfidNumber: '',
    species: 'Cat',
    race: '',
    height: '',
    weight: '',
    description: '',
    receptionDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    birthDate: '',
    error: null
};
class AnimalForm extends Component {
    constructor() {
        super();
        const date = new Date();

        this.state = defaultState;
    }

    onInputChange = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value
        })
    }

    validateForm = () => {
        const {
            rfidNumber,
            species,
            race,
            height,
            weight,
            description,
            receptionDate,
            birthDate
        } = this.state;
        const rfidRegex = new RegExp(/.{5}/)

        if (rfidNumber && !rfidRegex.test(rfidNumber)) return { message: 'Invalid rfidNumber (must be 5 characters)', property: 'rfidNumber' };
        if (!species) return { message: 'Invalid species', property: 'species' };
        if (isNaN(height) || !height || height < 0) return { message: 'Invalid height', property: 'height' };
        if (isNaN(weight) || !weight || weight < 0) return { message: 'Invalid weight', property: 'weight' };
        if (!description) return { message: 'Invalid description', property: 'description' };
        if (isNaN(getDate(receptionDate))) return { message: 'Invalid receptionDate', property: 'receptionDate' };
        if (birthDate && isNaN(getDate(birthDate))) return { message: 'Invalid birthDate', property: 'birthDate' };
        if (birthDate && birthDate > receptionDate) return { message: 'Birth date cannot be after reception date', property: 'receptionDate' };
    }

    onSubmit = async () => {   
        const { history } = this.props;    
        const {
            rfidNumber,
            species,
            race,
            height,
            weight,
            description,
            receptionDate,
            birthDate,
            id
        } = this.state;

        const animal = {
            id: this.state.id || undefined,
            rfidNumber: rfidNumber || undefined,
            species,
            race: race || undefined,
            height,
            weight,
            description,
            receptionDate,
            birthDate: birthDate || undefined
        }

        const error = this.validateForm();
        if (error) {
            this.setState({ error });
            return;
        }
        
        this.setState({ error: null });

        const result = await addOrUpdateAnimal(animal);
        if (result.message) {
            this.setState({ error: result });
            return;
        }

        history.push('/')

    }

    async componentDidMount() {
        const { match } = this.props;

        if (match.params.id) {
            const animal = await getAnimalById(match.params.id);
            this.setState({
                ...defaultState,
                ...animal,
                receptionDate: getDateString(animal.receptionDate),
                id: match.params.id
            });
        }

    }

    render() {
        const {
            rfidNumber,
            species,
            race,
            height,
            weight,
            description,
            receptionDate,
            birthDate,
            id,
            error
        } = this.state;
        return (
            <div className="AnimalForm">
                <Header withBack />
                <input placeholder="RFID number" type="text" onChange={this.onInputChange('rfidNumber')} value={rfidNumber || ''} />
                <select onChange={this.onInputChange('species')} value={species}>
                    <option>Cat</option>
                    <option>Dog</option>
                </select>
                <input placeholder="Race" type="text" onChange={this.onInputChange('race')} value={race || ''}/>
                <textarea placeholder="Description" onChange={this.onInputChange('description')} value={description}></textarea>
                <input placeholder="Weight" type="number" onChange={this.onInputChange('weight')} value={weight} />
                <input placeholder="Height" type="number" onChange={this.onInputChange('height')} value={height} />
                <input placeholder="Reception date (aaaa-mm-dd)" type="text" onChange={this.onInputChange('receptionDate')} value={receptionDate} />
                <input placeholder="Birth date (aaaa-mm-dd)" type="text" onChange={this.onInputChange('birthDate')} value={birthDate || ''} />
                {!id && <button onClick={this.onSubmit}>Add</button>}
                {id && <button onClick={this.onSubmit}>Edit</button>}
                {error && <div className="error">{error.message}</div>}
            </div>
        )
    }
}

export default AnimalForm;