const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
    // Define user objects here
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
    // Define product objects here
    { id: 1, name: 'Product A', price: 10 },
    { id: 2, name: 'Product B', price: 20 },
];

// Authentication endpoint (Students should implement this)
app.post('/login', (req, res) => {
    // Implement user authentication logic here
    // If authentication is successful, generate a JWT token and send it in the response
    // Example token generation:
    const { userName, password } = req.body;

    const user = users.find((user) => user.username === userName && user.password === password)
    if (user) {
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);
        res.status(201).json({ token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }

});
//Middleware for jwt token

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        console.log('Missing token');
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Invalid token:', err.message);
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log('Token verified successfully:', decoded);
        req.user = decoded;
        next();
    });
};


// Product route (Students should implement this)
app.get('/product', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Product data', products });
});

module.exports = app;