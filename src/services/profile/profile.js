const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');
const { Profile, Email, Phone, Address } = require('../database');
const { L } = require('../logger')('Profile Service');

const mapProfile = (rawProfile) => {
  if (rawProfile == null) {
    return null;
  }

  const profile = rawProfile.dataValues;

  if (profile.emails) {
    profile.emails = profile.emails.map(rawEmail => rawEmail.dataValues);
  }

  if (profile.phones) {
    profile.phones = profile.phones.map(rawPhone => rawPhone.dataValues);
  }

  if (profile.addresses) {
    profile.addresses = profile.addresses.map(rawAddress => rawAddress.dataValues);
  }

  return profile;
}

const listProfiles = async (criteria, includes, limit = 30, offset = 0, excludeDeleted = true) => {
  try {
    const { 
      profileIds, nameText, dateOfBirth,
      gender, nationality, relationshipStatus,
    } = criteria;
    const { email: includeEmail, phone: includePhone, address: includeAddress } = includes;

    const query = {
      where: {},
      limit,
      offset,
      include: []
    };

    if (profileIds) {
      query.where.id = profileIds;
    }

    if (includeEmail != null) {
      const {
        onlyVerified = false,
        onlyDefault = false,
        limit: emailLimit = 30,
        offset: emailOffset = 0,
      } = includeEmail;

      const emailWhere = { deleted: 0 };
      if (onlyVerified) {
        emailWhere.isVerified = true;
      }
      if (onlyDefault) {
        emailWhere.isDefault = true;
      }

      query.include.push({
        model: Email,
        foreignKey: 'profileId',
        as: 'emails',
        where: emailWhere,
        limit: emailLimit,
        offset: emailOffset,
      });
    }

    if (includePhone != null) {
      const {
        onlyVerified = false,
        onlyDefault = false,
        limit: phoneLimit = 30,
        offset: phoneOffset = 0,
      } = includePhone;

      const phoneWhere = { deleted: 0 };
      if (onlyVerified) {
        phoneWhere.isVerified = true;
      }
      if (onlyDefault) {
        phoneWhere.isDefault = true;
      }

      query.include.push({
        model: Phone,
        foreignKey: 'profileId',
        as: 'phones',
        where: phoneWhere,
        limit: phoneLimit,
        offset: phoneOffset,
      });
    }

    if (includeAddress != null) {
      const {
        onlyVerified = false,
        onlyDefault = false,
        limit: addressLimit = 30,
        offset: addressOffset = 0,
      } = includeAddress;

      const addressWhere = { deleted: 0 };
      if (onlyVerified) {
        addressWhere.isVerified = true;
      }
      if (onlyDefault) {
        addressWhere.isDefault = true;
      }

      query.include.push({
        model: Phone,
        foreignKey: 'profileId',
        as: 'addresses',
        where: addressWhere,
        limit: addressLimit,
        offset: addressOffset,
      });
    }

    if (nameText) {
      query.where[Op.or] = [
        { givenName: { [Op.iLike]: `%${nameText}%` } },
        { familyName: { [Op.iLike]: `%${nameText}%` } },
        { middleName: { [Op.iLike]: `%${nameText}%` } },
        { nickname: { [Op.iLike]: `%${nameText}%` } },
      ];
    }

    if (dateOfBirth) {
      query.where.dateOfBirth = dateOfBirth;
    }

    if (gender) {
      query.where.gender = gender;
    }

    if (nationality) {
      query.where.nationality = nationality;
    }

    if (relationshipStatus) {
      query.where.relationshipStatus = relationshipStatus;
    }

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawProfiles = await Profile.findAll(query);
    const mappedProfiles = (rawProfiles || []).map(mapProfile);
    return Promise.resolve(mappedProfiles);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getProfile = async (profileId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: profileId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawProfile = await Profile.findOne(query);
    const mappedProfile = mapProfile(rawProfile);
    return Promise.resolve(mappedProfile);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createProfile = async (
  givenName, familyName,
  middleName, nickname,
  dateOfBirth, gender, picture,
) => {
  try {
    const rawProfile = await Profile.create({
      id: uuid(),
      givenName,
      familyName,
      middleName,
      nickname,
      dateOfBirth,
      gender,
      picture,
      deleted: 0,
    });

    const mappedProfile = mapProfile(rawProfile);
    return Promise.resolve(mappedProfile);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateProfile = async (profileId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: profileId,
      },
      fields: [],
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {};

    if (requestedChanges.givenName != null) {
      changes.givenName = requestedChanges.givenName || null;
      query.fields.push('givenName');
    }
    if (requestedChanges.familyName != null) {
      changes.familyName = requestedChanges.familyName || null;
      query.fields.push('familyName');
    }
    if (requestedChanges.middleName != null) {
      changes.middleName = requestedChanges.middleName || null;
      query.fields.push('middleName');
    }
    if (requestedChanges.nickname != null) {
      changes.nickname = requestedChanges.nickname || null;
      query.fields.push('nickname');
    }
    if (requestedChanges.dateOfBirth != null) {
      changes.dateOfBirth = requestedChanges.dateOfBirth;
      query.fields.push('dateOfBirth');
    }
    if (requestedChanges.gender != null) {
      changes.gender = requestedChanges.gender || null;
      query.fields.push('gender');
    }
    if (requestedChanges.picture != null) {
      changes.picture = requestedChanges.picture || null;
      query.fields.push('picture');
    }


    const updateResult = await Profile.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteProfile = async (profileId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: profileId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {
      deleted: Math.floor(new Date().getTime() / 1000),
    }

    const updateResult = await Profile.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  listProfiles,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
