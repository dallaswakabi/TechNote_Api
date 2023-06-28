const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const { logger } = require('./middleway/logger');
const { errorHandling } = require('./middleway/errorHandler');
const cors = require('cors')
const corsOptions = require('./config/CorsOption')
const cookieParser = require('cookie-parser');
//const asyncHandler = require('express-async-handler')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoute')
const root = require('./routes/root')
const authControler = require('./Controler/authController')
const UserControler  = require('./Controler/UserControler')
const bodyParser = require('body-parser')
const dotenv  = require('dotenv')
const NotesControler = require('./Controler/NotesControler')

dotenv.config()

app.use(logger);
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const PORT = process.env.PORT || 4000


app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/',root)
app.use('/users/',userRoute);
app.use('/api/auth/',authRoute);




app.post('/api/admin/auth/login',authControler.login)
app.post('/api/users/create',UserControler.createNewUser)
app.get('/api/users/view',UserControler.getAllUser)
//app.post('/api/users/add',UserControler.createNewUser)
app.post('/api/notes/view',NotesControler.createNote)
app.get('/api/notes/add',NotesControler.ViewNotes)


app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found');
    }
})
app.use(errorHandling);


app.listen(PORT,async()=>{
       try {
        const dbconnect = await mongoose.connect('mongodb+srv://dallaswakabi:dallas12@technote.cnntyjq.mongodb.net/?retryWrites=true&w=majority',
        {useNewUrlParser:true},
        { useUnifiedTopology: true },
        {useFindAndModify:false},
        {useCreateIndex:true}
        )
          if(dbconnect){
            console.log(`Database Connected Successfully!`);
            console.log(`Server Is Listening On Port ${PORT}`);
          }else{
            console.log(`Database Failed Connect !`);
          }
       } catch (error) {
        console.log(error)
       }

   
    
})