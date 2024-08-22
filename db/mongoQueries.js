const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");

const client = new MongoClient(uri);
const connectToDatabase = async () => {
	try {
		await client.connect();
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
		console.error(`Error getting all albums: ${err}`);
	} finally {
		await client.close();
	}
};

const getAllGenresAlbums = async () => {
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

const getAllGenres = async () => {
	try {
		await connectToDatabase();
		let result = await genresCollection.find().toArray();
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

const addGenre = async (name) => {
	try {
		await connectToDatabase();
		await genresCollection.insertOne({ name: name });
	} catch (err) {
		console.error(`Error adding genre: ${err}`);
	} finally {
		await client.close();
	}
};
const addAlbum = async (
	albumName,
	artistName,
	albumGenre,
	albumYear,
	albumPrice,
	albumImgUrl,
	albumDesc
) => {
	try {
		await connectToDatabase();
		await albumsCollection.insertOne({
			name: albumName,
			artist: artistName,
			genre_id: albumGenre,
			year: albumYear,
			price: albumPrice,
			img_url: albumImgUrl,
			description: albumDesc,
		});
	} catch (err) {
		console.error(`Error adding album: ${err}`);
	} finally {
		await client.close();
	}
};

//UPDATE queries

async function updateGenreById(id_genre, updates) {
	try {
		await connectToDatabase();
		for (const [key, value] of Object.entries(updates)) {
			await genresCollection.updateOne(
				{ _id: id_genre },
				{ $set: { [key]: value } }
			);
		}
		return "Update completed";
	} catch (err) {
		console.error(`Error updating field: ${err}`);
		throw err;
	} finally {
		await client.close();
	}
}

module.exports = {
	getAllAlbums,
	getAllGenresAlbums,
	getGenreById,
	getGenreNameById,
	getAlbumById,
	addGenre,
	getAllGenres,
	addAlbum,
	updateGenreById,
};
