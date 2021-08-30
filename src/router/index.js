const express = require('express');

const exampleRouter = require('./example');
const emailRouter = require('./email');

const { L } = require('../services/logger')('Global Router');

const router = express.Router({ mergeParams: true });

router.get('/', (_, res) => res.send('Server is online'));
router.use('/examples', exampleRouter);
router.use('/emails', emailRouter);


module.exports = router;
