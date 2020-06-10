const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());

})

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete Post

router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

// Connect to Mongodb Posts Collection

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://brando:Kitty22@cluster0-tv4hb.azure.mongodb.net/PosterApp?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })
    return client.db('PosterApp').collection('Posts')
}

module.exports = router;