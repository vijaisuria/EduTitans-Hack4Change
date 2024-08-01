import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file for styling
import loadingGif from './loading1.gif'; // Import the loading GIF

const Loading = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hang tight! We're crafting your personalized experience.";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');

    if (roleParam) {
      console.log(roleParam);
      fetchLearningPath(roleParam);
    } else {
      console.error('Role parameter not found in query string');
      // Handle error scenario where role parameter is missing
    }
  }, []);

  const fetchLearningPath = async (role) => {
    try {
      const response = await fetch('http://localhost:8000/generate-learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: decodeURIComponent(role), // Decode URI component to handle encoded characters
          userSkills: "HTML, CSS, JavaScript, JQuery" // Example user skills; replace with actual data
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch learning path');
      }

      const data = await response.json();
      const jsonData = data.jsonData;
      sessionStorage.setItem('learningPath', JSON.stringify(jsonData)); // Store data in sessionStorage

      // Redirect to finalRoadmap page
      window.location.href = 'http://localhost:3000/finalRoadmap?role='+role;
    } catch (error) {
      console.error('Error fetching learning path:', error);
      // Handle error scenario
    }
  };

  const typeWriter = () => {
    let currentText = '';
    let index = 0;

    const typeWriterInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(typeWriterInterval); // Stop interval when text is fully typed
        fetchLearningPath(); // Fetch data after typing animation completes
      }
    }, 100); // Adjust typing speed as needed

    return () => clearInterval(typeWriterInterval); // Cleanup function to clear interval
  };

  useEffect(typeWriter, []); // Run typewriter effect once on component mount

  return (
    <div className="container-body">
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
        <p className="loading-text">{displayedText}</p>
      </div>
    </div>
  );
};

export default Loading;
