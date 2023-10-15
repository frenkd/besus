'use client';
import React from 'react';

const Action = ({ action }) => {
    return (
        <div className="action">
            <div className="actionImage">
                <img src={action.image} alt={action.description} />
            </div>
            <div className="actionDescription">
                <p>{action.description}</p>
            </div>

            <style jsx>{`
                .action {
                    border: 1px solid #e6e6e6;
                    margin-bottom: 20px;
                    background-color: #fff;
                }
                .profilePic {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .actionImage img {
                    width: 100%;
                }
                .actionDescription {
                    padding: 10px;
                }
            `}</style>
        </div>
    );
};

export default Action;
