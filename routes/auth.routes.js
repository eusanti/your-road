const router = require("express").Router()
const bcrypt = require('bcrypt')
const { isLoggedIn, checkRoles, isOwn } = require("../middlewares")
const User = require("../models/User.model")

// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))
router.post('/signup', (req, res) => {
  const { email, password} = req.body
  if (password.length === 0 || email.length === 0) {      
    res.render('auth/signup', { errorMsg: 'Rellena todos los campos' })
    return
  }
  User
    .findOne({ email })
    .then(user => {
      if (user) {                  
        res.render('auth/signup', { errorMsg: 'Email de usuario ya registrado' })
        return
      }
      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)    
      User
        .create({ email, password: hashPass})        
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// Login
router.get('/login', (req, res) => res.render('auth/login'))
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (password.length === 0 || email.length === 0) {    
    res.render('auth/login', { errorMsg: 'Rellena los campos' })
    return
  }
  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMsg: 'Email de usuario no reconocido' })
        return
      }
      if (bcrypt.compareSync(password, user.password) === false) {
        res.render('auth/login', { errorMsg: 'Contraseña incorrecta' })
        return
      }
      req.session.currentUser = user
      req.app.locals.user = req.session.currentUser;
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
  req.app.locals.user = null
})


module.exports = router




////// Revisar que es user.password . Tenemos que cambiarlo a email.password? 
// de dónde coger user?