require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Kevin",
    age: 69,
    favoriteFoods: ["Chilli", "Pretzels", "M&Ms"]
  });
  newPerson.save( (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  { name: "Michael", age: 40, favoriteFoods: ["Babyback ribs", "Vodka"]},
  { name: "Phyllis", age: 55, favoriteFoods: ["Gogurt"]},
  { name: "Dwight", age: 35, favoriteFoods: ["Beets", "Duck", "Deer"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

let personName = "Michael";

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

let food = "Pretzel";

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, personFound) => {
    if (err) return console.error(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save( (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    personFound.age = ageToSet;
    personFound.save( (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, personRemoved) => {
    if (err) return console.error(err);
    done(null, personRemoved);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({ age: 0})
    .exec( (err, peopleFound) => {
      if (err) return console.error(err);
      done(err, peopleFound);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
