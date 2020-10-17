const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.judul_berita) {
      res.status(400).send({
        message: "Judul Berita can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const news = {
      judul_berita: req.body.judul_berita,
      konten: req.body.konten,
      kategori: req.body.kategori,
    };
  
    // Save Tutorial in the database
    News.create(news)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the News."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const judul_berita = req.query.judul_berita;
    var condition = judul_berita ? { judul_berita: { [Op.iLike]: `%${judul_berita}%` } } : null;
  
    News.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving news."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    News.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving News with id=" + id
        });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    News.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "News was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating News with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    News.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "News was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} News were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all news."
        });
      });
  };