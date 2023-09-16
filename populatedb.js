#! /usr/bin/env node

console.log(
  'This script populates some test departments and items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Department = require("./models/department");
const Item = require("./models/item");

const departments = [];
const items = [];

const mongoose = require("mongoose");
const department = require("./models/department");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createDepartments();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function departmentCreate(index, name, description) {
  const department = new Department({ name: name, description: description });
  await department.save();
  departments[index] = department;
  console.log(`Added department: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  department,
  price,
  stockCount
) {
  const itemDetail = {
    name: name,
    description: description,
    department: department,
    price: price,
    stockCount: stockCount,
  };
  const item = new Item(itemDetail);
  await item.save();
  item[index] = item;
  console.log(`Added item: ${name}`);
}

async function createDepartments() {
  console.log("Adding departments");
  await Promise.all([
    departmentCreate(0, "Grocery", "General retail"),
    departmentCreate(1, "Produce", "Fruits and vegetables"),
    departmentCreate(2, "Butchery", "Meat and Seafood"),
    departmentCreate(3, "Bakery", "Bakery items"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "White sugar 500g",
      "Pure cane sugar, makes the day a little sweeter.",
      departments[0],
      "$3.00 ea",
      331
    ),
    itemCreate(
      1,
      "Instant coffee",
      "Premium freeze dried instant coffee made from 100% coffee beans.",
      departments[0],
      "$3.99 ea",
      640
    ),
    itemCreate(
      2,
      "Toilet paper 12pk",
      "Toilet tissue white 3 ply 12 pack.",
      departments[0],
      "$8.59 ea",
      698
    ),
    itemCreate(
      3,
      "Fresh vegetable broccoli head",
      "",
      departments[1],
      "$2.00 ea",
      1138
    ),
    itemCreate(
      4,
      "Fresh tomatoes loose",
      "Approx 6-10 medium tomatoes per 1kg",
      departments[1],
      "9.99 per kg",
      675
    ),
    itemCreate(
      5,
      "Onions brown",
      "Approx 4-6 medium onions per 1kg",
      departments[1],
      "$2.999 per kg",
      321
    ),
    itemCreate(
      6,
      "Chicken  breast",
      "Skinless chicken breasts from barn raised chickens",
      departments[2],
      "$13.00 per kg",
      133
    ),
    itemCreate(
      7,
      "Beef sausages 6pk",
      "Juicy, flavourful sausages made from grass fed beef.",
      departments[2],
      "$8.20 ea",
      222
    ),
    itemCreate(
      8,
      "Smoked salmon 100g",
      "Made in Denmark",
      departments[2],
      "$8.00 ea",
      89
    ),
    itemCreate(
      9,
      "Bread rolls 12pk",
      "In store baked dinner bread rolls",
      departments[3],
      "$2.99 ea",
      58
    ),
    itemCreate(
      10,
      "Banana bread loaf",
      "In store baked banana bread loaf",
      departments[3],
      "$4.39",
      60
    ),
    itemCreate(
      11,
      "Chocolate mud cake",
      "This cake may be decorated in store according to the occasion.",
      departments[3],
      "$12.99 ea",
      28
    ),
  ]);
}
