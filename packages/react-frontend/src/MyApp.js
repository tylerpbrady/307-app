import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [];


function MyApp() {
    const [characters, setCharacters] = useState ([]);

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
      }, [] );

    function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    });

    return promise;
    }

    function removeOneCharacter(index) {
        // const updated = characters.filter((character, i) => {
        //     return i !== index;
        // });
        // setCharacters(updated);

        const charId = characters[index]._id;
        fetch(`Http://localhost:8000/users/${charId}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.status === 204) {
                const updated = characters.filter((character, i) => {
                    return i !== index;

                });
                setCharacters(updated);
            } else {
                console.error("Failed to delete");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    function updateList(person) { 
        postUser(person)
          .then((response) => {
              if (response.status === 201) {
                return response.json();  
                //   setCharacters([...characters, person])
              } else {
                console.error("Failed to create user.");  
              }
          })
          .then((newUser) => {
              setCharacters([...characters, newUser]);
          })
          .catch((error) => {
            console.log(error);
          })
    }


    return (
      <div className="container">
        <Table 
            characterData = {characters}
            removeCharacter = {removeOneCharacter}
            characterId = {characters._id}
        />
        <Form handleSubmit = {updateList}/>
      </div>
    );
}


export default MyApp;