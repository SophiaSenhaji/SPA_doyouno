import React from 'React';
import Home from './index.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Header component', () => {
    const animals = [
        {
            _id: 'id',
            species: 'Cat',
            receptionDate: '2019-02-05',
            description: 'description'
        },
        {
            _id: 'id',
            species: 'Dog',
            receptionDate: '2019-02-05',
            description: 'description2'
        },
    ]
    it('should render correctly', () => {
        const wrapper = shallow(<Home />);
        wrapper.setState({ animals })
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with isSearchOpened === true', () => {
        const wrapper = shallow(<Home />);
        wrapper.setState({ animals, isSearchOpened: true })
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
