'use client';
import React from 'react';

const Post = ({ profilePic, username, image, description }) => {
    return (
        <div className="post">
            <div className="postHeader">
                <img src={profilePic} alt={username} className="profilePic" />
                <p>{username}</p>
            </div>
            <div className="postImage">
                <img src={image} alt={description} />
            </div>
            <div className="postDescription">
                <p>{description}</p>
            </div>

            <style jsx>{`
                .post {
                    border: 1px solid #e6e6e6;
                    margin-bottom: 20px;
                    background-color: #fff;
                }
                .postHeader {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                }
                .profilePic {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .postImage img {
                    width: 100%;
                }
                .postDescription {
                    padding: 10px;
                }
            `}</style>
        </div>
    );
};

export default Post;
