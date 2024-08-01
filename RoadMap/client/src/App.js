// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import RoadmapPage from './components/roadmap';
import ResponsiveAppBar from './components/navbar'

import LandingPage from './components/LandingPage/LandingPage';
import Loading from './components/LoadingPage';
import Profile from './components/Profile';
import RoadmapPage from './components/FinalRoadmap/FinalRoadmap';
import RoadmapList from './components/roadmap';

import Roadmap1 from './components/roadmap/roadmap1';
import Roadmap2 from './components/roadmap/roadmap2';
import Roadmap3 from './components/roadmap/roadmap3';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ResponsiveAppBar />}>
          <Route index element={<LandingPage />} />
          <Route path="loading" element={<Loading />} />
          <Route path="roadmaps" element={<RoadmapList />} />
          <Route path='roadmap/1' element={<Roadmap1 />}/>
          <Route path='roadmap/2' element={<Roadmap2 />}/>
          <Route path='roadmap/3' element={<Roadmap3 />}/>
          <Route path='profile' element={<Profile />} />
          <Route path='finalRoadmap' element={<RoadmapPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
