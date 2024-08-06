import express from "express";

const app = express();
app.use(express.json());

app.get("/hello", (req: express.Request, res: express.Response) => {
  res.status(200).send(`<h1>Hello from express!</h1>`);
});

interface UserData {
  name: string;
}

class User implements UserData {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

const users: Array<User> = [
  { id: "1", name: "Abhiroop" },
  { id: "2", name: "Rashmi" },
  { id: "3", name: "Debraj" },
  { id: "4", name: "Madhu" },
];

app.get("/users", (req: express.Request, res: express.Response) => {
  //load user data from database
  res.status(200).type("application/json").send(users);
});

app.get("/users/:id", (req: express.Request, res: express.Response) => {
  //load user data from database
  res
    .status(200)
    .type("application/json")
    .send(users.filter((user: User) => user.id === req.params.id));
});

app.post("/users", (req: express.Request, res: express.Response) => {
  const newUserData: UserData = req.body;
  const newUser = new User((users.length + 1).toString(), newUserData.name);
  users.push(newUser);

  res.status(201).type("text/plain").send(newUser.id);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
