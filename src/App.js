import React, {useState} from 'react';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './App.scss';
import RecomendedVideos from './components/RecommendedVideos/RecomendedVideos';
import VideoPage from './components/VideoPage/VideoPage'
import NewLoginUi from './components/Login/newLoginUi'
import {BrowserRouter as Router,  Route} from "react-router-dom"



function AppContainer(props) {
  return (
    <div className="app__page">
      <Sidebar  expandSidebar={props.expandSidebar}/>
      <RecomendedVideos setExpandSidebar={props.setExpandSidebar}/>      
    </div>
  )
}




function App() {
  const[expandSidebar,setExpandSidebar]=useState(false)

  return (
    <div className="app">   

      <Router>
      <Header setExpandSidebar={setExpandSidebar} expandSidebar={expandSidebar}/>
        {/* <Route path="/" exact component={appContainer(type)} /> */}
        <Route path="/" exact render={(props)=><AppContainer expandSidebar={expandSidebar} setExpandSidebar={setExpandSidebar}/>} />
        <Route path="/watch/:movieId" render={(props)=><VideoPage setExpandSidebar={setExpandSidebar} expandSidebar={expandSidebar} {...props}/>} />
        <Route path="/login" render={NewLoginUi}/>
      </Router>
      
    </div>
  );
}

export default App;
