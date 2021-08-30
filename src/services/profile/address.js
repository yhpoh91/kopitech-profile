const { v4: uuid } = require('uuid');
const { Op } = require('sequelize');
const { Address } = require('../database');
const { L } = require('../logger')('Profile.Address Service');

const mapAddress = (rawAddress) => {
  if (rawAddress == null) {
    return null;
  }

  const address = rawAddress.dataValues;
  return address;
}

const listAddresses = async (criteria, includes, limit = 30, offset = 0, excludeDeleted = true) => {
  try {
    const { 
      addressIds, profileId, searchText,
      locality, region, postalCode, country,
      type, isVerified, isDefault,
    } = criteria;

    const query = {
      where: {},
      limit,
      offset,
    };

    if (addressIds) {
      query.where.id = addressIds;
    }

    if (profileId) {
      query.where.profileId = profileId;
    }

    if (searchText) {
      query.where[Op.or] = [
        { name: { [Op.iLike]: `%${searchText}%` } },
        { address1: { [Op.iLike]: `%${searchText}%` } },
        { address2: { [Op.iLike]: `%${searchText}%` } },
        { address3: { [Op.iLike]: `%${searchText}%` } },
        { locality: { [Op.iLike]: `%${searchText}%` } },
        { region: { [Op.iLike]: `%${searchText}%` } },
        { postalCode: { [Op.iLike]: `%${searchText}%` } },
        { country: { [Op.iLike]: `%${searchText}%` } },
      ];
    }
    if (locality) {
      query.where.locality = locality;
    }
    if (region) {
      query.where.region = region;
    }
    if (postalCode) {
      query.where.postalCode = postalCode;
    }
    if (country) {
      query.where.country = country;
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

    const rawAddresses = await Address.findAll(query);
    const mappedAddresses = (rawAddresses || []).map(mapAddress);
    return Promise.resolve(mappedAddresses);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAddress = async (addressId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: addressId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const rawAddress = await Address.findOne(query);
    const mappedAddress = mapAddress(rawAddress)
    return Promise.resolve(mappedAddress);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createAddress = async (
  profileId, address1, address2, address3,
  locality, region, postalCode, country,
  name, type,
) => {
  try {

    const rawAddress = await Address.create({
      id: uuid(),
      profileId,
      name,
      type,
      isVerified: false,
      isDefault: false,
      address1,
      address2,
      address3,
      locality,
      region,
      postalCode,
      country,
      deleted: 0,
    });

    const mappedAddress = mapAddress(rawAddress)
    return Promise.resolve(mappedAddress);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateAddress = async (addressId, requestedChanges, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: addressId,
      },
      fields: [],
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {};

    if (requestedChanges.address1 != null) {
      changes.address1 = requestedChanges.address1 || null;
      query.fields.push('address1');
    }
    if (requestedChanges.address2 != null) {
      changes.address2 = requestedChanges.address2 || null;
      query.fields.push('address2');
    }
    if (requestedChanges.address3 != null) {
      changes.address3 = requestedChanges.address3 || null;
      query.fields.push('address3');
    }
    if (requestedChanges.locality != null) {
      changes.locality = requestedChanges.locality || null;
      query.fields.push('locality');
    }
    if (requestedChanges.region != null) {
      changes.region = requestedChanges.region || null;
      query.fields.push('region');
    }
    if (requestedChanges.postalCode != null) {
      changes.postalCode = requestedChanges.postalCode || null;
      query.fields.push('postalCode');
    }
    if (requestedChanges.country != null) {
      changes.country = requestedChanges.country || null;
      query.fields.push('country');
    }


    const updateResult = await Address.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const deleteAddress = async (addressId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: addressId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = {
      deleted: Math.floor(new Date().getTime() / 1000),
    }

    const updateResult = await Address.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setVerified = async (addressId, excludeDeleted = true) => {
  try {
    const query = {
      where: {
        id: addressId,
      },
    };

    if (excludeDeleted) {
      query.where.deleted = 0;
    }

    const changes = { isVerified: true };
    const updateResult = await Address.update(changes, query);
    return Promise.resolve(updateResult);
  } catch (error) {
    return Promise.reject(error);
  }
}

const setDefault = async (addressId, profileId, excludeDeleted = true) => {
  try {
    let clearResult;
    let setResult;

    // Clear Default
    if (profileId) {
      const query1 = {
        where: {
          profileId,
        },
      };

      if (excludeDeleted) {
        query1.where.deleted = 0;
      }

      const changes1 = { isDefault: false };
      clearResult = await Address.update(changes1, query1);
    } else {
      throw new Error(`Null Profile ID`);
    }


    // Set Default
    if (addressId) {
      const query2 = {
        where: {
          id: addressId,
        },
      };

      if (excludeDeleted) {
        query.where.deleted = 0;
      }

      const changes2 = { isDefault: true };
      setResult = await Address.update(changes2, query2);
    } else {
      throw new Error(`Null Address ID`);
    }

    return Promise.resolve({ clearResult, setResult });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  listAddresses,
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,

  setVerified,
  setDefault,
};
