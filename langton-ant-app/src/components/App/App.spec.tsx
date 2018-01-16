import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow, mount, MountRendererProps } from 'enzyme';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import App from './App';
import Grid from './Grid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('[App]Step 2 : a grid and an ant', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('App component must contains header app bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  test('AppBar must have a default title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant');
  });

  test('AppBar must have a play buttone', () => {
    const {iconElementLeft} = shallow(<App />).find(AppBar).props();
    expect(iconElementLeft).toEqual(<IconButton><AvPlayArrow /></IconButton>);
  });

  test('AppBar s title can be defined', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langon Ant : First generation');
  });

  test('Must have the grid in a Card', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(Card).find(Grid).length).toBe(1);
  });
});

describe('[App]Step 3: first rules and component state', () => {
  test('Cells definition must be in state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Grid).props().cells).toBe(wrapper.state().cells);
  });

  test('Cells must be initiated with 21x21xfalse', () => {
    const wrapper = shallow(<App />);
    const cells = new Array<Array<boolean>>(21).fill(new Array<boolean>(21).fill(false));
    expect(wrapper.state().cells).toEqual(cells);
  });

  test('Ant must be in state', () => {
    const wrapper = mount(<App />, {context: {}} as MountRendererProps);
    expect(wrapper.find(Grid).props().ant).toBeDefined();
    expect(wrapper.find(Grid).props().ant).toBe(wrapper.state().ant);
  });
});