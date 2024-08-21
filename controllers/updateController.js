const { updateGenreById, updateAlbumById } = require("../db/queries.js");

// exports.updateGenre = async (id, req, res) => {
// 	const { genreName } = req.body;
// 	let updates = { name: genreName };
// 	await updateGenreById(id, updates);
// };

// exports.updateAlbum = async (id, req, res) => {
// 	let { albumName } = req.body;
// 	let { artistName } = req.body;
// 	let { albumGenre } = req.body;
// 	let { albumYear } = req.body;
// 	let { albumImgUrl } = req.body;
// 	let { albumDesc } = req.body;

// 	let updates = {
// 		name: albumName,
// 		artist: artistName,
// 		genre_id: albumGenre,
// 		year: albumYear,
// 		img_url: albumImgUrl,
// 		description: albumDesc,
// 	};
// 	console.log(updates);
// 	await updateAlbumById(id, updates);
// };
