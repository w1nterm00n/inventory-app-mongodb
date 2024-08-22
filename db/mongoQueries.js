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

//GET queries
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

const getAllGenres = async () => {
	try {
		await connectToDatabase();
		let result = await genresCollection
			.aggregate([
				{
					$lookup: {
						from: "albums",
						localField: "_id",
						foreignField: "genre_id",
						as: "albums",
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						albumCount: { $size: "$albums" },
					},
				},
			])
			.toArray();
		return result;
	} catch (err) {
		console.error(`Error getting all genres: ${err}`);
	} finally {
		await client.close();
	}
};

const getGenreById = async (id) => {
	try {
		await connectToDatabase();
		let result = await albumsCollection.find({ genre_id: id }).toArray();
		return result;
	} catch (err) {
		console.error(`Error getting genre by ID: ${err}`);
	} finally {
		await client.close();
	}
};

const getGenreNameById = async (id) => {
	try {
		await connectToDatabase();
		let result = await genresCollection.findOne({ _id: id });
		return result;
	} catch (err) {
		console.error(`Error getting genre by ID: ${err}`);
	} finally {
		await client.close();
	}
};

const getAlbumById = async (id) => {
	try {
		await connectToDatabase();
		let result = await albumsCollection.findOne({ _id: id });
		return result;
	} catch (err) {
		console.error(`Error getting album by ID: ${err}`);
	} finally {
		await client.close();
	}
};
//GET queries

module.exports = {
	getAllAlbums,
	getAllGenres,
	getGenreById,
	getGenreNameById,
	getAlbumById,
};
