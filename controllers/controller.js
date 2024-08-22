const {
	getAllAlbums,
	getAllGenresAlbums,
	getGenreById,
	getAllGenres,
	getGenreNameById,
	getAlbumById,
	addGenre,
	addAlbum,
	updateGenreById,
} = require("../db/mongoQueries.js");
const { ObjectId } = require("mongodb");

exports.homepageGet = (req, res) => {
	res.render("homepage");
};

exports.allAlbumsGet = async (req, res) => {
	const albums = await getAllAlbums();
	res.render("allAlbums", { albums });
};

exports.allGenresGet = async (req, res) => {
	const genres = await getAllGenresAlbums();
	res.render("allGenres", { genres });
};

exports.findGenreById = async (id, res) => {
	const albums = await getGenreById(id);
	const genreName = await getGenreNameById(id);
	if (!albums) {
		return res.status(404).send("Albums not found");
	}
	res.render("genre", { albums: albums, id: id, genreName: genreName.name });
};

exports.findAlbumById = async (id, res) => {
	const album = await getAlbumById(id);
	const genreName = await getGenreNameById(album.genre_id);
	if (!album) {
		return res.status(404).send("Album not found");
	}
	res.render("album", { album: album, genreName: genreName.name });
};

exports.addGenreGet = (req, res) => {
	res.render("addGenre");
};
exports.addGenrePost = async (req, res) => {
	const name = req.body.genreName;
	await addGenre(name);
};

exports.addAlbumGet = async (req, res) => {
	const genres = await getAllGenres();
	res.render("addAlbum", { genres: genres });
};

exports.addAlbumPost = async (req, res) => {
	const albumName = req.body.albumName;
	const artistName = req.body.artistName;
	let albumGenre;
	try {
		albumGenre = new ObjectId(req.body.albumGenre);
	} catch (error) {
		return res.status(400).send("Invalid genre ID format");
	}
	const albumYear = req.body.albumYear;
	const albumPrice = req.body.albumPrice;
	const albumImgUrl = req.body.albumImgUrl;
	const albumDesc = req.body.albumDesc;
	await addAlbum(
		albumName,
		artistName,
		albumGenre,
		albumYear,
		albumPrice,
		albumImgUrl,
		albumDesc
	);
};

// exports.deleteAlbumById = async (id, res) => {
// 	await deleteAlbum(id);
// };

// exports.deleteGenreById = async (id, res) => {
// 	await deleteGenre(id);
// };

//UPDATE
exports.updateGenreGetForm = async (id, res) => {
	const genre = await getGenreNameById(id);
	res.render("changeGenre", { id: id, name: genre.name });
};

exports.updateGenre = async (id, req, res) => {
	const { genreName } = req.body;
	let updates = { name: genreName };
	await updateGenreById(id, updates);
};

// exports.updateAlbumGetForm = async (id, res) => {
// 	const genres = await getGenresList();
// 	const album = await getAlbumById(id);
// 	res.render("changeAlbum", { genres: genres, album: album });
// };

//UPDATE
