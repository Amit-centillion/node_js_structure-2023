const ENV_CCONST = {
  SERVER: {
    PORT: 5001,
  },
  DATABASE: {
    MONGO_URI:
      "mongodb+srv://amitjoshi:Dealing%40123@cluster0.vjxa6ad.mongodb.net",
    MONGO_DB_NAME: "API",
  },
  secreate: {
    jwt: process.env.JWT_SECRET || "CHENNAI_AIRPORT_SECRET",
    jwt_expiry: "50s",
    jwt_refresh_token:
      process.env.JWT_REFRESH_SECRET || "CHENNAI_AIRPORT_REFRESH_SECRET",
    jwt_refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || "30d",
    salt: process.env.SALT_ROUNDS || 10,
    jwt_password_expiry: "5m",
    token: process.env.JWT_TOKEN || "JWT_TOKEN",
    token_expiry: process.env.JWT_TOKEN_EXPIRY || "1",
  },
  sendMailDetail: {
    host: "smtp.googlemail.com",
    port: 465,
    secure: true,
    auth: {
      user: "amitjoshi6180@gmail.com", // amitcentillion@gmail.com
      pass: "zthznllzlwezmjrf", //  vgoqxduaezxragjb
    },
    from: "amitjoshi6180@gmail.com",
    subject: "Sending Email using Node.js",
    text: "send mail using node js!  \u{1F60A}",
  },
};

module.exports = {
  ENV_CCONST,
};
