const joi = require('joi');

module.exports = {
  listAddresses: {
    query: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      profileId: joi.string().optional(),
      searchText: joi.string().optional(),
      type: joi.string().optional(),
      locality: joi.string().optional(),
      region: joi.string().optional(),
      postalCode: joi.string().optional(),
      country: joi.string().optional(),
      isVerified: joi.boolean().optional(),
      isDefault: joi.boolean().optional(),
    },
    params: {},
    body: {},
  },
  searchAddresses: {
    query: {},
    params: {},
    body: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      criteria: joi.object({
        addressIds: joi.array().items(joi.string()).optional(),
        profileId: joi.string().optional(),
        searchText: joi.string().optional(),
        type: joi.string().optional(),
        locality: joi.string().optional(),
        region: joi.string().optional(),
        postalCode: joi.string().optional(),
        country: joi.string().optional(),
        isVerified: joi.boolean().optional(),
        isDefault: joi.boolean().optional(),
      }).default({}).optional(),
    },
  },
  createAddress: {
    query: {},
    params: {},
    body: {
      profileId: joi.string().required(),
      name: joi.string().optional(),
      type: joi.string().optional(),
      address1: joi.string().required(),
      address2: joi.string().optional(),
      address3: joi.string().optional(),
      locality: joi.string().optional(),
      region: joi.string().optional(),
      postalCode: joi.string().optional(),
      country: joi.string().optional(),
    },
  },
  getAddress: {
    query: {},
    params: {
      addressId: joi.string().required(),
    },
    body: {},
  },
  updateAddress: {
    query: {},
    params: {
      addressId: joi.string().required(),
    },
    body: {
      name: joi.string().optional(),
      type: joi.string().optional(),
      address1: joi.string().optional(),
      address2: joi.string().optional(),
      address3: joi.string().optional(),
      locality: joi.string().optional(),
      region: joi.string().optional(),
      postalCode: joi.string().optional(),
      country: joi.string().optional(),
    },
  },
  deleteAddress: {
    query: {},
    params: {
      addressId: joi.string().required(),
    },
    body: {},
  },
  setVerified: {
    query: {},
    params: {
      addressId: joi.string().required(),
    },
    body: {
      isVerified: joi.boolean().required(),
    },
  },
  setDefault: {
    query: {},
    params: {
      addressId: joi.string().required(),
    },
    body: {
      profileId: joi.string().required(),
    },
  },
};
