var express = require('express');
var router = express.Router();

const Stuff = require('../models/stuff');


router.get('/', (req, res) => {
  Stuff.find()
  .then(stuff => {
 
    res.render('index', {
      title: 'Stuff List',
      list: stuff,
      sorted: false
    });

  });
});
router.get('/sorted', (req, res) => {
  Stuff.find()
  .then(stuff => {
 
    res.render('index', {
      title: 'Stuff List',
      list: stuff,
      sorted: true
    });

  });
});

router.post('/', (req, res) => {
  const name = req.body.stuff_name;
  let newstuff = new Stuff();
  newstuff.name = name;
  newstuff.save()
  .then(() => {
    res.redirect('/')
  });
});

router.get('/edit/:id', (req, res) => {
	var id = req.params.id;
 Stuff.findById(id, function(err, stuff) {
  if (err) throw err;
  name = stuff.name;
    res.render('edit', {
      title: 'Editing Stuff',
      stuff_id: id,
      stuff_name: name
    });
	});
});

router.post('/edit', (req, res) => {
  Stuff.findById(req.body.stuff_id, function(err, stuff) {
  if (err) throw err;
  stuff.name = req.body.stuff_name;
  stuff.save(function(err) {
    if (err) throw err;
    console.log('User successfully updated!');
  });
  });
  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
	var id = req.params.id;
 Stuff.findById(id, function(err, stuff) {
  if (err) throw err;
  name = stuff.name;
    res.render('delete', {
      title: 'Deleting Stuff',
      stuff_id: id,
      stuff_name: name
    });
	});
});

router.post('/delete', (req, res) => {
  Stuff.findByIdAndRemove(req.body.stuff_id, function(err) {
  if (err) throw err;
  console.log('User deleted!');
  });
  res.redirect('/');
});

module.exports = router;
