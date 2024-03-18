const express = require("express");
const {
  addChannel,
  upload,
  addUser,
  listChannels,
  deletChannel,
  channelData,
  editChannel,
  addCurrency,
  listCurrency,
  CurrencyData,
  deleteCurrency,
  EditCurrency,
  addTax,
  listTax,
  taxData,
  deleteTax,
  editTax,
} = require("../controller/adminController");
const uploadImage = require("../middleware/fileUpload");
const adminRouter = express.Router();

adminRouter.post("/upload", upload);
adminRouter.post("/add-user", addUser);

adminRouter.get("/channels", listChannels);
adminRouter.post("/add-channel", uploadImage, addChannel);
adminRouter.delete("/channel/:id", deletChannel);
adminRouter.get("/channel/:id", channelData);
adminRouter.post("/edit-channel", uploadImage, editChannel);

adminRouter.post("/settings/add-currency", addCurrency);
adminRouter.get("/settings/currency-list", listCurrency);
adminRouter.get("/settings/currency/:id", CurrencyData);
adminRouter.delete("/settings/currency/:id", deleteCurrency)
adminRouter.post("/settings/edit-currency", EditCurrency);

adminRouter.post("/settings/add-tax", addTax);
adminRouter.get("/settings/tax-list", listTax);
adminRouter.get("/settings/tax/:id", taxData);
adminRouter.delete("/settings/tax/:id", deleteTax)
adminRouter.post("/settings/edit-tax", editTax);

module.exports = adminRouter;
