const joi = require('joi');

module.exports = {
  listProfiles: {
    query: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),

      profileId: joi.string().optional(),
      searchText: joi.string().optional(),
      dateOfBirthStart: joi.date().optional(),
      dateOfBirthEnd: joi.date()
        .when('dateofBirth', {
          is: joi.exist(),
          then: joi.date()
            .min(joi.ref('dateOfBirthStart'))
            .optional(),
          otherwise: joi.date().optional(),
        }),
      gender: joi.string().optional(),
    },
    params: {},
    body: {},
  },
  searchProfiles: {
    query: {},
    params: {},
    body: {
      limit: joi.number().default(30).optional(),
      offset: joi.number().default(0).optional(),


      criteria: joi.object({
        profileIds: joi.array().items(joi.string()).optional(),
        searchText: joi.string().optional(),
        dateOfBirthStart: joi.date().optional(),
        dateOfBirthEnd: joi.date()
          .when('dateofBirth', {
            is: joi.exist(),
            then: joi.date()
              .min(joi.ref('dateOfBirthStart'))
              .optional(),
            otherwise: joi.date().optional(),
          }),
        gender: joi.string().optional(),
      }).default({}).optional(),


      includes: joi.object({
        email: joi.object({
          onlyVerified: joi.boolean().optional(),
          onlyDefault: joi.boolean().optional(),
          limit: joi.number().default(30).optional(),
          offset: joi.number().default(0).optional(),
        }).optional(),
        phone: joi.object({
          onlyVerified: joi.boolean().optional(),
          onlyDefault: joi.boolean().optional(),
          limit: joi.number().default(30).optional(),
          offset: joi.number().default(0).optional(),
        }).optional(),
        address: joi.object({
          onlyVerified: joi.boolean().optional(),
          onlyDefault: joi.boolean().optional(),
          limit: joi.number().default(30).optional(),
          offset: joi.number().default(0).optional(),
        }).optional(),
      }).default({}).optional(),
    },
  },
  createProfile: {
    query: {},
    params: {},
    body: {
      givenName: joi.string().optional(),
      familyName: joi.string().optional(),
      middleName: joi.string().optional(),
      nickname: joi.string().optional(),
      dateOfBirth: joi.date().optional(),
      gender: joi.string().optional(),
      picture: joi.string().optional(),
    },
  },
  getProfile: {
    query: {},
    params: {
      profileId: joi.string().required(),
    },
    body: {},
  },
  updateProfile: {
    query: {},
    params: {
      profileId: joi.string().required(),
    },
    body: {
      givenName: joi.string().optional(),
      familyName: joi.string().optional(),
      middleName: joi.string().optional(),
      nickname: joi.string().optional(),
      dateOfBirth: joi.date().optional(),
      gender: joi.string().optional(),
      picture: joi.string().optional(),
    },
  },
  deleteProfile: {
    query: {},
    params: {
      profileId: joi.string().required(),
    },
    body: {},
  },
};
