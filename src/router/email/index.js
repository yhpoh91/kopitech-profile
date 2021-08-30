const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    validate(validator.listEmails),
    controller.listEmails,
  )
  .post(
    validate(validator.createEmail),
    controller.createEmail,
  );

router.route('/search')
  .post(
    validate(validator.searchEmails),
    controller.searchEmails,
  );

router.route('/:emailId/verified')
  .post(
    validate(validator.setVerified),
  );

router.route('/:emailId/default')
  .post(
    validate(validator.setDefault),
  );

router.route('/:emailId')
  .get(
    validate(validator.getEmail),
    controller.getEmail,
  )
  .put(
    validate(validator.updateEmail),
    controller.updateEmail,
  )
  .delete(
    validate(validator.deleteEmail),
    controller.deleteEmail,
  );

module.exports = router;
