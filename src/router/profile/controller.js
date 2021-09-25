const profileService = require('../../services/profile/profile');
const { L } = require('kopitech-logger')('Profile Router');

const listProfiles = async (req, res, next) => {
  try {
    const {
      limit, offset,
      userId, profileId, searchText,
      dateOfBirthStart, dateOfBirthEnd,
      gender,
    } = req.query;

    const criteria = {
      userIds: [userId],
      profileIds: [profileId],
      searchText,
      dateOfBirthStart,
      dateOfBirthEnd,
      gender,
    };
    const profiles = await profileService.listProfiles(criteria, undefined, limit, offset, true);
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

const searchProfiles = async (req, res, next) => {
  try {
    const { limit, offset, criteria, includes } = req.body;
    const profiles = await profileService.listProfiles(criteria, includes, limit, offset, true);
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const {
      userId,
      givenName, familyName, middleName,
      nickname, dateOfBirth, gender, picture,
    } = req.body;
    const newProfile = await profileService.createProfile(
      userId, givenName, familyName, middleName, nickname,
      dateOfBirth, gender, picture,
    );
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const profile = await profileService.getProfile(profileId, true);

    if (profile == null) {
      res.status(404).send(`Profile does not exist`);
      return;
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const result = await profileService.updateProfile(profileId, req.body, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    const { profileId } = req.params;
    const result = await profileService.deleteProfile(profileId);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listProfiles,
  searchProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
