const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const connectToDatabase = async () => {
	try {
		await client.connect();
		console.log(`Connected to the ${dbname} database`);
	} catch (err) {
		console.log(`Error connecting to database ${dbname}`);
	}
};
const dbname = "musicDB";
const albumsCollection = client.db(dbname).collection("albums");
const genresCollection = client.db(dbname).collection("genres");

//queries
const getAllAlbums = async () => {
	try {
		await connectToDatabase();
		let result = await albumsCollection.find().toArray();
		return result;
	} catch (err) {
		console.error(`Error getting all albumst: ${err}`);
	} finally {
		await client.close();
	}
};

module.exports = {
	getAllAlbums,
};
