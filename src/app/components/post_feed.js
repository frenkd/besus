'use client';

import React from 'react';
import Post from './post';

const PostFeed = ({ posts }) => {
    console.log(posts);
    return (
        <div className="feed">
            {posts.map(post => (
                <Post
                    key={post.id}
                    user={post.user}
                    time={post.time}
                    imageUrl={post.imageUrl}
                    description={post.description}
                />
            ))}

            <style jsx>{`
                .feed {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
};

export default PostFeed;
