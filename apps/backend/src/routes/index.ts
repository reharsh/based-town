import * as express from 'express';

const v1Router = express.Router();

// Define your routes here
v1Router.get('/', (req, res) => {
    res.send('this is /api/v1/...');
});



export default v1Router;