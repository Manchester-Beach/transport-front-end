import React from 'react';
import { shallow } from 'enzyme';
import DashboardView from './DashboardView';
import Clock from '../../components/Clock/Clock';

it('renders a clock on the dashboard', () => {
  const wrapper = shallow(<DashboardView />);
  expect(wrapper.find(Clock)).toHaveLength(1);
});