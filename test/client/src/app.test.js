import restaurant from '../../../restaurants_data_small.js';
import App from '../../../client/src/app.jsx';
import { InfoList } from '../../../client/src/infoList.jsx';
import { Map } from '../../../client/src/map.jsx';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {} from './enzyme_jsdom_setup.js';
import React from 'react';

enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('exists', () => {
    const wrapper = enzyme.mount(<App restaurant={restaurant.result}/>);
    expect(wrapper.find(App).length).toBe(1);
  });

  it('has a prop called restaurant which is an object', () => {
    const wrapper = enzyme.mount(<App restaurant={restaurant.result}/>);
    expect(typeof wrapper.props().restaurant).toBe('object');
  });

  it('has a <InfoList /> child', () => {
    const wrapper = enzyme.shallow(<App restaurant={restaurant.result}/>);
    expect(wrapper.find(InfoList).length).toBe(1);
  });

  it('has a <Map /> child', () => {
    const wrapper = enzyme.shallow(<App restaurant={restaurant.result}/>);
    expect(wrapper.find(Map).length).toBe(1);
  });
});
