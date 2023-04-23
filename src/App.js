import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  state={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
       
      />
        <Routes>
           <Route exact path="/" element ={<News setProgress={this.setProgress} key="general" pageSize={30} country="in" category="general" />}/>
           <Route exact path="/business" element={ <News setProgress={this.setProgress} key="business" pageSize={30} country="in" category="business" />}/>
           <Route exact path="/entertainment" element={ <News setProgress={this.setProgress} key="entertainment"pageSize={30} country="in" category="entertainment" />}/>
           <Route exact path="/general" element={ <News setProgress={this.setProgress} key="general" pageSize={30} country="in" category="general" />}/>
           <Route exact path="/health" element={ <News setProgress={this.setProgress} key="health" pageSize={30} country="in" category="health" />}/>
           <Route exact path="/science" element={ <News setProgress={this.setProgress} key="Science" pageSize={30} country="in" category="science" />}/>
           <Route exact path="/sports" element={ <News setProgress={this.setProgress} key="sports" pageSize={30} country="in" category="sports" />}/>
           <Route exact path="/technology" element={ <News setProgress={this.setProgress} key="technology" pageSize={30} country="in" category="technology" />}/>
           
          

          </Routes>
        </Router>
      </div>
      </>
    )
  }
}
