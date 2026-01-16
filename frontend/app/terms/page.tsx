import React from 'react';

const TermsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <div className="prose max-w-none">
                <p className="mb-4">
                    Welcome to our e-commerce store. By accessing this website, we assume you accept these terms and conditions.
                    Do not continue to use our website if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">License</h2>
                <p className="mb-4">
                    Unless otherwise stated, we owning the intellectual property rights for all material on this website.
                    All intellectual property rights are reserved. You may access this from our store for your own personal use subjected to restrictions set in these terms and conditions.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">User Comments</h2>
                <p className="mb-4">
                    This Agreement shall begin on the date hereof. Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website.
                    We do not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of our company, its agents and/or affiliates.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Product Disclaimer</h2>
                <p className="mb-4">
                    All products are sold "as is". We make no warranties that the products will meet your specific requirements.
                </p>
            </div>
        </div>
    );
};

export default TermsPage;
