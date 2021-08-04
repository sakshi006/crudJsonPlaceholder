import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import EditContact from "./EditContact";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  };

  const addContactHandler = async (contact) => {
    // console.log(contact, "CONTACT_ADD_HANDLER");
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      request
    );
    // console.log(response, "POST REQ");
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${contact.id}`,
      contact
    );
    const { id } = response.data;

    // console.log(response.data, "PUT REQ");
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) {
        setContacts(allContacts);
        setIsLoading(false);
      }
    };

    getAllCOntacts();
  }, []);

  useEffect(() => {}, [contacts]);
  return (
    <div className="ui container">
      {isLoading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <Router>
          <Header />

          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <ContactList
                  {...props}
                  contacts={contacts}
                  getContactId={removeContactHandler}
                />
              )}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddContact {...props} addContactHandler={addContactHandler} />
              )}
            />

            <Route
              path="/edit"
              render={(props) => (
                <EditContact
                  {...props}
                  updateContactHandler={updateContactHandler}
                />
              )}
            />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
