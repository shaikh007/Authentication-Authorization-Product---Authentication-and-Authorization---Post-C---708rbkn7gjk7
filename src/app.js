const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'newtonSchool';

app.use(bodyParser.json());

// Mock user data (Replace with actual user authentication logic)
const users = [
    // Define user objects here
    { userId: 1, userName: "user1", password: "pass1" },
    { userId: 2, userName: "user2", password: "pass2" },
    { userId: 3, userName: "user3", password: "pass3" },
];

// Mock product data (Replace with actual product retrieval logic)
const products = [
    // Define product objects here
    { productId: 1, name: 'Product A', price: 10 },
    { productId: 2, name: 'Product B', price: 20 },
    { productId: 3, name: 'Product C', price: 30 },
];

// Authentication endpoint (Students should implement this)
app.post('/login', (req, res) => {
    // Implement user authentication logic here
    // If authentication is successful, generate a JWT token and send it in the response
    // Example token generation:
    const { userName, password } = req.body;

    const user = users.find((user) => user.userName === userName && user.password === password)
    if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user.id, username: user.userName }, secretKey);
    res.status(201).json({ token });
});

// Product route (Students should implement this)
app.get('/product', (req, res) => {

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Authorization required" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(200).json({ message: "Product data", products: decoded });
    });

    // Middleware to check for a valid JWT token
    // Implement JWT token verification logic here
    // If the token is valid, students can access product data and send it in the response
    // Example response:
    // res.status(200).json({ message: 'Product data', products: productData });
});

module.exports = app;