const express = require("express");
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middleware/auth");
const { capturePayment, verifySignature } = require("../controllers/Payments");
const router = express.Router();

router.post("/capturePament", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;
