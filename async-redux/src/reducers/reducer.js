import {FETCH_DOGS_START, FETCH_DOGS_SUCCESS, FETCH_DOGS_FAILURE} from '../actions/actions';

const initialState = {
    isLoading: false,
    dogs: [],
    error: ''
};

export const reducer = (state = initialState, action) => {

    switch(action.type) {

        case FETCH_DOGS_START:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_DOGS_SUCCESS:
            return {
                isLoading: false,
                dogs: action.payload,
                error: ''
            };
        case FETCH_DOGS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;

    };

};