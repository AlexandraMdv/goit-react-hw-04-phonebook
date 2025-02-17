import styles from './ContactForm.module.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    }

    handleChange = (ev) => {
        const {name, value} = ev.target;
        this.setState({ [name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();        

        this.props.onSubmit({id: nanoid(), name: this.state.name, number: this.state.number
        })
        this.setState({name: '', number: ''})
    }
    
    render() {
        const {name, number} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={styles.addPhonebookForm}>
                <label htmlFor='name' className={styles.label}>
                    <span className={styles.labelTitle}>Name</span>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter full name"
                        value={name}
                        pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        onChange={this.handleChange}
                        required 
                    />
                </label>

                <label htmlFor='number' className={styles.label}>
                    <span className={styles.labelTitle}>Phone Number</span>
                    <input
                        type="tel"
                        name="number"
                        id="number"
                        placeholder="Enter phone number"
                        value={number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        onChange={this.handleChange}
                        required
                    ></input>
                </label>
    
                <button type="submit">Add contact</button>
            </form>
        )
    } 
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;