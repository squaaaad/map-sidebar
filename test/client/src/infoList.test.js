import restaurant from '../../../restaurants_data_small.js';
import { InfoList, InfoListElement } from '../../../client/src/infoList.jsx';
import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe('<InfoList />', () => {
  test('exists', () => {
    const wrapper = enzyme.mount(<InfoList restaurant={restaurant.result} />);
    expect(wrapper.find(InfoList).length).toBe(1);
  });

  test('has at least 3 InfoListElement components', () => {
    const wrapper = enzyme.mount(<InfoList restaurant={restaurant.result} />);
    expect(wrapper.find(InfoListElement).length).toBe(3);
  });
});
