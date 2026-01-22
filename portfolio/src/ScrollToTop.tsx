import React, { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLaunching, setIsLaunching] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        setIsLaunching(true);

        // Add a fun delay with rocket animation
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setIsLaunching(false);
        }, 300);
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl 
            bg-gradient-to-br from-orange-400 to-pink-500 text-white text-2xl
            hover:from-orange-500 hover:to-pink-600 hover:scale-110
            transition-all duration-300 ease-out
            ${isLaunching ? "animate-bounce -translate-y-4" : ""}`}
                    title="Blast off to top! 🚀"
                >
                    <span className={`inline-block ${isLaunching ? "animate-wiggle" : ""}`}>
                        🚀
                    </span>
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
