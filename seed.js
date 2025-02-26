const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Employee = require("./models/employee"); // Import model

mongoose
    .connect("mongodb://localhost:27017/employees", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        seedDatabase();
    })
    .catch((err) => console.error(err));

async function seedDatabase() {
    const employees = [];

    for (let i = 0; i < 50; i++) {
        employees.push({
            name: faker.person.fullName(),
            designation: faker.person.jobTitle(),
            salary: faker.number.int({ min: 1000000, max: 50000000 }),
        });
    }

    await Employee.insertMany(employees);
    console.log("Inserted 50 random employees!");
    mongoose.connection.close();
}
