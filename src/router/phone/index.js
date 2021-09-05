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
    authorize(['profile.phone.list', 'profile.phone.read']),
    validate(validator.listPhones),
    controller.listPhones,
  )
  .post(
    authenticate,
    authorize(['profile.phone.create']),
    validate(validator.createPhone),
    controller.createPhone,
  );

router.route('/search')
  .post(
    authenticate,
    authorize(['profile.phone.list', 'profile.phone.read']),
    validate(validator.searchPhones),
    controller.searchPhones,
  );

router.route('/:phoneId/verified')
  .post(
    authenticate,
    authorize(['profile.phone.update']),
    validate(validator.setVerified),
    controller.setVerified,
  );

router.route('/:phoneId/default')
  .post(
    authenticate,
    authorize(['profile.phone.update']),
    validate(validator.setDefault),
    controller.setDefault,
  );

router.route('/:phoneId')
  .get(
    authenticate,
    authorize(['profile.phone.read']),
    validate(validator.getPhone),
    controller.getPhone,
  )
  .put(
    authenticate,
    authorize(['profile.phone.update']),
    validate(validator.updatePhone),
    controller.updatePhone,
  )
  .delete(
    authenticate,
    authorize(['profile.phone.delete']),
    validate(validator.deletePhone),
    controller.deletePhone,
  );

module.exports = router;
