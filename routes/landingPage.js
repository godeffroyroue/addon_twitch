/**
 * This module renders a layout when its route is requested
 * It is used for pages like home page
 */
const url = require('url')

const { getLandingPage } = require('../services/contentful')
const attachEntryState = require('../lib/entry-state')
const shouldAttachEntryState = require('../lib/should-attach-entry-state')

module.exports.getLandingPage = async (request, response, next) => {
  response.send(200).json({"lol": "Serveur opé"});
}
