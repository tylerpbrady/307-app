import express from "express";

const app = express();
const port = 8000;


const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => (user["name"] === name && user["job"] === job)
    );
};

  
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result};
        res.send(result);
    } else if (name != undefined && job == undefined) {
        let result = findUserByName(name);
        result = { users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result)
    }
});



// app.get("/users", (req, res) => {
//     const name = req.query.name;
//     const job = req.query.job;

//     if (name != undefined && job != undefined) {
//         let result = findUserByNameAndJob(name, job);
//         result = { users_list: result};
//         res.send(result);
//     } else {
//         res.send(users);
//     }
// });

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
});

const deleteUser = (id) => {
    // search for user and delete
    // 
    const idx = users["users_list"].findIndex((user) => user["id"] === id);
    if (idx === -1) {
        return false;
    } else {
        users["users_list"].splice(idx);
    }
}

app.delete("/users/:id", (req, res) => {
    // call deleteUser
    const result = deleteUser(req.params["id"]);
    if (result === 404) {
        res.status(404).send("User not found.");
    } else {
        res.status(200).send("User deleted successfully.");
    }
})

app.listen(port, () => {
  console.log(
      `Example app listening at http://localhost:${port}`
  );
});