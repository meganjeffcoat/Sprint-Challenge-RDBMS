
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/projects.db3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const errorHandler = (res, code, message, error) => {
  return res.status(code).json({ message, error });
};

const server = express();

server.use(helmet());
server.use(express.json());


//Projects

// GET
server.get('/projects', (req, res) => {
  db('projects')
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error getting the projects.', error);
    });
});

// GET :ID
server.get('/projects/:id', (req, res) => {
  const id = req.params.id;

  db('projects')
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        db('actions')
          .where({ project_id: id })
          .then(actions => {
            project.actions = actions;
            res.status(200).json(project);
          });
      } else {
        res.status(400).json({
          message: 'Could not find the project you are looking for.',
          error
        });
      }
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error getting the project.', error);
    });
});

// POST
server.post('/projects', (req, res) => {
  const newProject = req.body;

  db('projects')
    .insert(newProject)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error adding the project.', error);
    });
});

// DELETE
server.delete('/projects/:id', (req, res) => {
  const id = req.params.id;

  db('projects')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error deleting the project', error);
    });
});

// PUT
server.put('/projects/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('projects')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error updating the project.', error);
    });
});

// ACTIONS ///////////////////////////
// GET
server.get('/actions', (req, res) => {
  db('actions')
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error getting the actions.', error);
    });
});

// POST
server.post('/actions', (req, res) => {
  const newAction = req.body;

  db('actions')
    .insert(newAction)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error adding the action.', error);
    });
});

// DELETE
server.delete('/actions/:id', (req, res) => {
  const id = req.params.id;

  db('actions')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error deleting the action.', error);
    });
});

// PUT
server.put('/actions/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db('actions')
    .where({ id })
    .update(update)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(error => {
      errorHandler(res, 500, 'There was an error updating the action.', error);
    });
});



const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`\nRunning on http://localhost:${port}\n`));