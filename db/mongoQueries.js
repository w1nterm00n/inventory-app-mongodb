const { MongoClient } = require("mongodb");
const uri = require("../atlas_uri");
const { ObjectId } = require("mongodb");
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

//INSERT queries
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
//INSERT queries

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

async function updateAlbumById(id_album, updates) {
	try {
		await connectToDatabase();
		for (const [key, value] of Object.entries(updates)) {
			await albumsCollection.updateOne(
				{ _id: id_album },
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

async function setGenreUnknown(id_genre) {
	try {
		await connectToDatabase();

		await albumsCollection.updateMany(
			{ genre_id: id_genre },
			{ $set: { genre_id: new ObjectId("66c79485433d349f6fa93736") } }
		);
	} catch (err) {
		console.error(`Error updating album: ${err}`);
		throw err;
	}
}
//UPDATE queries

//DELETE queries
const deleteAlbum = async (id) => {
	try {
		await connectToDatabase();
		await albumsCollection.deleteOne({ _id: id });
	} catch (err) {
		console.error(`Error deleting album: ${err}`);
	} finally {
		await client.close();
	}
};

const deleteGenre = async (id, res) => {
	try {
		await connectToDatabase();
		let genre = await getGenreNameById(id);
		if (genre.name == "Genre Unknown") {
			console.error("You can't delete 'Genre Unknown' ");
		} else {
			await setGenreUnknown(id);
			await genresCollection.deleteOne({ _id: id });
		}
	} catch (err) {
		console.error(`Error deleting album: ${err}`);
	} finally {
		await client.close();
	}
};
//DELETE queries

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
	updateAlbumById,
	deleteAlbum,
	deleteGenre,
};
