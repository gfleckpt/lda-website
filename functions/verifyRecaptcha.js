// functions/verifyRecaptcha.js
const axios = require("axios");

exports.handler = async (event, context) => {
  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
  const { token } = JSON.parse(event.body);

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No token provided" }),
    };
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    );
    const data = response.data;

    if (data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "reCAPTCHA verified successfully" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "reCAPTCHA verification failed" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error }),
    };
  }
};
