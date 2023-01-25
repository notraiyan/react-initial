import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SmallModal from './SmallModal';
import axios from "axios";

function MyModal({data}) {
    const [modal, setModal] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [search, setSearch] = useState("");
    const [contact, setContact] = useState();
    const [filteredData, setFilteredData] = useState(data);
    const toggle = () => setModal(!modal);
    const navigate = useNavigate();
    useEffect(() => {
        if (isChecked) {
            setFilteredData(data.filter((contact) => Number(contact.id) % 2 === 0));
        } else {
            setFilteredData(data);
        }
    }, [isChecked, data]);

    const handleSearch = () => {
        axios.get(`https://contact.mediusware.com/api/contacts/${search ? "?search=" + search : ""}`)
            .then(res => {
                setFilteredData(res.data.results);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

  return (
    <div>
        {openModal && 
            <SmallModal toggle={setOpenModal} contact={contact} modal={openModal} />
            }
      <Modal isOpen={modal} toggle={() => navigate("/problem-2")} >
        <ModalHeader toggle={() => navigate("/problem-2")}>Contacts</ModalHeader>
        <ModalBody>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((contact) => (
                        <tr key={contact.id} onClick={() => {setOpenModal(!openModal); setContact(contact);}}>
                            <td>{contact.id}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.country.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ModalBody>
        <ModalFooter>
        <Button className="btnA" onClick={() => navigate("/all-contacts")}>
            All Contacts
          </Button>
          <Button className="btnB" onClick={() => navigate("/us-contacts")}>
            US Contacts
          </Button>
          <Button className="btnC" onClick={() => navigate("/problem-2")}>
            Cancel
          </Button>
          <input type="checkbox" onClick={() => setIsChecked(!isChecked)} value={isChecked} />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MyModal;
