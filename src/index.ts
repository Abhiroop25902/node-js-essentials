import mysql, { OkPacket } from "mysql";
import dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";

dotenv.config();

interface Product {
    id?: number;
    name: string;
    price: number;
}

const connection = mysql.createConnection({
    host: "localhost",
    database: "node_course_schema",
    user: process.env.MY_SQL_USERNM,
    password: process.env.MY_SQL_PASSWD,
});

//synchronous
connection.connect((err) => {
    if (err) throw err;

    console.log("Successfully connected to MySQL server");
});

const productsToAdd: Array<Product> = fs
    .readFileSync(path.join(__dirname, "new-products.txt"), {
        encoding: "utf8",
    })
    .split("\n")
    .map((line) => {
        const [name, priceString] = line.split(",");
        return {
            name: name,
            price: parseFloat(priceString),
        };
    });

productsToAdd.forEach((product) => {
    connection.query(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        [product.name, product.price, product.name, product.price],
        (err, result: OkPacket) => {
            if (err) throw err;

            console.log(result);
        },
    );
});

connection.query(`SELECT * FROM products`, (err, result: Array<Product>) => {
    if (err) throw err;

    console.log(result);
});

connection.end((err) => {
    if (err) throw err;

    console.log("Successfully ended connection to MySQL server");
});
