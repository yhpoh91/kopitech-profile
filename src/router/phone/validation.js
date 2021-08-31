const joi = require('joi');

module.exports = {
  listPhones: {
    query: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      profileId: joi.string().optional(),
      searchText: joi.string().optional(),
      type: joi.string().optional(),
      isVerified: joi.boolean().optional(),
      isDefault: joi.boolean().optional(),
    },
    params: {},
    body: {},
  },
  searchPhones: {
    query: {},
    params: {},
    body: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      criteria: joi.object({
        phoneIds: joi.array().items(joi.string()).optional(),
        profileId: joi.string().optional(),
        searchText: joi.string().optional(),
        type: joi.string().optional(),
        isVerified: joi.boolean().optional(),
        isDefault: joi.boolean().optional(),
      }).default({}).optional(),
    },
  },
  createPhone: {
    query: {},
    params: {},
    body: {
      profileId: joi.string().required(),
      name: joi.string().optional(),
      type: joi.string().optional(),
      phone: joi.string().required(),
    },
  },
  getPhone: {
    query: {},
    params: {
      phoneId: joi.string().required(),
    },
    body: {},
  },
  updatePhone: {
    query: {},
    params: {
      phoneId: joi.string().required(),
    },
    body: {
      name: joi.string().optional(),
      type: joi.string().optional(),
      phone: joi.string().optional(),
    },
  },
  deletePhone: {
    query: {},
    params: {
      phoneId: joi.string().required(),
    },
    body: {},
  },
  setVerified: {
    query: {},
    params: {
      phoneId: joi.string().required(),
    },
    body: {
      isVerified: joi.boolean().required(),
    },
  },
  setDefault: {
    query: {},
    params: {
      phoneId: joi.string().required(),
    },
    body: {
      profileId: joi.string().required(),
    },
  },
};
