const router = require('express').Router();
const res = require('express/lib/response');
const {User} = require('../../models');

// GET /API/USERS
router.get('/', (req,res) => {
    //ACCESS OUR USER MODEL AND URN .findAll() method)
    User.findAll({
        attributes: {exclude: ['password']}
    }) 
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET/API/USERS/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes:{exclude: ['password']},
        where: {
            id:req.params.id
        }
    })
.then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({message: 'No user found with this id'});
        return
    }
    res.json(dbUserData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//POST /API/USERS
router.post('/', (req, res) => {
    // expects {username:'',email:'',password:'' }
    User.create({
        username: req.body.username,
        email: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT /APIS/USERS/1
router.put('/:id', (req, res) => {
    // expects user name and password but if req.body has exact key pair values you can use req.body instead
    User.update(req.body, {
        where: {
            id:req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE API/USERS/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;