const express = require('express');

const exampleRouter = require('./example');
const emailRouter = require('./email');
const phoneRouter = require('./phone');
const addressRouter = require('./address');
const profileRouter = require('./profile');

const { L } = require('kopitech-logger')('Global Router');

const router = express.Router({ mergeParams: true });

router.get('/', (_, res) => res.send('Server is online'));
router.use('/examples', exampleRouter);
router.use('/emails', emailRouter);
router.use('/phones', phoneRouter);
router.use('/addresses', addressRouter);
router.use('/profiles', profileRouter);


module.exports = router;
