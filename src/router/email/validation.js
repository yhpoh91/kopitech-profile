const joi = require('joi');

module.exports = {
  listEmails: {
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
  searchEmails: {
    query: {},
    params: {},
    body: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      criteria: joi.object({
        emailIds: joi.array().items(joi.string()).optional(),
        profileId: joi.string().optional(),
        searchText: joi.string().optional(),
        type: joi.string().optional(),
        isVerified: joi.boolean().optional(),
        isDefault: joi.boolean().optional(),
      }).default({}).optional(),
    },
  },
  createEmail: {
    query: {},
    params: {},
    body: {
      profileId: joi.string().required(),
      name: joi.string().optional(),
      type: joi.string().optional(),
      email: joi.string().email().required(),
    },
  },
  getEmail: {
    query: {},
    params: {
      emailId: joi.string().required(),
    },
    body: {},
  },
  updateEmail: {
    query: {},
    params: {
      emailId: joi.string().required(),
    },
    body: {
      name: joi.string().optional(),
      type: joi.string().optional(),
      email: joi.string().email().optional(),
    },
  },
  deleteEmail: {
    query: {},
    params: {
      emailId: joi.string().required(),
    },
    body: {},
  },
  setVerified: {
    query: {},
    params: {
      emailId: joi.string().required(),
    },
    body: {
      isVerified: joi.boolean().required(),
    },
  },
  setDefault: {
    query: {},
    params: {
      emailId: joi.string().required(),
    },
    body: {
      profileId: joi.string().required(),
    },
  },
};
