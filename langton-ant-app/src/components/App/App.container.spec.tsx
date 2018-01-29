import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper, mount, } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';
import { Ant } from './Grid';
import { PLAY } from '../../store/actions';
import { Action } from 'redux';
import { AvPlayArrow } from 'material-ui/svg-icons';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<App />, { context: { store, router: { } } });
        expect(container.length).toEqual(1);
    });

    test('map Dispatch to onClic prop', async () => {
        store.dispatch = jest.fn();
        // tslint:disable-next-line:max-line-length
        const wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter></Provider>);
        await wrapper.find(AvPlayArrow).simulate('click');
        expect(store.dispatch).toBeCalledWith({ type: PLAY} as Action);
    });
});