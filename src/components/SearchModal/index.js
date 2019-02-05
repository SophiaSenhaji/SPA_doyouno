import React, { Component } from 'react';
import { getAnimalByRfid } from '../../api/animal';
import './index.css';

class SearchModal extends Component {
    constructor() {
        super()
        this.state = {
            value:'',
            error: ''
        }
    }

    onInputChange = event => {
        this.setState({ value: event.target.value, error: '' })
    }

    onButtonClick = async () => {
        const { onFound } = this.props;
        const { value } = this.state;

        if (!value) return this.setState({ error: 'You must type the RFID value' });
        const response = await getAnimalByRfid(value);

        if (response.message) return this.setState({ error: response.message });
        if (response) {
            if (onFound) onFound(response);
        }
    }

    onClose = () => {
        const { onClose } = this.props;
        if (onClose) onClose();
    }

    render() {
        const { value, error } = this.state;
        return (
            <div className="SearchModal" onClick={this.onClose}>
                <div className="SearchModal__container" onClick={e => e.stopPropagation()}>
                    <div>Find by RFID chip number</div>
                    <div><input type="text" onChange={this.onInputChange} value={value} /></div>
                    <button className="SearchModal__button" onClick={this.onButtonClick}>Find</button>
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        )
    }
}

export default SearchModal;
