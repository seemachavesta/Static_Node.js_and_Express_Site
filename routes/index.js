const express = require('express');
const router = express.Router();

const {projects} = require('../data/data.json');

// Middleware for rendering index route;
router.get('/', (req, res) => {
    res.render('index', {projects})
});

// Middleware for randering the about page;
router.get('/about', (req, res) => {
  res.render('about')
})

// Rendring the danamic project route
router.get('/projects/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(({ id }) => id === projectId);
    
    if(project){
      return res.render('project', { project })
    }else{
      const err = new Error();
      err.status =  500;
      err.message = "Sorry Server is not able to complete your request."
      next(err);
    }
   
})




module.exports = router

