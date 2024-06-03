import Post from '../models/postModel.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author').sort({ createdAt: -1 }).limit(20);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = new Post({
            title,
            content,
            author: req.user.userId,
        });
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
