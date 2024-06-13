let model = require("../model/model");

// Enabling mangodb to do case-insensitive and wholeword search
const caseInsensitiveSearch = (str) => { return new RegExp((str && `^${str}$`), "i") }
// Enabling blur search
const blurSearch = (str) => { return new RegExp(str, "i") }

const searchClothes = async (req, res) => {
    try {
        // get query parameters from URL
        const category = req.query.category;
        const subcategory = req.query.subcategory;
        const condition = req.query.condition;
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const size = req.query.size;
        const location = req.query.location;
        const searchText = req.query.searchText;

        const priceFilter = {
            $gte: minPrice ? parseInt(minPrice) : 0,
            $lte: maxPrice ? parseInt(maxPrice) : 100000000,
        };

        // Get items from DB dynamically and apply case-insensitive search to replace undefined filters with empty strings
        const query = {
            // Exact Search with filters
            category: caseInsensitiveSearch(category),
            subcategory: caseInsensitiveSearch(subcategory),
            condition: caseInsensitiveSearch(condition),
            size: caseInsensitiveSearch(size),
            location: caseInsensitiveSearch(location),

            // Range search with price range
            price: priceFilter,

            // Blur Search with the top search box.
            name: blurSearch(searchText),
        }

        const allClothes = await model.searchClothes(query);

        // Render to clothes.handlebar
        res.render("clothes", { items: allClothes });
    } catch (error) {
        console.error(error)
        res.render("clothes", { items: [], error });
    }
};

const addSearchPrompts = async (req, res) => {
    try {
        const { searchPrompts } = req.body;
        console.log(req.body)
        const count = await model.addSearchPrompts(searchPrompts);
        res.send(count.toString() + "added");
    } catch (error) {
        res.json({ statusCode: 400, message: err });
    }
};

const deleteSearchPrompts = async (req, res) => {
    try {
        const { searchPrompts } = req.body;
        const count = await model.deleteSearchPrompts(searchPrompts);
        res.send(count.toString() + " deleted");
    } catch (error) {
        res.json({ statusCode: 400, message: err });
    }
};

const searchSearchPrompts = async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.send([]);
        }
        //Get results from DB dynamically
        const searchPrompts = await model.searchSearchPrompts(query);
        const normalisedPrompts = searchPrompts.map((s, i) => {
            return {
                title: s.value,
                id: i,
                data: s,
            };
        });
        res.send(normalisedPrompts);
    } catch (error) {
        res.json({ statusCode: 400, message: err });
    }
};

const getAllPhotoWallImages = async (req, res) => {
    const allImages = await model.getAllPhotoWallImages();
    return allImages;
};

const createUser = async (req, res) => {
    const newUser = {
        email: req.body.email,
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
    }
    const resp = await model.createUser(newUser);
    return resp;
}

const loginUser = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    }
    const resp = await model.loginUser(user);
    return resp;
}

module.exports = {
    searchClothes,
    addSearchPrompts,
    deleteSearchPrompts,
    searchSearchPrompts,
    getAllPhotoWallImages,
    createUser,
    loginUser,
};

