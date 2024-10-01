const { redisClient } = require("../config/cache");

const cacheMiddleWare = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  //Check ว่า method ที่รับเข้ามาเป็นประเภท GET ใช่ไหม
  if (req.method === "GET") {
    const cacheData = redisClient.get(cacheKey);
    if (cacheData) {
      return res.status(200).json(JSON.parse(cacheData));
    }
  }

  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    await redisClient.del(cacheKey);
  }
  //Custom logic สำหรับส่งข้อมูลไปยังปลายทางของ middleware
  res.sendResponse = res.json;
  res.json = (data) => {
    redisClient.set(JSON.stringify(data), "EX", 3600);
    return res.sendResponse(data);
  };
  //ไปยัง Function ถัดไป
  next();
};
