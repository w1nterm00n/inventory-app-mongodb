const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes/router");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", router);
app.get("/", (req, res) => {
	res.render("homepage");
});

const PORT = 3670;
const server = app.listen(PORT, () =>
	console.log(`Express app listening on port ${PORT}!`)
);

//db
const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = "musicDB";
const connectToDatabase = async () => {
	try {
		await client.connect();
		console.log(`Connected to the ${dbname} database`);
	} catch (err) {
		console.log(`Error connecting to database ${dbname}`);
	}
};

const main = async () => {
	try {
		await connectToDatabase();
	} catch (err) {
		console.log(`Error connecting to database ${dbname}`);
	} finally {
		await client.close();
	}
};

main();
