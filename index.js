const { client, app } = require("./app");
const otpGenerator = require("otp-generator");

const db = client.db("url-shortener");

app.get("/:uuid", async (req, res) => {
  if (req.params) {
    const { uuid } = req.params;
    console.log(uuid);

    try {
      await client.connect();
      const url = db.collection("url");
      const findResult = await url.findOne({
        _id: uuid,
      });
      if(findResult)
      {
        res.redirect(findResult.url);
      }
      else {
        res.render("index", { error: "Page not found" });
      }
      
    } finally {
      await client.close();
    }
  } else {
    res.render("index", { error: "Page not found" });
  }
});

app.get("/", (req, res) => {
  console.log(req.headers["host"]);
  res.render("index");
});

app.post("/create", async (req, res) => {
  const shortened_string = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
    digits: false,
  });
  //get request body
  const { link } = req.body;
  ///store the link in the database
  try {
    await client.connect();

    const url = db.collection("url");
    const result = await url.insertOne({
      _id: shortened_string,
      url: link,
    });

    console.log(result);
    // data.push(subs);
  } finally {
    await client.close();
  }

  res.send({ link: `${req.headers["host"]}/${shortened_string}` });
});

app.listen(5000, () => {
  console.log("Server is up and listening on 5000");
});
