const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
  channelId: { type: String, required: true, unique: true },
  channelName: { type: String, required: true , unique: true},
  commission: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  currency:{ type: String, required: true},
  logo:{ type: String, required: true}
});

const ChannelModel = model('Channel', channelSchema);

module.exports = ChannelModel;
