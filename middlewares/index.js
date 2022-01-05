module.exports = {
    isLoggedIn: (req, res, next) => {
      req.session.currentUser ? next() : res.render("auth/login", 
      { errorMessage: "Logueate para ver este contenido" 
    })
    },
    checkRoles: (...roles) => (req, res, next) => {
      roles.includes(req.session.currentUser.role) ? next() : res.status(401).render("auth/login", 
      { errorMessage: "No tienes los permisos adecuados" 
    })
    },
     isOwn: (req, res, next) =>{ 
       req.params.id == req.session.currentUser._id ? next() : res.status(401).render("auth/login", 
       { errorMessage: "No tienes los permisos adecuados",
      })
    }
};
