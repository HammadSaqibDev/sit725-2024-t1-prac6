let client = require("../dbConnection");
let collection = client.db("test").collection("items");
let searchPromptsCollection = client.db("test").collection("searchPrompts");
let photoWallCollection = client.db("test").collection("photo_wall");
let userCollection = client.db("test").collection("users")
const { getCache, saveCache } = require("./cache");

const searchClothes = async (searchQuery) => {
    const items = await collection.find(searchQuery).toArray();
    return items;
};

const addSearchPrompts = async (searchPrompts) => {
    try {
        const bulkOps = searchPrompts.map((searchPrompt) => ({
            // add prompts and prevent duplicates
            updateOne: {
                filter: { value: searchPrompt },
                update: { $setOnInsert: { value: searchPrompt } },
                upsert: true,
            },
        }));

        const result = await searchPromptsCollection.bulkWrite(bulkOps);
        console.log(`${result.upsertedCount} strings inserted.`);
        return result.upsertedCount;
    } catch (error) {
        console.log("Error inserting strings:", error);
    }
};

const deleteSearchPrompts = async (searchPrompts) => {
    console.log(
        "🚀 ~ file: model.js:33 ~ deleteSearchPrompts ~ searchPrompts:",
        searchPrompts
    );
    try {
        const result = await searchPromptsCollection.deleteMany({
            value: { $in: searchPrompts },
        });
        console.log(`${result.deletedCount} strings deleted.`);
        return result.deletedCount;
    } catch (error) {
        console.log("Error deleting strings:", error);
    }
};

const searchSearchPrompts = async (searchString) => {
    try {
        // Retrieve data from cache
        const searchPromptsFromCache = getCache(searchString);
        if (searchPromptsFromCache) {
            console.log("Cache hit");
            return searchPromptsFromCache;
        }

        // If cache is not hit, retrieve data through search function
        console.log("Cache missed");
        const regex = new RegExp(searchString, "i");
        const query = { value: regex };
        const result = await searchPromptsCollection.find(query).toArray();

        // saved retrieved data in the cache
        saveCache(searchString, result);

        return result;
    } catch (error) {
        console.log("Error searching strings:", error);
    }
};

const getAllPhotoWallImages = async () => {
    const items = await photoWallCollection.find().toArray();
    return items;
};

const createUser = async (user) => {
    // Check if the username already exists
    const existingUser = await userCollection.findOne({ username: user.username });
    if (existingUser) {
        return { error: "Username already exists" };
    }
    await userCollection.insertOne(user);
    let response = { email: user.email, username: user.username, fullName: user.fullName }
    return response;
}

const loginUser = async (user) => {
    // Check if the username already exists
    const existingUser = await userCollection.findOne({ username: user.username, password: user.password });
    if (existingUser) {
        let response = { email: existingUser.email, username: existingUser.username, fullName: existingUser.fullName }
        return response;
    }
    return { error: "Please provide a valid username or password" };
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
