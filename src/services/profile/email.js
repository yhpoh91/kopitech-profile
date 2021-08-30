const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');
const { Email } = require('../database');
const { L } = require('../logger')('Profile.Email Service');

const mapEmail = (rawEmail) => {
  if (rawEmail == null) {
    return null;
  }

  const email = rawEmail.dataValues;
  return email;
}

const listEmails = async (criteria = {}, includes = {}, limit = 30, offset = 0, excludeDeleted = true) => {
  try {
    const { 
      emailIds, profileId, searchText, type, isVerified, isDefault,
    } = criteria;

    const query = {
      where: {},
      limit,
      offset,
    };

    if (emailIds) {
      query.where.id = emailIds;
    }

    if (profileId) {
      query.where.profileId = profileId;
    }

    if (searchText) {
      query.where[Op.or] = [
        { name: { [Op.iLike]: `%${searchText}%` } },
        { email: { [Op.iLike]: `%${searchText}%` } },
      ];
    }

    if (type) {
      query.where.type = type;
    }

    if (isVerified != null) {
      query.where.isVerified = isVerified;
    }

    if (isDefault != null) {
      query.where.isDefault = isDefault;
    }

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawEmails = await Email.findAll(query);
    const mappedEmails = (rawEmails || []).map(mapEmail);
    return Promise.resolve(mappedEmails);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getEmail = async (emailId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: emailId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawEmail = await Email.findOne(query);
    const mappedEmail = mapEmail(rawEmail);
    return Promise.resolve(mappedEmail);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createEmail = async (
  profileId, email, name, type,
) => {
  try {

    const rawEmail = await Email.create({
      id: uuid(),
      profileId,
      name,
      type,
      isVerified: false,
      isDefault: false,
      email,
      deleted: 0,
    });

    const mappedEmail = mapEmail(rawEmail);
    return Promise.resolve(mappedEmail);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateEmail = async (emailId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: emailId,
      },
      fields: [],
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {};

    if (requestedChanges.name != null) {
      changes.name = requestedChanges.name || null;
      query.fields.push('name');
    }
    if (requestedChanges.type != null) {
      changes.type = requestedChanges.type || null;
      query.fields.push('type');
    }
    if (requestedChanges.email != null) {
      changes.email = requestedChanges.email || null;
      query.fields.push('email');
    }


    const updateResult = await Email.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteEmail = async (emailId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: emailId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {
      deleted: Math.floor(new Date().getTime() / 1000),
    }

    const updateResult = await Email.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setVerified = async (emailId, isVerified, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: emailId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = { isVerified };
    const updateResult = await Email.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setDefault = async (emailId, profileId, excludeDeleted = true) => {
  try {
    let clearResult;
    let setResult;

    // Clear Default
    if (profileId) {
      const query1 = {
        where: {
          profileId,
        },
        returning: true,
      };

      if (excludeDeleted) {
        query1.where.deleted = 0;
      }

      const changes1 = { isDefault: false };
      clearResult = await Email.update(changes1, query1);
    } else {
      throw new Error(`Null Profile ID`);
    }


    // Set Default
    if (emailId) {
      const query2 = {
        where: {
          id: emailId,
        },
        returning: true,
      };

      if (excludeDeleted) {
        query.where.deleted = 0;
      }

      const changes2 = { isDefault: true };
      setResult = await Email.update(changes2, query2);
    } else {
      throw new Error(`Null Email ID`);
    }

    return Promise.resolve({ clearResult, setResult });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  listEmails,
  createEmail,
  getEmail,
  updateEmail,
  deleteEmail,

  setVerified,
  setDefault,
};
