const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

router.get('/newKebab/index', loginCheck(), (req, res) => {
  console.log('this is the cookie: ', req.cookies);
  console.log('this is the user: ', req.session.user);
  res.render('./newKebab/index');
})

module.exports = router;