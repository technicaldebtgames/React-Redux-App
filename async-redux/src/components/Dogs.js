import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchDogs} from '../actions/actions';
import './Dogs.css';

const Dogs = props => {



    useEffect(() => {
        props.fetchDogs();
    }, []);

    return (
        <div className='dogs'>
            {props.isLoading && <h1>OMG WAIT I'M PUTTING A BUNCH OF DOGS INTO A SERIES OF TUBES AND IT'S HARD</h1>} {/* Maybe put loading and error in app instead */}
            {props.error && <h1>{props.error}</h1>}
            {props.dogs.length > 0 && (
                <div className='dog'>
                    {props.dogs.map(dog => {
                        return <img key={dog} src={dog} alt='A dog, probably.'/>
                    })}
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