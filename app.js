const { urlencoded } = require('express');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const {loadContact, findContact, addContact} = require('./utils/contacts');
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

// Third-Party Midleware
app.use(expressLayouts);

// Built-in Midleware

app.use(express.static('public'));
app.use(express.urlencoded());


app.get('/about', (req, res)=>{
    // res.sendFile('./about.html', {root:__dirname});
    res.render('about', {
        layout: 'layouts/main-layouts',
        title: 'view about'
    });
});
app.get('/contact', (req, res)=>{
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main-layouts',
        title: 'halaman contact',
        contacts,
    });
}); 

// Halaman Tambah Data Contact

app.get('/contact/add', (req, res)=>{
    res.render('contact-add',{
        layout: 'layouts/main-layouts',
        title: 'Halaman tambah contact'
    });
});

// Proses data contact

app.post('/contact', (req, res)=>{
    addContact(req.body);
    res.redirect('contact');
});

app.get('/contact/:nama', (req, res)=>{
    const contact = findContact(req.params.nama);
    res.render('detail', {
        layout: 'layouts/main-layouts',
        title: 'halaman detail contact',
        contact,
    });
});

app.get('/', (req, res)=>{
    const kariyawan = 
    [
        {
        nama: 'akhmad',
        nik: '234'
        },
        {
        nama: 'wildan',
        nik: '234'
        },
        {
        nama: 'arthur',
        nik: '234'
        }
    ]
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Halaman index',
        kariyawan,
    });
});
app.get('/product/:id', (req, res)=>{
    res.send(`Poduct ID:  ${req.params.id} <br> category : ${req.query.category}`);
});

// app.use('/', (req,res)=>{
//     res.status(404);
//     res.send('<h1>404</h1>');
// });

app.listen(port, ()=>{
    console.log(`Example app listening on http://localhost:${port}`);
});

















