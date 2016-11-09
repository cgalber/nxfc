'use strict';

/**
 * Module dependencies.
 */
var config = require('../config');
var CatalogueApi = require('../dist/nxfcCatalogueClient');
var GhostApi = require('../dist/nxfcGhostClient');
var CheckoutApi = require('../dist/nxfcCheckoutAndOrdersClient');
var ramlParser = require('raml-parser');
var path = require('path');

// TODO: fit file paths into configuration better

function initApis() {
    return {
        catalogue: {
            api: new CatalogueApi({baseUri: config.catalogue.uri}),
            raml: ramlParser.loadFile(path.resolve('./config/apis/catalogue/api.raml'))
        },
        ghost: {
            api: new GhostApi({baseUri: config.ghost.uri}),
            raml: ramlParser.loadFile(path.resolve('./config/apis/ghost/api.raml'))
        },
        checkout: {
            api: new CheckoutApi({baseUri: config.checkout.uri}),
            raml: ramlParser.loadFile(path.resolve('./config/apis/checkout/api.raml'))
        },
    };
}

module.exports = initApis();