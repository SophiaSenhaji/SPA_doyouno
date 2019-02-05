import React from 'react';
import { shallow } from 'enzyme';
import AnimalForm from './index.js';
import toJson from 'enzyme-to-json';

describe('AnimalForm component', () => {
    const props = {
        match: {
            params: {}
        }
    };
    describe('validateForm', () => {
        it('should return an error if rfidNumber is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: 'ezd' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid rfidNumber (must be 5 characters)', property: 'rfidNumber' })
        })
    })
    describe('validateForm', () => {
        it('should return an error if species is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: undefined });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid species', property: 'species' })
        })
        it('should return an error if height is not a number', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 'height' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid height', property: 'height' })
        })
        it('should return an error if height is 0', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 0 });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid height', property: 'height' })
        })
        it('should return an error if height < 0', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: -1 });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid height', property: 'height' })
        })
        it('should return an error if weight is not a number', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 'weight' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid weight', property: 'weight' })
        })
        it('should return an error if weight is 0', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 0 });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid weight', property: 'weight' })
        })
        it('should return an error if weight < 0', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: -1 });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid weight', property: 'weight' })
        })
        it('should return an error if description is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: undefined });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid description', property: 'description' })
        })
        it('should return an error if description is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: 'receptionDate' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid receptionDate', property: 'receptionDate' })
        })
        it('should return an error if description is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: '2019-02-05', birthDate: 'test' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Invalid birthDate', property: 'birthDate' })
        })
        it('should return an error if rfidNumber is invalid', () => {
            const wrapper = shallow(<AnimalForm {...props} />);
            wrapper.setState({ rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: '2019-02-05', birthDate: '2019-02-06' });
            const error = wrapper.instance().validateForm();
            expect(error).toEqual({ message: 'Birth date cannot be after reception date', property: 'receptionDate' })
        })
    })

    describe('render method', () => {
        it('should render correctly', () => {
            const fullProps = { ...props, rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: '2019-02-06', birthDate: '2019-02-05' };
            const wrapper = shallow(<AnimalForm {...fullProps} />);
            expect(toJson(wrapper)).toMatchSnapshot();
        })
        it('should render correctly with id', () => {
            const fullProps = { ...props, rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: '2019-02-06', birthDate: '2019-02-05' };
            const wrapper = shallow(<AnimalForm {...fullProps} id="id" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        })
        it('should render correctly with error', () => {
            const fullProps = { ...props, rfidNumber: '12345', species: 'Dog', height: 3, weight: 3, description: 'description', receptionDate: '2019-02-06', birthDate: '2019-02-05' };
            const wrapper = shallow(<AnimalForm {...fullProps} error="error" />);
            expect(toJson(wrapper)).toMatchSnapshot();
        })
    })
})