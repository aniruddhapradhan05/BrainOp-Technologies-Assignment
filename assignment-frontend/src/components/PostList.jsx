import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            if (!hasMore) return;
            setLoading(true);
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
                setPosts(prevPosts => [...prevPosts, ...response.data]);
                setHasMore(response.data.length > 0);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        loadPosts();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">Posts</h1>
            {posts.map(post => (
                <div key={post.id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                    <p className="text-gray-700 mt-2">{post.body}</p>
                </div>
            ))}
            {loading && <p className="text-center text-purple-500">Loading more posts...</p>}
            {!hasMore && <p className="text-center text-gray-500">No more posts to show.</p>}
        </div>
    );
};

export default PostList;
