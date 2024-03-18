const ChannelModel = require("../models/channel");
const CurrencyModel = require("../models/currency");
const TaxModel = require("../models/tax");
const UserModel = require("../models/user");

exports.uploadDB = async (data) => {
  // try {
  //   // // Create a new document with the provided data
  //   // const document = new YourModel(data);

  //   // // Save the document to the database
  //   // await document.save();

  //   console.log("Data uploaded to the database:", data);
  // } catch (error) {
  //   console.error("Error uploading data to the database:", error);
  //   // Handle the error appropriately
  // }
  return "hai all";
};

exports.addChannelDB = async (
  channelId,
  channelName,
  email,
  commission,
  currency,
  logo
) => {
  try {
    const channelData = {
      channelId: channelId,
      channelName: channelName,
      email: email,
      commission: commission,
      currency: currency,
      logo: logo,
    };

    const channelDocument = new ChannelModel(channelData);
    await channelDocument.save();

    console.log("Channel added to the database:", channelData);
  } catch (error) {
    console.error("Error adding channel to the database:", error);
    throw error;
  }
};

exports.listChannelsDB = async () => {
  try {
    let res = await ChannelModel.find();
    return res;
  } catch (error) {
    console.error("Error adding user to the database:", error);
    throw error;
  }
};

exports.deleteChannelsDB = async (id) => {
  try {
    const result = await ChannelModel.deleteOne({ _id: id });

    // if (result.deletedCount === 1) {
    //   console.log("Channel deleted successfully");
    // } else {
    //   console.log("No channel found with the specified ID");
    // }

    return result;
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
};

exports.channelDataDB = async (id) => {
  try {
    const result = await ChannelModel.findOne({ _id: id });
    return result;
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
};

exports.editChannelsDB = async (
  _id,
  channelId,
  channelName,
  email,
  commission,
  currency,
  logo
) => {
  try {
    const channel = await ChannelModel.findById(_id);

    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channelId) {
      channel.channelId = channelId;
    }
    if (channelName) {
      channel.channelName = channelName;
    }
    if (email) {
      channel.email = email;
    }
    if (commission) {
      channel.commission = commission;
    }
    if (currency) {
      channel.currency = currency;
    }
    if (logo) {
      channel.logo = logo;
    }

    await channel.save();

    // console.log("Channel updated successfully:", channel);

    return channel;
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
};

exports.addUser = async (name, email, phoneNumber, password) => {
  try {
    const newUser = new UserModel({
      name,
      email,
      phoneNumber,
      password,
    });

    const newUseradded = await newUser.save();
    // console.log("User added to the database:", newUser);

    return newUseradded;
  } catch (error) {
    console.error("Error adding user to the database:", error);
    throw error;
  }
};

exports.addCurrencyDB = async (currencyName, currencyRate) => {
  try {
    const currencyData = {
      currencyName,
      currencyRate,
    };

    const currencyDocument = new CurrencyModel(currencyData);
    await currencyDocument.save();

    console.log("Currency added to the database:", currencyData);
  } catch (error) {
    console.error("Error adding currency to the database:", error);
    throw error;
  }
};

exports.listCurrencyDB = async () => {
  try {
    const result = await CurrencyModel.find();
    return result;
  } catch (error) {
    console.error("Error in listCurrency function:", error);
    throw error;
  }
};

exports.deleteCurrencyDB = async (id) => {
  try {
    const deletedCurrency = await CurrencyModel.findByIdAndDelete(id);
    if (!deletedCurrency) {
      return null;
    }
    return deletedCurrency;
  } catch (error) {
    console.error("Error in deleteCurrencyDB function:", error);
    throw error;
  }
};

exports.currencyDataDB = async (id) => {
  try {
    const data = await CurrencyModel.findOne({ _id: id });
    return data;
  } catch (error) {
    throw error;
  }
};

exports.editCurrencyDB = async (id, currencyName, currencyRate) => {
  try {
    const updatedCurrency = await CurrencyModel.findOneAndUpdate(
      { _id: id },
      { $set: { currencyName, currencyRate } },
      { new: true }
    );
    return updatedCurrency;
  } catch (error) {
    console.error("Error in editCurrencyDB function:", error);
    throw error;
  }
};

exports.addTaxDB = async (taxName, taxPercentage) => {
  try {
    const taxData = {
      taxName,
      taxPercentage,
    };

    const taxDocument = new TaxModel(taxData);
    await taxDocument.save();

    console.log("Tax added to the database:", taxData);
  } catch (error) {
    console.error("Error adding tax to the database:", error);
    throw error;
  }
};

exports.listTaxDB = async () => {
  try {
    const result = await TaxModel.find();
    return result;
  } catch (error) {
    console.error("Error in listTaxDB function:", error);
    throw error;
  }
};

exports.deleteTaxDB = async (id) => {
  try {
    const deletedTax = await TaxModel.findByIdAndDelete(id);
    if (!deletedTax) {
      return null;
    }
    return deletedTax;
  } catch (error) {
    console.error("Error in deletedTaxDB function:", error);
    throw error;
  }
};

exports.taxDataDB = async (id) => {
  try {
    const taxData = await TaxModel.findOne({ _id: id });
    return taxData;
  } catch (error) {
    throw error;
  }
};

exports.editTaxDB = async (id, taxName, taxPercentage) => {
  try {
    const updatedTax = await TaxModel.findByIdAndUpdate(
      id,
      { taxName, taxPercentage },
      { new: true }
    );
    return updatedTax;
  } catch (error) {
    console.error("Error in editTaxDB function:", error);
    throw error;
  }
};
