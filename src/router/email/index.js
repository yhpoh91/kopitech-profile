const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const { authenticate } = require('../../services/authenticator');
const { authorize } = require('../../services/authorizer');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    authenticate,
    authorize(['profile.email.list', 'profile.email.read']),
    validate(validator.listEmails),
    controller.listEmails,
  )
  .post(
    authenticate,
    authorize(['profile.email.create']),
    validate(validator.createEmail),
    controller.createEmail,
  );

router.route('/search')
  .post(
    authenticate,
    authorize(['profile.email.list', 'profile.email.read']),
    validate(validator.searchEmails),
    controller.searchEmails,
  );

router.route('/:emailId/verified')
  .post(
    authenticate,
    authorize(['profile.email.update']),
    validate(validator.setVerified),
  );

router.route('/:emailId/default')
  .post(
    authenticate,
    authorize(['profile.email.update']),
    validate(validator.setDefault),
  );

router.route('/:emailId')
  .get(
    authenticate,
    authorize(['profile.email.read']),
    validate(validator.getEmail),
    controller.getEmail,
  )
  .put(
    authenticate,
    authorize(['profile.email.update']),
    validate(validator.updateEmail),
    controller.updateEmail,
  )
  .delete(
    authenticate,
    authorize(['profile.email.delete']),
    validate(validator.deleteEmail),
    controller.deleteEmail,
  );

module.exports = router;
