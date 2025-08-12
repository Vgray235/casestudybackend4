// backend/middleware/rateLimiter.js
// import redis from '../config/redisClient.js';

// const POINTS = parseInt(process.env.RATE_LIMIT_POINTS || '60', 10);
// const WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || '60', 10);

// const rateLimiter = async (req, res, next) => {
//   try {
//     const key = `rl:${req.ip}`;
//     const current = await redis.incr(key);

//     if (current === 1) {
//       await redis.expire(key, WINDOW);
//     }

//     if (current > POINTS) {
//       return res.status(429).json({ error: 'Too many requests' });
//     }

//     next();
//   } catch (err) {
//     console.error('Rate limiter error', err);
//     next();
//   }
// };

// export default rateLimiter;
// import { redisClient } from "../config/redisClient.js";

// export function rateLimit({ windowSec = 60, limit = 2 } = {}) {
//   return async (req, res, next) => {
//     try {
//       const key = `rate:${req.ip}`;
//       const current = await redisClient.incr(key);
//       if (current === 1) await redisClient.expire(key, windowSec);
//       if (current > limit) return res.status(429).json({ error: "Too many requests" });
//     } catch (err) {
//       console.error("Rate limiter error", err);

//     }
//     next();
//   };
// }

// export function rateLimit({ windowSec = 60, limit = 2 } = {}) {
//   return async (req, res, next) => {
//     try {
//       const key = `rate:${req.ip}`;
//       const current = await redisClient.incr(key);
//       if (current === 1) await redisClient.expire(key, windowSec);
//       if (current > limit) return res.status(429).json({ error: "Too many requests" });
//     } catch (err) {
//       console.error("Rate limiter error", err);
//     }
//     next();
//   };
// }
import { redisClient } from "../config/redisClient.js";

export function rateLimit({ windowSec = 60, limit = 30 } = {}) {
  return async (req, res, next) => {
    try {
      const key = `rate:${req.ip}`;
      const current = await redisClient.incr(key);
      if (current === 1) await redisClient.expire(key, windowSec);
      if (current > limit) return res.status(429).json({ error: "Too many requests" });
    } catch (err) {
      console.error("Rate limiter error", err);
    }
    next();
  };
}

// import rateLimit from "express-rate-limit";

// export const rateLimit = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5,
//   handler: (req, res) => {
//     res.status(429).json({ error: "Too many requests, please try again later." });
//   }
// });
