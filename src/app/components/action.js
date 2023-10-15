'use client';
import React from 'react';

const Action = ({ action }) => {
    return (
        <div className="action">
            <div className="actionDescription">
                <p>{action?.description}</p>
            </div>

            <style jsx>{`
                .action {
                    border: 0px solid #e6e6e6;
                    margin-bottom: 20px;
                    background-color: #058417;
                    //rounded corners
                    border-radius: 3px;
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
