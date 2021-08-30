const emailService = require('../../services/profile/email');
const { L } = require('../../services/logger')('Email Router');

const listEmails = async (req, res, next) => {
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

    const emails = await emailService.listEmails(criteria, includes, limit, offset, true);
    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
};

const searchEmails = async (req, res, next) => {
  try {
    const { limit, offset, criteria } = req.body;
    const includes = {};
    const emails = await emailService.listEmails(criteria, includes, limit, offset, true);
    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
};

const createEmail = async (req, res, next) => {
  try {
    const { profileId, name, type, email } = req.body;
    const newEmail = await emailService.createEmail(profileId, email, name, type);
    res.status(201).json(newEmail);
  } catch (error) {
    next(error);
  }
};

const getEmail = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const email = await emailService.getEmail(emailId, true);

    if (email = null) {
      res.status(404).send(`Email does not exist`);
      return;
    }

    res.status(200).json(email);
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const result = await emailService.updateEmail(emailId, req.body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deleteEmail = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const result = await emailService.deleteEmail(emailId, req.body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setVerified = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const { isVerified } = req.body;
    const result = await emailService.setVerified(emailId, isVerified, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setDefault = async (req, res, next) => {
  try {
    const { emailId } = req.params;
    const { profileId } = req.body;
    const result = await emailService.setDefault(emailId, profileId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listEmails,
  searchEmails,
  createEmail,
  getEmail,
  updateEmail,
  deleteEmail,
  setVerified,
  setDefault,
};
