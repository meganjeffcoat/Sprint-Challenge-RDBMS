
exports.seed = function(knex, Promise) {


  return knex('actions').del()
    .then(function () {

      return knex('actions').insert([
        {description: "Pick new book", notes: "Something about tech", completed: 0, project_id: 1},
        {description: "Workouts", notes: "weight-training, cardio, yoga", completed: 0, project_id: 2},
        {description: "Get gym bag ready", notes: "wash gear and pack headphones", completed: 0, project_id: 2},
        {description: "Grab case of Topo-Chico water", notes: "20 pack from sam's", completed: 1, project_id: 3},
      ]);
    });
};
