'use client';
import React from 'react';

const Post = ({ profilePic, user, image, description, time }) => {
    return (
        <div className="post">
            <div className="postHeader">
                <img className='profilePic' src={image} alt={description} />
                <p>{user} posted their sustainable action at {time}</p>
            </div>
            <div className="postImage">
                <img src={image} alt={description} />
            </div>
            <div className="postDescription">
                <p>{description}</p>
            </div>

            <style jsx>{`
                .post {
                    // rounded corners
                    border-radius: 10px;
                    margin-bottom: 20px;
                    background-color: #14532D;
                }
                .postHeader {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    font-family: "Open Sans", sans-serif;
                    font-size: 12px;
                    color: #ccc;
                }
                .profilePic {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .postImage img {
                    width: 100%;
                }
                .postDescription {
                    padding: 10px;
                    font-family: "Open Sans", sans-serif;
                }
            `}</style>
        </div>
    );
};

export default Post;
