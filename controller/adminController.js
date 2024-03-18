const {
  uploadDB,
  addChannelDB,
  addUser,
  listChannelsDB,
  deleteChannelsDB,
  channelDataDB,
  editChannelsDB,
  addCurrencyDB,
  listCurrencyDB,
  listTaxDB,
  deleteCurrencyDB,
  editCurrencyDB,
  addTaxDB,
  deleteTaxDB,
  currencyDataDB,
  taxDataDB,
  editTaxDB,
} = require("../database/repository/adminRepository");
const { passwordHashing } = require("../services/bcrypt");

exports.upload = async (req, res) => {
  // console.log("upload");
  // res.send("upload")
};

exports.addChannel = async (req, res) => {
  try {
    const { channelId, channelName, email, commission, currency, logo } =
      req.body;
    // console.log(channelId, channelName, email, commission, currency, logo);
    await addChannelDB(
      channelId,
      channelName,
      email,
      commission,
      currency,
      logo
    );

    res
      .status(201)
      .json({ status: "success", message: "Channel added successfully" });
  } catch (error) {
    console.error("Error in addChannel controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.listChannels = async (req, res) => {
  try {
    const listChannels = await listChannelsDB();

    return res.status(200).json({
      status: "success",
      listChannels,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.deletChannel = async (req, res) => {
  try {
    let result = await deleteChannelsDB(req.params.id);
    let listChannels;
    if (result) {
      listChannels = await listChannelsDB();
    }

    return res.status(200).json({
      status: "success",
      message: "channel deleted successfully",
      listChannels,
    });
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.editChannel = async (req, res) => {
  try {
    const { _id, channelId, channelName, email, commission, currency, logo } =
      req.body;
    // console.log("edit channel req.body", req.body);
    let response = await editChannelsDB(
      _id,
      channelId,
      channelName,
      email,
      commission,
      currency,
      logo
    );

    return res.status(201).json({
      status: "success",
      message: "User added successfully",
      response,
    });
  } catch (error) {
    console.error("Error :", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.channelData = async (req, res) => {
  try {
    const channelData = await channelDataDB(req.params.id);
    // console.log("req.params._id", req.params.id);
    return res.status(200).json({
      status: "success",
      channelData,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const saltPassword = await passwordHashing(password);
    const newUser = await addUser(name, email, phoneNumber, saltPassword);

    return res.status(201).json({
      status: "success",
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

exports.addCurrency = async (req, res) => {
  try {
    const { currencyName, currencyRate } = req.body;
    console.log(currencyName, currencyRate);

    await addCurrencyDB(currencyName, currencyRate);

    res
      .status(200)
      .json({ status: "success", message: "Currency added successfully" });
  } catch (error) {
    console.error("Error in addCurrency controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.listCurrency = async (req, res) => {
  try {
    const listCurrency = await listCurrencyDB();
    // Send the list of currencies as a response
    res.status(200).json({ status: "success", listCurrency });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in listCurrency controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    let result = await deleteCurrencyDB(req.params.id);

    let listCurrency;

    if (result) {
      listCurrency = await listCurrencyDB();
      console.log(listCurrency);
    }

    res.status(200).json({
      status: "success",
      message: "Currency Deleted successfully",
      listCurrency,
    });
  } catch (error) {
    console.error("Error :", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.CurrencyData = async (req, res) => {
  try {
    console.log(req.params.id);
    const CurrencyData = await currencyDataDB(req.params.id);
    res.status(200).json({ status: "success", CurrencyData });
  } catch (error) {
    console.error("Error in addChannel controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.EditCurrency = async (req, res) => {
  try {
    const { _id, currencyName, currencyRate } = req.body;
    console.log(_id, currencyName, currencyRate);
    await editCurrencyDB(_id, currencyName, currencyRate);

    res
      .status(200)
      .json({ status: "success", message: "Currency added successfully" });
  } catch (error) {
    console.error("Error in addChannel controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addTax = async (req, res) => {
  try {
    const { taxName, taxPercentage } = req.body;
    console.log(taxName, taxPercentage);

    await addTaxDB(taxName, taxPercentage);

    res
      .status(200)
      .json({ status: "success", message: "Tax added successfully" });
  } catch (error) {
    console.error("Error in addTax controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.listTax = async (req, res) => {
  try {
    const listTaxs = await listTaxDB();
    res.status(200).json({ status: "success", taxes: listTaxs });
  } catch (error) {
    console.error("Error in listTax controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTax = async (req, res) => {
  try {
    let result = await deleteTaxDB(req.params.id);
    console.log(result);
    let listTaxs;
    if (result) {
      listTaxs = await listTaxDB();
    }

    res.status(200).json({
      status: "success",
      message: "Tax deleted successfully",
      listTaxs,
    });
  } catch (error) {
    console.error("Error :", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.taxData = async (req, res) => {
  try {
    console.log(req.params.id);

    const TaxData = await taxDataDB(req.params.id);
    res.status(200).json({
      status: "success",
      TaxData,
    });
  } catch (error) {
    console.error("Error in addChannel controller:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editTax = async (req, res) => {
  try {
    const { _id, taxName, taxPercentage } = req.body
    console.log( _id, taxName, taxPercentage );
    await editTaxDB( _id, taxName, taxPercentage )

    res.status(200).json({ status: "success", message: "Tax edited successfully" });
  } catch (error) {
    console.error("Error in editTax controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
