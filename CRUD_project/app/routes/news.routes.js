module.exports = app => {
    const news = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", news.create);
  
    // Retrieve all Tutorials
    router.get("/", news.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", news.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", news.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", news.delete);
  
    // Create a new Tutorial
    router.delete("/", news.deleteAll);
  
    app.use('/api/news', router);
  };