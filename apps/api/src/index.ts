import express from "express";
import cors from 'cors';
import UserRouter from './routes/Users';
import PasswordRouter from './routes/Password';


const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

app.use('/users', UserRouter);
app.use('/password', PasswordRouter);


app.listen(5000, () =>{
    console.log('Server is running on port 5000');
})