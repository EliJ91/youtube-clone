import React from 'react';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './App.css';
import RecomendedVideos from './components/RecommendedVideos/RecomendedVideos';
import VideoPage from './components/VideoPage/VideoPage'
import {BrowserRouter as Router,  Route} from "react-router-dom"



function appContainer() {
  return (
    <div className="app__page">
      <Sidebar/>
      <RecomendedVideos/>      
    </div>
  )
}




function App() {
  


  return (
    <div className="app">   

      <Router>
      <Header/>
        <Route path="/" exact component={appContainer} />
        <Route path="/watch" component={VideoPage} />
      </Router>
      
    </div>
  );
}

export default App;
