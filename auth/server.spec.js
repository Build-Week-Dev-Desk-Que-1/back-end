const request = require("supertest");
//const Auth = require("./auth-router.js")
const server = require("./server.js");
const db = require("../data/dbConfig.js");


describe("User routes", () => {
    describe("\nRoute checks", () => {
        it("`/invalid` should return `404 not found`", () => {
            return request(server)
                .get("/invalid")
                .then(res => {
                    expect(res.status).toBe(404);
                });
        });
        it("`/` should return `200 OK`", () => {
            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});

describe("server", function() {
    describe("GET /", function() {
        it("should return 200 OK", function() {
            // make a GET request to / endpoint on the server
            return request(server) // return the async call to let jest know it should wait
                .get("/")
                .then(res => {
                    // assert that the HTTP status code is 200
                    expect(res.status).toBe(200);
                });
        });
    });

    describe("POST /register", function() {
        beforeEach(async() => {
            await db("devdesk").truncate(); // empty the table and reset the id back to 1
        });
        // need authentication
        it("return 201 on success", function() {
            return request(server)
                .post("/auth/register")
                .send({ username: "elias", password: "letmein", email: "email2211@gmail.com", role: "helper" })
                .then(res => {
                    expect(res.status).toBe(404);
                });
        });

        it('should return a message saying "user created successfully"', function() {
            return request(server)
                .post("/auth/register")
                .send({ username: "elias", password: "letmein", email: "email2211@gmail.com", role: "helper" })
                .then(res => {
                    expect(res.body.message).toBe("User created successfully");
                });
        });
        describe("\nDB output checks", () => {
            it("should return an array", async() => {
                await request(server).get('/tickets/').then(res => {
                    expect(res.type).toMatch(/json/gi);
                    //will not return need authentication
                });
            });
        });

    });
});