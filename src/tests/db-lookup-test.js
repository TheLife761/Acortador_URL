"use strict";

var chai = require('chai');

const expect = chai.expect;

const createDbConnection = require("../database/database");
const { lookupShortenedUrl, getOriginalUrl, shortenedUrlExists } = require('../database/db-queries');

const test = async () => {
    try {
        const DB = await createDbConnection();

        describe("Lookup shortened URL query", async () => {
            it("Should return a shortened URL string for an existing URL", async () => {
                expect(await lookupShortenedUrl(DB, 'https://www.google.com'))
                    .to.be.string;
            });

            it("Should return null for a non-existent URL", async () => {
                expect(await lookupShortenedUrl(DB, 'unexisting-and-invalid'))
                    .to.be.null;
            });
        });

        describe("Lookup original URL query", async () => {
            it("Should return null for a non-existent URL", async () => {
                expect(await getOriginalUrl(DB, 'invalidID'))
                    .to.be.null;
            });
        });

        describe("Check if shortened URL exists", async () => {
            it("Should return null if the given shortened URL does not exist", async () => {
                expect(await shortenedUrlExists(DB, 'invalidID'))
                    .to.be.null;
            });
        });
    }
    catch (e) {
        console.error("When running test ", e);
    }
};

test();