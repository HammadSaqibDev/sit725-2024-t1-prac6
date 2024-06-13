let expect = require("chai").expect;
let request = require("request");
let clothesUrl = "http://localhost:3000/clothes";
let searchPromptUrl = "http://localhost:3000/search-prompts";


describe("test get clothes", function () {
    // Test that when making a request to the clothesUrl endpoint, the server responds with a 200 status code.
    it("return status code of 200", function (done) {
        request(clothesUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    // Test filter text that should appear on the page
    it("return the filters", function (done) {
        request(clothesUrl, function (error, response, body) {
            expect(body).to.contain("Filters");
            expect(body).to.contain("Category");
            expect(body).to.contain("Subcategory");
            expect(body).to.contain("Condition");
            expect(body).to.contain("Price Range");
            expect(body).to.contain("Size");
            expect(body).to.contain("Location");
            done();
        });
    });

    // Test some clothes name text that should appear on the page
    it("return all the clothes", function (done) {
        request(clothesUrl, function (error, response, body) {
            expect(body).to.contain("Mens Shirt");
            expect(body).to.contain("Floral skirt");
            expect(body).to.contain("Blue Shirts");
            expect(body).to.contain("Kids dress");
            done();
        });
    });

    // Test the subcategory filter functionality 
    it("return the filtered subcategory clothes page", function (done) {
        request(`${clothesUrl}?subcategory=Top`, function (error, response, body) {
            expect(body).to.contain("Mens Shirt");
            expect(body).to.contain("Blue Shirts");
            expect(body).to.contain("Kids dress");
            expect(body).to.contain("Polo Tshirt");
            expect(body).not.to.contain("Floral skirt");
            done();
        });
    });

    // Test the size filter functionality 
    it("return the filtered size clothes page", function (done) {
        request(`${clothesUrl}?size=2XS`, function (error, response, body) {
            expect(body).to.contain("Mens Shirt");
            expect(body).to.contain("Red T shirt");
            expect(body).not.to.contain("Baby Dress");
            done();
        });
    });
});


// Test that when making a request to the searchPromptUrl endpoint, the server responds with a 200 status code.
describe("test get search prompts", function () {
    it("return status code of 200", function (done) {
        request(searchPromptUrl, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    // Test when no request query is provided, the expected behavior is to return an empty array
    it("returns an empty array when no request query", function (done) {
        request(searchPromptUrl, function (error, response, body) {
            body = JSON.parse(body);
            expect(body).to.deep.equal([]);
            done();
        });
    });

    // Test the behavior when searching for specific strings
    it("returns the searched strings", function (done) {
        request(
            { url: searchPromptUrl, qs: { query: "shirt" } },
            function (error, response, body) {
                body = JSON.parse(body);
                expect(body).to.include.deep.members([
                    {
                        title: "Shirt Dress",
                        id: 0,
                        data: {
                            _id: "6475c82ab836502ff7852bd7",
                            value: "Shirt Dress",
                        },
                    },
                    {
                        title: "T Shirt Men",
                        id: 1,
                        data: {
                            _id: "6475c82ab836502ff7852bd8",
                            value: "T Shirt Men",
                        },
                    },
                    {
                        title: "T-shirt",
                        id: 2,
                        data: {
                            _id: "6475c9dab836502ff787d991",
                            value: "T-shirt",
                        },
                    },
                    {
                        title: "Oversized T Shirt",
                        id: 3,
                        data: {
                            _id: "6475c9dab836502ff787d992",
                            value: "Oversized T Shirt",
                        },
                    },
                    {
                        title: "Shirt",
                        id: 4,
                        data: {
                            _id: "6475c9dab836502ff787d993",
                            value: "Shirt",
                        },
                    },
                ]);
                done();
            }
        );
    });
});

// Test adding a search prompt
describe("test add a search prompt", function () {
    it("insert a search prompt to database", function (done) {
        request.post(
            {
                url: `${searchPromptUrl}/add`,
                json: true,
                body: { searchPrompts: ["test-search-prompt"] },
            },
            function (error, response, body) {
                expect(body).to.contain("added");
                done();
            }
        );
    });
});

// Test deleting a search prompt
describe("test delete a search prompt", function () {
    it("delete a search prompt to database", function (done) {
        request.post(
            {
                url: `${searchPromptUrl}/delete`,
                json: true,
                body: { searchPrompts: ["test-search-prompt"] },
            },
            function (error, response, body) {
                expect(body).to.contain("deleted");
                done();
            }
        );
    });
});