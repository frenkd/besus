'use client';

import React from 'react';
import Post from './post';

const PostFeed = ({ posts }) => {
    return (
        <div className="feed">
            {posts.map(post => (
                <Post
                    key={post.id}
                    profilePic={post.profilePic}
                    user={post.user}
                    time={post.time}
                    image={post.image}
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
