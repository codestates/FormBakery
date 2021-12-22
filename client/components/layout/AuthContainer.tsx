import React from "react";

const AuthContainer = ({ children }) => {
    return (
        <main className="min-h-login mt-2 text-center pt-12 pb-10">
            {children}
        </main>
    );
};

export default AuthContainer;
