import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getAnimals } from '../../../api/animal';
import Header from '../../Header';
import SearchModal from '../../SearchModal/index';
import './index.css'
import { getDateString } from '../../../utils/date';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            animals: [],
            isSearchOpened: false
        };
    }

    async componentDidMount() {
        const animals = await getAnimals();
        this.setState({
            animals
        })
    }

    onSearchClick = () => {
        this.setState({
            isSearchOpened: true
        })
    }

    onModalFound = animal => {
        const { history } = this.props;
        this.setState({
            isSearchOpened: false
        })

        history.push('/animal/' + animal._id)
    }

    onModalClose = () => {
        this.setState({
            isSearchOpened: false
        })
    }

    render() {
        const { animals, isSearchOpened } = this.state;

        return (
            <div className="Home">
                <Header withSearch withAdd onSearchClick={this.onSearchClick}/>
                {animals.map(animal => (
                    <Link className="Animal" key={animal._id} to={`/animal/${animal._id}`}>
                        <div  className="Animal__infos">
                            <div className="Animal__species">{animal.species}</div>
                            <div className="Animal__receptionDate">{getDateString(animal.receptionDate)}</div>
                        </div>
                        <div className="Animal__description">{animal.description}</div>
                    </Link>
                ))}
                {isSearchOpened && (
                    <SearchModal onFound={this.onModalFound} onClose={this.onModalClose} />
                )}
            </div>
        )
    }
}

export default Home;