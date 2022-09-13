// Importamos modulos
const express = require('express')
const multer = require('multer')

// Instanciamos Express
const app = express()

// CONFIG
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 3000

// Set Storage

// definimos donde almacenaremos nuestros archivos
const storage = multer.diskStorage({
//destino
    destination: function (req,file,cb){
        cb(null,'uploads')
    },
// le daremos un identificador
    filename: function(req,file,cb){
        let filename = file.originalname.split('.')[0]
        let fileExtention = file.originalname.split('.')[1]
        cb(null, filename + '-' + Date.now() + '.' + fileExtention)
    }
})
const upload = multer({storage: storage})


// Routes
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/client.html')
})
// MANEJO DE CARGA DE ARCHIVOS

//Subiendo un solo archivo
/* Tener en cuenta que el name del campo archivo debe ser el mismo que el argumento
myFile pasado a la funcion upload.single */
app.post('/uploadfile', upload.single('myFile'), (req,res,next)=>{
    const file = req.file
    if(!file){
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})
//Subiendo multiples archivos
app.post('/uploadmultiple', upload.array('myFiles', 12), (req,res,next)=>{
    const file = req.file
    if(!file){
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

//Server a la escucha
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`)
})

