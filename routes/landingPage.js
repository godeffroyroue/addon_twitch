/**
 * This module renders a layout when its route is requested
 * It is used for pages like home page
 */
const url = require('url')

const { getLandingPage } = require('../services/contentful')
const attachEntryState = require('../lib/entry-state')
const shouldAttachEntryState = require('../lib/should-attach-entry-state')

var join = false;

module.exports.getLandingPage = async (req, res) => {
  res.sendStatus(200).json({"lol": "Serveur opé"});
}

module.exports.getTest = async (req, res) => {
  res.json({"message": join});
}

module.exports.openJoin = async (req, res) => {
  join = true;
  res.json({"message": "Join is now open"});
}

module.exports.closeJoin = async (req, res) => {
  join = false;
  res.json({"message": "Join is now close"});
}