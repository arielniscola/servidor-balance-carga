const { Router } = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const ProductosAleatorios = require('../contenedor/productosAleatorios')
const router = Router();
const products = new ProductosAleatorios();
const { fork } = require('child_process')
const os = require('os')


router.get('/productos-test', authMiddleware, async (req, res) => {
   products.dataCreate()
   return res.render('productoTabla', { productos: products.productos})

})

// router.get('/', authMiddleware, (req, res) => {
//    res.sendFile(path.join(__dirname, '../public/home.html'))
// })

router.get('/login',(req, res) => {
   res.sendFile(path.join(__dirname, '../public/login.html'))
})

router.get('/register', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/register.html'))
})


router.get('/failsignup', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/signupError.html'))
})
router.get('/faillogin', (req, res) => {
   res.sendFile(path.join(__dirname, '../public/loginError.html'))
})

router.get('/', authMiddleware, (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/home.html'))
  res.render('home', {name: req.user.username})
})
router.get('/info', authMiddleware, (req, res) => {
   const info = {
      sistOperativo : process.platform,
      idProceso: process.pid,
      nodeVersion: process.version,
      memoriaReservada: process.memoryUsage().rss,
      directorioTrabajo: process.cwd(),
      argumentosEntrada: `${process.argv.slice(2)}`,
      carpetaProyecto: process.execPath,
      workers: os.cpus().length
   }
   console.log(info);
   res.render('info', {info: info})
})
router.get('/api/randoms', (req, res, next) => {   
      try {
        let amount = req.query.cant;
    
        if (!amount) {
          amount = 1e8;
        }
    
        const forked = fork('src/apis/randomNumber.js');
    
        forked.on('message', (result) => {
          if (result === 'ready') {
            forked.send(amount);
          } else {
            res.status(200).json({ resultado: result });
          }
        });
      } catch (err) {
        next(err);
      }
    
})
router.get('/logout', (req, res) => {
   const username = req.user.username;
   req.logout(() => {
      res.render('logout', {name: username})
   });
    
})

function authMiddleware(req, res, next){
   if(req.isAuthenticated()){
       next();
   }else {
       res.redirect("/login")
   }
}
module.exports = router