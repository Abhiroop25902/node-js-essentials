import { MongoClient } from "mongodb";
import * as fs from "node:fs/promises";
import * as path from "node:path";

interface Product {
    _id?: number;
    name: string;
}

async function getProductNamesFromFile(fileName: string): Promise<Product[]> {
    const fileText = await fs.readFile(fileName, { encoding: "utf8" });

    return fileText.split(",").map((productName) => {
        return {
            name: productName,
        };
    });
}

(async () => {
    const productsToBeAdded = await getProductNamesFromFile(
        path.join(__dirname, "new-products.txt"),
    );

    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("node-course-db");
    const collection = db.collection<Product>("products");

    const existingResults = await collection
        .find({
            name: { $in: productsToBeAdded.map((e) => e.name) },
        })
        .toArray();

    for (const product of productsToBeAdded) {
        if (existingResults.filter((e) => e.name == product.name).length > 0) {
            console.log(
                `Skipping Addition of ${product.name} cause it already exists`,
            );
        } else {
            const result = await collection.insertOne(product);
            if (!result.acknowledged) {
                console.error(`Failed to insert ${product.name}!`);
            } else {
                console.log(`Successfully inserted ${product.name}!`);
            }
        }
    }

    const entireData = await collection.find({}).toArray();

    console.log(entireData);

    await client.close();
})();
