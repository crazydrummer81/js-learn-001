import {createStore, bindActionCreators} from 'redux';
import * as actions from './actions';
import reducer from './reducer';

// STORE
const store = createStore(reducer);
const {dispatch, getState, subscribe} = store;

// const bindActionCreator = (creator, dispatch) => (...args) => {
// 	dispatch(creator());
// }

const {incDispatch, decDispatch, rndDispatch} = bindActionCreators({
		incDispatch: inc,
		decDispatch: dec,
		rndDispatch: rnd
	}, dispatch);
// const incDispatch = bindActionCreators(inc, dispatch);
// const decDispatch = bindActionCreators(dec, dispatch);
// const rndDispatch = bindActionCreators(rnd, dispatch);

document.getElementById('inc').addEventListener('click', incDispatch);
document.getElementById('dec').addEventListener('click', decDispatch);
document.getElementById('rnd').addEventListener('click', rndDispatch);

const update = () => {
	document.getElementById('counter').textContent = getState();
}


subscribe(() => {
	update();
});

// dispatch({type: 'INC'});
// dispatch({type: 'INC'});
// dispatch({type: 'INC'});
