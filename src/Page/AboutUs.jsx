import React from 'react';
import './AboutUs.css';


const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-us-text">
                <h1>About Us</h1>
                <p>
                    Welcome to Eventura, your trusted partner in event planning and management. At Eventura, we specialize in crafting memorable experiences for all types of occasions, from corporate conferences and product launches to weddings and private celebrations. Our dedicated team of professionals brings creativity, attention to detail, and a passion for excellence to every event we organize. We understand that each client is unique, which is why we tailor our services to meet your specific needs and vision. With a proven track record of successful events and satisfied clients, Eventura is committed to delivering top-quality service, innovative solutions, and seamless execution. Let us handle the logistics while you enjoy a stress-free and unforgettable event. Discover why so many clients trust Eventura to bring their ideas to life.
                </p>
                <button 
                    className="about-us-home-btn"
                    onClick={() => window.location.href = '/'}
                >
                    Back to Home
                </button>
            </div>
            <div className="about-us-image">
                <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
                    alt="Eventura team collaborating on event planning" 
                />
            </div>
        </div>
    );
};

export default AboutUs;