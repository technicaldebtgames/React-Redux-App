import React, {useEffect, useState, useRef} from 'react';
import {connect} from 'react-redux';
import {fetchDogs} from '../actions/actions';
import './Dogs.css';

const Dogs = props => {

    // the dog img url to use, changed below in the timer and initially when props.dogs loads
    const [aDog, setADog] = useState('');
    const requestNewDogs = useRef(true); // did we ever go over useRef? I don't remember.
    const dogCounter = useRef(0);

    // initial api call
    useEffect(() => {
        if(requestNewDogs.current === true){
            props.fetchDogs();
            console.log('initial fetchDogs');
            requestNewDogs.current = false;
        }
    }, [requestNewDogs.current]);

    // set initial selected dog once api call is finished
    useEffect(() => {
        if(props.dogs.length > 0) {
            setADog(props.dogs[dogCounter.current]);
            dogCounter.current = dogCounter.current + 1;
            console.log('set first dog when props populates');
        };
    }, [props.dogs]);

    // set a timer and change our selected dog, and when we reach the end, request a new set from api
    useEffect(() => {
        if(aDog){
            const timer = setTimeout(() => {
                setADog(props.dogs[dogCounter.current]);
                dogCounter.current = dogCounter.current + 1;
                console.log('set a new dog in timer');
                if(dogCounter.current === 50){ // figure out how to not make this suck
                    dogCounter.current = 0;
                    requestNewDogs.current = true;
                };
            }, 1000);
            return () => clearTimeout(timer); // clear the timer once it runs
        }
    }, [aDog]);

    return (
        <div className='dogs'>
            {props.isLoading && <h1>OMG WAIT I'M PUTTING A BUNCH OF DOGS INTO A SERIES OF TUBES AND IT'S HARD</h1>}
            {props.error && <h1>{props.error}</h1>}
            {props.dogs.length > 0 && (
                <div className='dog-wrapper'>
                    <img className='dog' src={aDog} alt='A dog, probably.'/>
                </div>
            )}
        </div>
    );

};

const mapStateToProps = state => {

    return {
        isLoading: state.isLoading,
        dogs: state.dogs,
        error: state.error
    };

};

export default connect(

    mapStateToProps,
    {fetchDogs}

)(Dogs);