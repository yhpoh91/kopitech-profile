const phoneService = require('../../services/profile/phone');
const { L } = require('../../services/logger')('Phone Router');

const listPhones = async (req, res, next) => {
  try {
    const {
      limit, offset,
      profileId, searchText, type, isVerified, isDefault,
    } = req.query;

    const criteria = {
      profileId,
      searchText,
      type,
      isVerified,
      isDefault,
    };
    const includes = {};

    const phones = await phoneService.listPhones(criteria, includes, limit, offset, true);
    res.status(200).json(phones);
  } catch (error) {
    next(error);
  }
};

const searchPhones = async (req, res, next) => {
  try {
    const { limit, offset, criteria } = req.body;
    const includes = {};
    const phones = await phoneService.listPhones(criteria, includes, limit, offset, true);
    res.status(200).json(phones);
  } catch (error) {
    next(error);
  }
};

const createPhone = async (req, res, next) => {
  try {
    const { profileId, name, type, phone } = req.body;
    const newPhone = await phoneService.createPhone(profileId, phone, name, type);
    res.status(201).json(newPhone);
  } catch (error) {
    next(error);
  }
};

const getPhone = async (req, res, next) => {
  try {
    const { phoneId } = req.params;
    const phone = await phoneService.getPhone(phoneId, true);

    if (phone == null) {
      res.status(404).send(`Phone does not exist`);
      return;
    }

    res.status(200).json(phone);
  } catch (error) {
    next(error);
  }
};

const updatePhone = async (req, res, next) => {
  try {
    const { phoneId } = req.params;
    const result = await phoneService.updatePhone(phoneId, req.body, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deletePhone = async (req, res, next) => {
  try {
    const { phoneId } = req.params;
    const result = await phoneService.deletePhone(phoneId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setVerified = async (req, res, next) => {
  try {
    const { phoneId } = req.params;
    const { isVerified } = req.body;
    const result = await phoneService.setVerified(phoneId, isVerified, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setDefault = async (req, res, next) => {
  try {
    const { phoneId } = req.params;
    const { profileId } = req.body;
    const result = await phoneService.setDefault(phoneId, profileId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listPhones,
  searchPhones,
  createPhone,
  getPhone,
  updatePhone,
  deletePhone,
  setVerified,
  setDefault,
};
