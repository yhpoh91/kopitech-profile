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
    authorize(['profile.profile.list', 'profile.profile.read']),
    validate(validator.listProfiles),
    controller.listProfiles,
  )
  .post(
    authenticate,
    authorize(['profile.profile.create']),
    validate(validator.createProfile),
    controller.createProfile,
  );

router.route('/search')
  .post(
    authenticate,
    authorize(['profile.profile.list', 'profile.profile.read']),
    validate(validator.searchProfiles),
    controller.searchProfiles,
  );

router.route('/:profileId')
  .get(
    authenticate,
    authorize(['profile.profile.read']),
    validate(validator.getProfile),
    controller.getProfile,
  )
  .put(
    authenticate,
    authorize(['profile.profile.update']),
    validate(validator.updateProfile),
    controller.updateProfile,
  )
  .delete(
    authenticate,
    authorize(['profile.profile.delete']),
    validate(validator.deleteProfile),
    controller.deleteProfile,
  );

module.exports = router;
