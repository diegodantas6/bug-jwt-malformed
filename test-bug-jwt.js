const jwt = require("jsonwebtoken");
const privateKey = "bug";

const defaultAlgorithmJWT = {
  alg: "HS256",
  typ: "JWT",
};

const getAlgorithm = (algorithm = defaultAlgorithmJWT) => {
  if (typeof algorithm === "object") algorithm = JSON.stringify(algorithm);
  return Buffer.from(algorithm).toString("base64");
};

const generateToken = (obj = {}) => {
  const token = jwtSign(obj, process.env.JWT_PRIVATE_KEY, {
    noTimestamp: true,
  }).split(".");
  token.shift();

  const jwt = token.join(".");

  logger.debug("Generated token", {
    originData: `Object: ${JSON.stringify(obj, null, 2)}\n\nToken: ${jwt}`,
    eventId: obj.process_id,
    eventCategory: obj.event,
  });

  return jwt;
};

const parseToken = (token) =>
  jwtVerify(`${getAlgorithm()}.${token}`, process.env.JWT_PRIVATE_KEY);

const obj1 = {
  teste: "obj1",
  name: "Diego Dantas",
  username: "diego.dantas",
  especial: "mãe 1",
};

const token = jwt.sign(obj1, privateKey);
// console.log('token: ' + token);

const obj2 = {
  teste: "obj2",
  especial: "mãe 2",
  token,
};

const token2 = jwt.sign(obj2, privateKey);
// console.log('token2: ' + token2);

jwt.verify(token2, privateKey, function (err, decoded) {
  if (err) return console.error(err);

  console.log(decoded);

  jwt.verify(decoded.token, privateKey, function (err, decoded) {
    if (err) return console.error(err);

    console.log(decoded);
  });
});
