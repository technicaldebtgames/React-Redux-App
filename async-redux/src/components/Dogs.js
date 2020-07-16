import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchDogs} from '../actions/actions';
import './Dogs.css';

const Dogs = props => {

    // the dog img url to use, changed below in the timer and initially when props.dogs loads
    const [aDog, setADog] = useState('');
    const [requestNewDogs, setRequestNewDogs] = useState(true);

    // initial api call
    useEffect(() => {
        if(requestNewDogs){
            props.fetchDogs();
            console.log('initial fetchDogs');
            setRequestNewDogs(false);
        }
    }, [requestNewDogs]);

    // set initial selected dog once api call is finished
    useEffect(() => {
        if(props.dogs.length > 0) {
            setADog(props.dogs[Math.floor(Math.random() * 50)]);
            console.log('set first dog when props populates');
        };
    }, [props.dogs]);

    // set a timer and change our selected dog
    useEffect(() => {
        if(aDog){
            const timer = setTimeout(() => {
                let newDog = props.dogs[Math.floor(Math.random() * 50)];
                while (newDog === aDog) {
                    newDog = props.dogs[Math.floor(Math.random() * 50)];
                };
                setADog(newDog);
                console.log('set a new dog in timer');
            }, 5000);
            return () => clearTimeout(timer);
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