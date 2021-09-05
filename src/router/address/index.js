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
    authorize(['profile.address.list', 'profile.address.read']),
    validate(validator.listAddresses),
    controller.listAddresses,
  )
  .post(
    validate(validator.createAddress),
    controller.createAddress,
  );

router.route('/search')
  .post(
    authenticate,
    authorize(['profile.address.list', 'profile.address.read']),
    validate(validator.searchAddresses),
    controller.searchAddresses,
  );

router.route('/:addressId/verified')
  .post(
    authenticate,
    authorize(['profile.address.update']),
    validate(validator.setVerified),
  );

router.route('/:addressId/default')
  .post(
    authenticate,
    authorize(['profile.address.update']),
    validate(validator.setDefault),
  );

router.route('/:addressId')
  .get(
    authenticate,
    authorize(['profile.address.read']),
    validate(validator.getAddress),
    controller.getAddress,
  )
  .put(
    authenticate,
    authorize(['profile.address.update']),
    validate(validator.updateAddress),
    controller.updateAddress,
  )
  .delete(
    authenticate,
    authorize(['profile.address.delete']),
    validate(validator.deleteAddress),
    controller.deleteAddress,
  );

module.exports = router;
