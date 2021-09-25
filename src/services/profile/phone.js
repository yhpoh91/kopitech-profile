const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');
const { Phone } = require('../database');
const { L } = require('kopitech-logger')('Profile.Phone Service');

const mapPhone = (rawPhone) => {
  if (rawPhone == null) {
    return null;
  }

  const phone = rawPhone.dataValues;
  return phone;
}

const listPhones = async (criteria, includes, limit = 30, offset = 0, excludeDeleted = true) => {
  try {
    const { 
      phoneIds, profileId, searchText, type, isVerified, isDefault,
    } = criteria;

    const query = {
      where: {},
      limit,
      offset,
    };

    if (phoneIds) {
      query.where.id = phoneIds;
    }

    if (profileId) {
      query.where.profileId = profileId;
    }

    if (searchText) {
      query.where[Op.or] = [
        { name: { [Op.iLike]: `%${searchText}%` } },
        { phone: { [Op.iLike]: `%${searchText}%` } },
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

    const rawPhones = await Phone.findAll(query);
    const mappedPhones = (rawPhones || []).map(mapPhone);
    return Promise.resolve(mappedPhones);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPhone = async (phoneId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: phoneId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawPhone = await Phone.findOne(query);
    const mappedPhone = mapPhone(rawPhone);
    return Promise.resolve(mappedPhone);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createPhone = async (
  profileId, phone, name, type,
) => {
  try {

    const rawPhone = await Phone.create({
      id: uuid(),
      profileId,
      name,
      type,
      isVerified: false,
      isDefault: false,
      phone,
      deleted: 0,
    });

    const mappedPhone = mapPhone(rawPhone);
    return Promise.resolve(mappedPhone);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updatePhone = async (phoneId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: phoneId,
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
    if (requestedChanges.phone != null) {
      changes.phone = requestedChanges.phone || null;
      query.fields.push('phone');
    }


    const updateResult = await Phone.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deletePhone = async (phoneId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: phoneId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {
      deleted: Math.floor(new Date().getTime() / 1000),
    }

    const updateResult = await Phone.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setVerified = async (phoneId, isVerified, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: phoneId,
      },
      returning: true,
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = { isVerified };
    const updateResult = await Phone.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setDefault = async (phoneId, profileId, excludeDeleted = true) => {
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
      clearResult = await Phone.update(changes1, query1);
    } else {
      throw new Error(`Null Profile ID`);
    }


    // Set Default
    if (phoneId) {
      const query2 = {
        where: {
          id: phoneId,
        },
        returning: true,
      };

      if (excludeDeleted) {
        query2.where.deleted = 0;
      }

      const changes2 = { isDefault: true };
      setResult = await Phone.update(changes2, query2);
    } else {
      throw new Error(`Null Phone ID`);
    }

    return Promise.resolve({ clearResult, setResult });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  listPhones,
  createPhone,
  getPhone,
  updatePhone,
  deletePhone,

  setVerified,
  setDefault,
};
