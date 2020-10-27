require('dotenv').config() 
const supertest = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')
describe('server', () => {
    
    describe("POST to /api/auth/register", () => {
        beforeEach( async () => {
        await db('users').truncate();
        });
        it('should return 200 status code when pased correct data', () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({ username: "steve", password: "pass" })
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it("should fail with code 500 if passed incorrect data", () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({})
                .then(res => {
                    expect(res.status).toBe(500);
                });
        });
        it("should insert the user into the database", async () => {
            const res = await supertest(server)
            .post("/api/auth/register")
            .send({ username: "steve", password: "pass" });
            let response = res.body[0]
            expect(response.username).toBe('steve');
        });
    });
    describe("POST /api/auth/login", () => {
        it("should return 200 when passed correct data", () => {
            return supertest(server)
                .post("/api/auth/login")
                .send({ username: "steve", password: "pass" })
                .then(res => {
                    expect(res.status).toBe(200);
                    
                }); 
        });
     
        it("should fail with code 401 if passed incorrect data", () => {
            return supertest(server)
                .post("/api/auth/login")
                .send({ username: "steves", password: "pass" })
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
    
      });
      describe("GET /api/users", () => {
          let token;
          beforeAll( () =>{
             return supertest(server)
            .post("/api/auth/login")
            .send({ username: "steve", password: "pass" })
            .then(res => {
                console.log(res.statusCode)
                token = res.body.token;
            });
          });
        it("should return status code 401 if no token", () => {
            return supertest(server)
                .get("/api/strains")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });
        it('should return status 200 if correct token', () => {
            
            return supertest(server)
            .get("/api/strains")
            .set('Authorization', `Bearer ${token}`)
                .then(res => {
                    console.log()
                  expect(res.status).toBe(200)  
                });
            
        });
    });
});
