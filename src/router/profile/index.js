const express = require('express');
const validate = require('express-validation');
const validator = require('./validation');
const controller = require('./controller');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(
    validate(validator.listProfiles),
    controller.listProfiles,
  )
  .post(
    validate(validator.createProfile),
    controller.createProfile,
  );

router.route('/search')
  .post(
    validate(validator.searchProfiles),
    controller.searchProfiles,
  );

router.route('/:profileId')
  .get(
    validate(validator.getProfile),
    controller.getProfile,
  )
  .put(
    validate(validator.updateProfile),
    controller.updateProfile,
  )
  .delete(
    validate(validator.deleteProfile),
    controller.deleteProfile,
  );

module.exports = router;
