import React from 'react';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css';
import RecomendedVideos from './components/RecommendedVideos/RecomendedVideos';

function App() {
  return (
    <div className="app">
      <Header/>
      <div className="app__page">
        <Sidebar/>
        <RecomendedVideos/>
      </div>
      
      {/* Sidebar */}
      
    </div>
  );
}

export default App;
