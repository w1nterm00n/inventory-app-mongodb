const { Router } = require("express");
const controller = require("../controllers/controller");
const updateController = require("../controllers/updateController");
const router = Router();

router.get("/", controller.homepageGet);

router.get("/allAlbums", controller.allAlbumsGet);
router.get("/allGenres", controller.allGenresGet);

// router.get("/addAlbum", (req, res) => {
// 	controller.addAlbumGet(req, res);
// });

// router.post("/addAlbum", (req, res) => {
// 	controller.addAlbumPost(req, res);
// 	res.redirect("/");
// });

// router.get("/addGenre", controller.addGenreGet);

// router.post("/addGenre", (req, res) => {
// 	controller.addGenrePost(req, res);
// 	res.redirect("/");
// });

// router.get("/genre/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.findGenreById(id, res);
// });

// router.get("/album/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.findAlbumById(id, res);
// });

// router.delete("/album/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.deleteAlbumById(id, res);
// 	res.redirect("/");
// });

// router.delete("/genre/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.deleteGenreById(id, res);
// 	res.redirect("/");
// });

//Update genre

// router.get("/genre/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.updateGenreGetForm(id, res);
// });
// router.post("/genre/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	updateController.updateGenre(id, req, res);
// 	res.redirect("/");
// });

//Update genre

//Update album

// router.get("/album/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	controller.updateAlbumGetForm(id, res);
// });
// router.post("/album/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id, 10);
// 	updateController.updateAlbum(id, req, res);
// 	res.redirect("/");
// });

//Update album

module.exports = router;
