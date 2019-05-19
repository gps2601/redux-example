import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import {connect} from 'react-redux';

class Persons extends Component {
    personAddedHandler = () => {
        console.log(this.props.persons);
        const newPerson = {
            id: Math.random(),
            name: 'Geoff',
            age: Math.floor( Math.random() * 40 )
        }
        this.props.onSubmitPerson(newPerson);
    }
    
    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}
                        />
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitPerson: (person) => dispatch({type: 'ADD_PERSON', person: person}),
        onDeletePerson: (id) => dispatch({type: 'DELETE_PERSON', id: id})

    }
};

const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);