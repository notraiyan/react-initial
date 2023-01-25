import React, { useState, useEffect } from 'react';
import MyModal from './Modal.jsx';
import axios from "axios";

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        axios.get("https://contact.mediusware.com/api/contacts/")
            .then(res => {
                setContacts(res.data.results);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])
    return (
        <>  
            <MyModal data={contacts} />
        </>
    );
};

export default AllContacts;