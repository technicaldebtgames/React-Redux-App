import axios from 'axios';

// action values
export const FETCH_DOGS_START = 'FETCH_DOGS_START';
export const FETCH_DOGS_SUCCESS = 'FETCH_DOGS_SUCCESS';
export const FETCH_DOGS_FAILURE = 'FETCH_DOGS_FAILURE';

export const fetchDogs = () => {

    return dispatch => {

        dispatch({type: FETCH_DOGS_START});

        axios.get('https://dog.ceo/api/breeds/image/random/50')
             .then(response => {
                 dispatch({type: FETCH_DOGS_SUCCESS, payload: response.data.message});
             })
             .catch(error => {
                 dispatch({type: FETCH_DOGS_FAILURE, payload: error.message});
             });

    };

};