
exports.seed = function(knex, Promise) {
  
  
  return knex('projects').del()
    .then(function () {
      
      return knex('projects').insert([
        {name: "Read", description: "Read at-least one chapter a day", completed: false},
        {name: "Workout", description: "Go to the gym at least 3 times a week", completed: false},
        {name: "Drink Water", description: "Drink specified amount of water daily", completed: true},
      ]);
    });
};
