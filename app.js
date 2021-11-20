const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const projectsRouter = require('./routes/projects');
const categoriesRouter = require('./routes/categories');
const companiesRouter = require('./routes/companies');
const tasklistsRouter = require('./routes/tasklists');
const tasksRouter = require('./routes/tasks');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/projects', projectsRouter);
app.use('/categories', categoriesRouter);
app.use('/companies', companiesRouter);
app.use('/tasklists', tasklistsRouter);
app.use('/tasks', tasksRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


module.exports = app;
