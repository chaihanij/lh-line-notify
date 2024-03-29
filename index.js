const express = require("express");
const app = express();
var request = require("request");

app.get("/", (req, res) => {
  res.json({ index: "lh-line-notify" });
});

app.get("/sent-to-notify", (req, res) => {
  let token = req.query.token;
  let message = req.query.message;
  if (token && message) {
    message = "message=".concat(message);
    request.post(
      {
        url: "https://notify-api.line.me/api/notify",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer ".concat(token)
        },
        body: message
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: string(error) });
        }
        res.setHeader("Content-Type", "application/json");
        res.send(body);
      }
    );
  } else {
    res
      .status(400)
      .json({ message: "Bad Request. require token and messages " });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
