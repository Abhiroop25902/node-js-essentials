import { getPropertyWithDefault } from "./index.ts";
import { expect } from "chai";

describe("getPropertyWithDefault - basic functionality", () => {
    it("returns the correct value when property exists", () => {
        const person = {
            name: "John",
            age: 42,
            hairColor: "brown",
        };
        const actualValue = getPropertyWithDefault("name", "N/A", person);
        const expectedValue = person.name;

        expect(actualValue).to.equal(expectedValue);
    });
});
