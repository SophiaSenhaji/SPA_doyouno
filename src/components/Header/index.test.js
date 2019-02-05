import React from 'React';
import Header from './index.js';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Header component', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Header />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with withBack === true', () => {
        const wrapper = shallow(<Header withBack />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with withSearch === true', () => {
        const wrapper = shallow(<Header withSearch />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with withAdd === true', () => {
        const wrapper = shallow(<Header withAdd />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
