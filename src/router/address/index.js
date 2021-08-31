const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    validate(validator.listAddresses),
    controller.listAddresses,
  )
  .post(
    validate(validator.createAddress),
    controller.createAddress,
  );

router.route('/search')
  .post(
    validate(validator.searchAddresses),
    controller.searchAddresses,
  );

router.route('/:addressId/verified')
  .post(
    validate(validator.setVerified),
  );

router.route('/:addressId/default')
  .post(
    validate(validator.setDefault),
  );

router.route('/:addressId')
  .get(
    validate(validator.getAddress),
    controller.getAddress,
  )
  .put(
    validate(validator.updateAddress),
    controller.updateAddress,
  )
  .delete(
    validate(validator.deleteAddress),
    controller.deleteAddress,
  );

module.exports = router;
