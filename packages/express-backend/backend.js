import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;


// const users = {
//     users_list: [
//       {
//         id: "xyz789",
//         name: "Charlie",
//         job: "Janitor"
//       },
//       {
//         id: "abc123",
//         name: "Mac",
//         job: "Bouncer"
//       },
//       {
//         id: "ppp222",
//         name: "Mac",
//         job: "Professor"
//       },
//       {
//         id: "yat999",
//         name: "Dee",
//         job: "Aspring actress"
//       },
//       {
//         id: "zap555",
//         name: "Dennis",
//         job: "Bartender"
//       }
//     ]
//   };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// const findUserByName = (name) => {
//     return users["users_list"].filter(
//       (user) => user["name"] === name
//     );
//   };

// const findUserByNameAndJob = (name, job) => {
//     return users["users_list"].filter(
//         (user) => (user["name"] === name && user["job"] === job)
//     );
// };

  
// const findUserById = (id) =>
//     users["users_list"].find((user) => user["id"] === id);


// modified this one
app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined) {
      userServices.findUserByName(name)
        .then((userNames) => {
          const filtered = userNames.filter((user) => user.job === job);
          res.send({ users_list: filtered});
        })
        .catch((error) => {
          console.error("Couldn't find user");
          res.send(500).send("Internal error.");
        });
    } else {
        userServices.getUsers(name, job)
        .then((users) => {
          res.send({ users_list: users });
        })
        .catch((error) => {
          console.error("User not found.");
          res.status(500).send("Internal Error.");
        });
    }

    // if (name != undefined && job != undefined) {
    //     let result = findUserByNameAndJob(name, job);
    //     result = { users_list: result};
    //     res.send(result);
    // } else if (name != undefined && job == undefined) {
    //     let result = findUserByName(name);
    //     result = { users_list: result};
    //     res.send(result);
    // } else {
    //     res.send(users);
    // }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];

    userServices.findUserById(id)
      .then((result) => {
        if (result === undefined) {
          res.status(404).send("Resource not found.");
        } else {
          res.send(result);
        }
      })
      .catch((error) => {
        console.error("User not found.");
        res.status(500).send("Internal error.");
      });

    // let result = findUserById(id);
    // if (result === undefined) {
    //     res.status(404).send("Resource not found.");
    // } else {
    //     res.send(result)
    // }
});

// here
// const addUser = (user) => {
//     users["users_list"].push(user);
//     return user;
// };

// here
app.post("/users", (req, res) => {

    const userToAdd = req.body;

    userServices.addUser(userToAdd)
      .then((newUser) => {
        res.status(201).send(newUser);
      })
      .catch((error) => {
        console.error("Couldn't add user.");
        res.status(500).send("Internal Error.");
      })

    // const userToAdd = req.body;
    // const uniqueId = Math.random()
    // userToAdd.id = uniqueId;
    // addUser(userToAdd);
    // res.status(201).send(userToAdd);
});

// here
// const deleteUser = (id) => {
//     const idx = users["users_list"].findIndex((user) => user["id"] === id);
//     if (idx === -1) {
//         return false;
//     } else {
//         users["users_list"].splice(idx);
//     }
// }

// here
app.delete("/users/:id", (req, res) => {
    // call deleteUser

    const userId = req.params["id"]

    userServices.deleteUser(userId)
      .then((result) => {
        if (result === undefined) {
          res.status(404).send("Could not find user");
        } else {
          res.send();
        }
      })
      .catch((error) => {
        console.error("Could not delete user.");
        res.status(500).send("Internal error.");
      });

    // const result = deleteUser(req.params["id"]);
    // if (result === 404) {
    //     res.status(404).send("User not found.");
    // } else {
    //     res.status(204).send();
    // }
})

app.listen(port, () => {
  console.log(
      `Example app listening at http://localhost:${port}`
  );
});