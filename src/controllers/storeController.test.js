// const request = require("supertest");
// const express = require("express");
// const { getAllStore } = require("../controllers/storeController");
// const mockingoose = require("mockingoose");
// const Store = require("../models/storeModel");
// const redisMock = require("redis-mock");
//
// // Mock Redis Client
// const redisClient = redisMock.createClient();
// jest.mock("../config/cache.js", () => ({
//   redisClient,
// }));
//
// const app = express();
// app.use(express.json());
//
// // Define route for testing
// app.get("/stores", getAllStore);
//
// // Mock Store model data
// const storeData = [
//   {
//     _id: "storeId1",
//     storename: "Test Store 1",
//     location: "Test Location 1",
//     owner: "Owner1",
//     products: [],
//   },
// ];
//
// // Test getAllStore
// describe("GET /stores", () => {
//   it("should return stores from Redis cache", async () => {
//     // Mock Redis Cache
//     redisClient.get = jest.fn().mockResolvedValue(JSON.stringify(storeData));
//
//     const response = await request(app).get("/stores");
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("from Cache");
//     expect(response.body.data).toEqual(storeData);
//   });
//
//   it("should fetch stores from DB and set Redis cache if cache is empty", async () => {
//     redisClient.get = jest.fn().mockResolvedValue(null); // No cache
//     mockingoose(Store).toReturn(storeData, "find");
//
//     const response = await request(app).get("/stores");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(storeData);
//     expect(redisClient.set).toHaveBeenCalledWith(
//       "stores",
//       JSON.stringify(storeData),
//     );
//   });
// });
