const express = require('express');
const router = express.Router();
const newKebab = require('../models/kebab');
const Kebabs = require('../models/kebab');

//------------------------------------------------------new form
router.get("/newKebab", (req, res) => {
  newKebab
    .find()
    .then((kebab) => {
      res.render("newKebab/index", {
        kebab: kebab
      });
    })
});

router.get("/newKebab/new", (req, res) => {
  res.render("newKebab/new");
});

router.get("/newKebab/index", (req, res) => {
  newKebab
    .find()
    .then((kebab) => {
      console.log("hello");
      res.render("newKebab/index", {
        kebab: kebab
      });
    })
});


// ------------------------------------------------------add
router.post("/newKebab/new", (req, res) => {
  console.log("New kebab added", req.body);
  const {
    shopName,
    picture,
    review,
    address,
    coord,
  } = req.body;
  const comment = {title: req.body.title, body: req.body.body, date: req.body.date} 
  newKebab.create({
    shopName: shopName,
    picture: picture,
    review: review,
    address: address,
    coord: coord,
    comments: [comment]

  }).then((kebabmodel) => {
    console.log(`Success! ${shopName} was added to the database.`);
    res.redirect("/newKebab/");
  }).catch((err) => {
    console.log(err);
  })
})

//------------------------------------------------------delete
router.post('/newKebab/:id/delete', (req, res, next) => {
  Kebabs.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/newKebab/");
    })
    .catch(err => {
      console.log(err);
    })
});

//------------------------------------------------------edit

router.get("/newKebab/edit/:id", (req, res) => {
  Kebabs.findById(req.params.id)
    .then(kebabmodel => {
      console.log(kebabmodel);
      res.render("../views/newKebab/edit.hbs", {
        kebabs: kebabmodel
      });
    })
    .catch(err => {
      console.log(err);
    })
})

//-----------------------------------------------------post edit 

router.post('/newKebab/edit/:id', (req, res, next) => {
  const {
    shopName,
    picture,
    review,
    address,
    coord,
    comments
  } = req.body;
  const kebabId = req.params.id;
  console.log()
  Kebabs.findByIdAndUpdate(kebabId, {
      shopName,
      picture,
      review,
      address,
      coord,
      comments
    })
    .then(kebabmodel => {
      console.log(kebabmodel)
      console.log(`Success! ${shopName} was edited in the database.`);
      res.redirect(`/newKebab/`);
    })
    .catch(err => {
      console.log(err);
    });
})


// ------------------------------------------------------individual kebab details
router.get("/newKebab/:id", (req, res) => {
  Kebabs.findById(req.params.id)
    .then((kebabmodel) => {
      console.log(kebabmodel);
      res.render("newKebab/show", {
        kebabmodel
      });
    })
    .catch((err) => {
      console.log(err);
    })
});
module.exports = router;