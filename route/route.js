// Routes are the files that are responsible to serve the endpoints of our application to the user.
var express = require("express");
let router = express.Router();
let controller = require("../controller/controller");

// Endpoint to get search query from ULR and render search results page
router.get("/clothes", async (req, res) => {
    controller.searchClothes(req, res);
});

// Endpoint to query popular search strings
router.get("/search-prompts", async (req, res) => {
    controller.searchSearchPrompts(req, res);
});
// Endpoint to add popular search strings
router.post("/search-prompts/add", async (req, res) => {
    controller.addSearchPrompts(req, res);
});
// Endpoint to delete popular search strings
router.post("/search-prompts/delete", async (req, res) => {
    controller.deleteSearchPrompts(req, res);
});



// End point to get photo wall pages
router.get("/api/photo-wall", async (req, res) => {
    const allPhotos = await controller.getAllPhotoWallImages();
    res.json(allPhotos.map((item) => item.image));
});

//create a new user to DB
router.post("/api/register", async (req, res) => {
    const response = await controller.createUser(req, res);
    if (response.error) {
        res.status(400).json(response); // Return a 400 status code with the error message
    } else {
        res.json(response)
    }
})

// Login endpoint
router.post("/api/login", async (req, res) => {
    const response = await controller.loginUser(req, res);
    if (response.error) {
        res.status(400).json(response); // Return a 400 status code with the error message
    } else {
        res.json(response)
    }
})

module.exports = router;
