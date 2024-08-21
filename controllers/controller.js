const { getAllAlbums } = require("../db/mongoQueries.js");

exports.homepageGet = (req, res) => {
	res.render("homepage");
};

exports.allAlbumsGet = async (req, res) => {
	const albums = await getAllAlbums();
	res.render("allAlbums", { albums });
	console.log(albums);
	//res.render("allAlbums");
};

exports.allGenresGet = async (req, res) => {
	//const genres = await getAllGenres();
	// res.render("allGenres", { genres });
	res.render("allGenres");
};
exports.genreGet = (req, res) => {
	res.render("genre");
};

// exports.addAlbumGet = async (req, res) => {
// 	const genres = await getGenresList();
// 	res.render("addAlbum", { genres: genres });
// };

// exports.deleteAlbumById = async (id, res) => {
// 	await deleteAlbum(id);
// };

// exports.deleteGenreById = async (id, res) => {
// 	await deleteGenre(id);
// };

// exports.addAlbumPost = async (req, res) => {
// 	const albumName = req.body.albumName;
// 	const artistName = req.body.artistName;
// 	const albumGenre = req.body.albumGenre;
// 	const albumYear = req.body.albumYear;
// 	const albumPrice = req.body.albumPrice;
// 	const albumImgUrl = req.body.albumImgUrl;
// 	const albumDesc = req.body.albumDesc;
// 	await addAlbum(
// 		albumName,
// 		artistName,
// 		albumGenre,
// 		albumYear,
// 		albumPrice,
// 		albumImgUrl,
// 		albumDesc
// 	);
// };

// exports.addGenreGet = (req, res) => {
// 	res.render("addGenre");
// };

// exports.addGenrePost = async (req, res) => {
// 	const name = req.body.genreName;
// 	await addGenre(name);
// };

// exports.findAlbumById = async (id, res) => {
// 	const album = await getAlbumById(id);
// 	if (!album) {
// 		return res.status(404).send("Album not found");
// 	}
// 	res.render("album", { album: album });
// };

// exports.findGenreById = async (id, res) => {
// 	const albums = await getGenreById(id);
// 	console.log(albums);
// 	if (!albums) {
// 		return res.status(404).send("Albums not found");
// 	}
// 	console.log("id of this genre: ", id);
// 	res.render("genre", { albums: albums, id: id });
// };

// exports.updateGenreGetForm = async (id, res) => {
// 	const genre = await getGenre(id);
// 	res.render("changeGenre", { id: id, name: genre[0].name });
// };

// exports.updateAlbumGetForm = async (id, res) => {
// 	const genres = await getGenresList();
// 	const album = await getAlbumById(id);
// 	res.render("changeAlbum", { genres: genres, album: album });
// };
