const pool = require("./pool");

async function getAllAlbums() {
	const { rows } = await pool.query(
		"SELECT album.id_album, album.name, album.artist, album.year, album.price, album.img_url, genre.name AS genre_name FROM album INNER JOIN genre ON album.genre_id = genre.id_genre;"
	);
	return rows;
}

async function getAllGenres() {
	const { rows } = await pool.query(
		"SELECT genre.name, genre.id_genre, COUNT(album.id_album) AS album_count\
        FROM genre\
        LEFT JOIN album ON genre.id_genre = album.genre_id\
        GROUP BY genre.name, genre.id_genre;"
	);
	return rows;
}

async function getAlbumById(id) {
	const { rows } = await pool.query("SELECT * FROM album WHERE id_album = $1", [
		id,
	]);
	return rows[0];
}

async function getGenreById(id) {
	const { rows } = await pool.query(
		"SELECT album.name, album.id_album, album.artist, album.year, album.price, album.genre_id, album.img_url,\
        genre.name AS genre_name FROM album\
        INNER JOIN genre ON album.genre_id = genre.id_genre WHERE album.genre_id = $1;",
		[id]
	);
	return rows;
}

async function addGenre(name) {
	await pool.query("INSERT INTO genre (name) VALUES ($1)", [name]);
}

async function getGenresList() {
	const { rows } = await pool.query("SELECT * FROM genre");
	return rows; //id_genre, name
}

async function addAlbum(
	albumName,
	artistName,
	albumGenre,
	albumYear,
	albumPrice,
	albumImgUrl,
	albumDesc
) {
	await pool.query(
		"INSERT INTO album (name, artist, genre_id, year, price, img_url, description)\
         VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[
			albumName,
			artistName,
			albumGenre,
			albumYear,
			albumPrice,
			albumImgUrl,
			albumDesc,
		]
	);
}

async function deleteAlbum(id) {
	await pool.query("DELETE FROM album WHERE id_album = ($1)", [id]);
}

async function deleteGenre(id) {
	if (id === 8) {
		throw new Error("Cannot delete 'genre unknown'.");
	}
	await pool.query(
		`UPDATE album
         SET genre_id = 8
         WHERE genre_id = $1;`,
		[id]
	);
	await pool.query(
		`DELETE FROM genre
         WHERE id_genre = $1;`,
		[id]
	);
}

async function getGenre(id) {
	const { rows } = await pool.query(
		"SELECT * FROM genre WHERE id_genre = ($1)",
		[id]
	);
	return rows;
}

async function updateGenreById(id_genre, updates) {
	const setClause = Object.keys(updates)
		.map((key, index) => `${key} = $${index + 2}`)
		.join(", ");
	const query = `UPDATE genre SET ${setClause} WHERE id_genre = $1`;

	try {
		await pool.query(query, [id_genre, ...Object.values(updates)]);
	} catch (err) {
		console.error("Error updating genre:", err);
		throw err;
	}
}

async function updateAlbumById(id_album, updates) {
	const setClause = Object.keys(updates)
		.map((key, index) => `${key} = $${index + 2}`)
		.join(", ");
	const query = `UPDATE album SET ${setClause} WHERE id_album = $1`;

	try {
		await pool.query(query, [id_album, ...Object.values(updates)]);
	} catch (err) {
		console.error("Error updating album:", err);
		throw err;
	}
}

module.exports = {
	getAllAlbums,
	getAllGenres,
	getAlbumById,
	getGenreById,
	addGenre,
	getGenresList,
	addAlbum,
	deleteAlbum,
	deleteGenre,
	getGenre,
	updateGenreById,
	updateAlbumById,
};
