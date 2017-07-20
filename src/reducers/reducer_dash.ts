import { ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, FETCH_ADDRESS, FETCH_ADDRESSES } from '../actions/index';
import { addAddress, editAddress, deleteAddress, fetchAddress, fetchAddresses, IAction } from '../actions';

const INITIAL_STATE = {
    addresses: []
};

export default function(state = INITIAL_STATE, action: IAction) {
    switch (action.type) {

        case ADD_ADDRESS: {
            const addresses = [...state.addresses, action.payload];
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

        case FETCH_ADDRESS: {
            const { data } = action.payload;
            return {...state };
        }

        case FETCH_ADDRESSES: {
            const addresses = action.payload;
            return {...state, addresses };
        }

        default:
            return state;
    }
}
