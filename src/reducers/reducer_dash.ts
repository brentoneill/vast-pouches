import { ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, FETCH_ADDRESSES } from '../actions/index';
import { addAddress, editAddress, deleteAddress, fetchAddresses, IAction, IAddress } from '../actions';

const INITIAL_STATE = {
    addresses: []
};

export interface IDashReducerState {
    addresses: IAddress[];
}

export default function(state = INITIAL_STATE as IDashReducerState, action: IAction) {
    switch (action.type) {

        case ADD_ADDRESS: {
            const addresses = [...state.addresses, action.payload.data.data];
            return {...state, addresses};
        }

        case EDIT_ADDRESS: {
            let addresses = state.addresses.filter(address => address.id !== action.payload.id);
            addresses.push(action.payload);
            return {...state, addresses};
        }

        case DELETE_ADDRESS: {
            const addresses = state.addresses.filter(address => address.id !== action.payload.id);
            return {...state, addresses};
        }

        case FETCH_ADDRESSES: {
            const addresses = action.payload.data ? action.payload.data.data : [];
            return {...state, addresses };
        }

        default:
            return state;
    }
}
