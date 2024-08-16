import express from "express";

const app = express();

app.get("/hello", (req: express.Request, res: express.Response) => {
    res.status(200).type("application/json").send('{"status": "success"}');
});

export { app };
