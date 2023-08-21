const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'routes')));

app.get('/snakeGame', (req,res)=>{
    res.sendFile(path.join(__dirname,'routes','index.html'));
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});