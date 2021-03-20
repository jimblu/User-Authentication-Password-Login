const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport-config');

initializePassport(passport, email => {
    return users.find(user => user.mail === mail);
});

const app = express();
const PORT = 5000;

let users = [];

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: 'false'}));


app.get('/', (req, res) => {
    res.render('index', {name: 'jimmy'});
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email, 
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }   
    console.log(users);
})






// app.get('/users', (req, res) => {
//     res.json(users);
// })

// app.post('/users', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = {name: req.body.name, password: hashedPassword};
//         users.push(user);
//         res.status(201).send()
//     }
//     catch {
//         res.status(500).send();
//     }
// })

// app.post('/users/login', async (req, res) => {
//     const user = users.find(x => x.name == req.body.name);
//     if (user == null) {
//         res.status(404).send('User not found')
//     }
//     try {
//         if(await bcrypt.compare(req.body.password, user.password)) {
//             res.send('Success');
//         } else {
//             res.send('Not allowed');
//         }
//     } catch {
//         res.status(500).send(); 
//     }
// })

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})