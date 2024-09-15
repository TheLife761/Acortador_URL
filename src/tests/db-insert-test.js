"use strict";

var chai = require('chai');

const expect = chai.expect;

const createDbConnection = require("../database/database");
const { lookupShortenedUrl, getOriginalUrl, insertUrlRow } = require('../database/db-queries');

const test = async () => {
    try {
        describe("Insert URL row", async () => {
            it("Should insert the given URL row in the database", async () => {
                const DB = await createDbConnection();

                const originalURL = "test";
                const shortenedURL = "test";

                await insertUrlRow(DB, originalURL, shortenedURL);

                expect(await lookupShortenedUrl(DB, originalURL))
                    .to.be.string;

                expect(await getOriginalUrl(DB, shortenedURL))
                    .to.be.string;

                const sql = "DELETE FROM links where shortenedURL = ?";

                new Promise((resolve, reject) => {
                    DB.run(
                        sql,
                        [shortenedURL],
                        function (err) {
                            if (err) {
                                reject(err);
                            }

                            resolve();
                        }
                    );
                });

                DB.close();
            });
        });

    } catch (e) {
        console.error("When running test ", e);
    }
};

test();