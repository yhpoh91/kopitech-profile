const addressService = require('../../services/profile/address');
const { L } = require('kopitech-logger')('Address Router');

const listAddresses = async (req, res, next) => {
  try {
    const {
      limit, offset,
      profileId, searchText, type,
      locality, region, postalCode, country,
      isVerified, isDefault,
    } = req.query;

    const criteria = {
      profileId,
      searchText,
      type,
      locality,
      region,
      postalCode,
      country,
      isVerified,
      isDefault,
    };
    const includes = {};

    const addresses = await addressService.listAddresses(criteria, includes, limit, offset, true);
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

const searchAddresses = async (req, res, next) => {
  try {
    const { limit, offset, criteria } = req.body;
    const includes = {};
    const addresses = await addressService.listAddresses(criteria, includes, limit, offset, true);
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const {
      profileId, name, type,
      address1, address2, address3,
      locality, region, postalCode, country,
    } = req.body;
    const newAddress = await addressService.createAddress(
      profileId,
      address1, address2, address3,
      locality, region, postalCode, country,
      name, type,
    );
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

const getAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await addressService.getAddress(addressId, true);

    if (address == null) {
      res.status(404).send(`Address does not exist`);
      return;
    }

    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const result = await addressService.updateAddress(addressId, req.body, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const result = await addressService.deleteAddress(addressId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setVerified = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { isVerified } = req.body;
    const result = await addressService.setVerified(addressId, isVerified, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const setDefault = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { profileId } = req.body;
    const result = await addressService.setDefault(addressId, profileId, true);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listAddresses,
  searchAddresses,
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  setVerified,
  setDefault,
};
