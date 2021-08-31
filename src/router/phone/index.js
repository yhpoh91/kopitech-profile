const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    validate(validator.listPhones),
    controller.listPhones,
  )
  .post(
    validate(validator.createPhone),
    controller.createPhone,
  );

router.route('/search')
  .post(
    validate(validator.searchPhones),
    controller.searchPhones,
  );

router.route('/:phoneId/verified')
  .post(
    validate(validator.setVerified),
  );

router.route('/:phoneId/default')
  .post(
    validate(validator.setDefault),
  );

router.route('/:phoneId')
  .get(
    validate(validator.getPhone),
    controller.getPhone,
  )
  .put(
    validate(validator.updatePhone),
    controller.updatePhone,
  )
  .delete(
    validate(validator.deletePhone),
    controller.deletePhone,
  );

module.exports = router;
