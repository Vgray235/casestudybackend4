// export function ensureAuth(req, res, next) {
//   // Allow session check
//   if (req.session && req.session.user) {
//     return next();
//   }

//   // TEMP: Allow manual header token for Postman
//   if (req.headers["x-test-auth"] === "test") {
//     return next();
//   }

//   return res.status(401).json({ error: "Unauthorized" });
// }

// backend/middleware/auth.js

// Middleware to ensure authentication
// export function ensureAuth(req, res, next) {
//   // ✅ Allow if logged in via session
//   if (req.session && req.session.user) {
//     return next();
//   }

//   // ✅ Allow Postman testing if header matches
//   // Send in Postman: Header -> Key: x-test-auth, Value: test
//   const testAuth = req.headers["x-test-auth"];
//   if (testAuth && testAuth.toString().trim() === "test") {
//     return next();
//   }

//   // ❌ Otherwise block
//   return res.status(401).json({ error: "Unauthorized" });
// }

// backend/middleware/auth.js
// backend/middleware/auth.js
export function ensureAuth(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}
