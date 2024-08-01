import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userInfoParam = params.get('userInfo');

        if (userInfoParam) {
            const decodedUserInfo = JSON.parse(decodeURIComponent(userInfoParam));
            setUserInfo(decodedUserInfo);
            
            // Set session storage after 2 seconds
            setTimeout(() => {
                sessionStorage.setItem('name', decodedUserInfo.name);
                sessionStorage.setItem('email', decodedUserInfo.email);
                sessionStorage.setItem('picture', decodedUserInfo.picture);
                sessionStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to '/'
                navigate('/');
            }, 2000);
        }
    }, [location, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {userInfo ? (
                <div>
                    <h1>Hi, {userInfo.name}</h1>
                    <p>Email: {userInfo.email}</p>
                    <img 
                        src={userInfo.picture} 
                        alt="Profile" 
                        style={{ 
                            width: '150px', 
                            height: '150px', 
                            borderRadius: '50%', 
                            objectFit: 'cover' 
                        }} 
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
