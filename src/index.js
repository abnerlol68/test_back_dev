const conf = require("./config.js");
const app = require('./app.js');

app.listen(conf.PORT, () => {
  console.log(`API is listening on port ${conf.PORT}`);
});
