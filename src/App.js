import React from "react";
import { disableBodyScroll } from 'body-scroll-lock';
import { HashRouter, Route, NavLink } from 'react-router-dom'
import './stylesheets/App.css';
import Home from './pages/Home';
import About from './pages/About';
import IconSet from './constants/IconSet';
import Icon from './components/Icon';
import Settings from './pages/Settings';

const App = () => {

  const targetElement = document.querySelector('#root');
  disableBodyScroll(targetElement);

  const Header = () => {
    return (
      <>
        <header className='titleHeader'>
          <div className='floatRight' >
            <NavLink to="/about">about</NavLink>
            <NavLink to="/settings" 
            >
              <Icon className='settingsIcon'
                    path={IconSet.settings} 
                    viewBox="0 0 50 50"
              />
            </NavLink>
          </div>
          <h1><NavLink exact to="/">atomizer</NavLink></h1>
        </header>
        <div className="body">
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} />
        </div>
      </>
    )
  }

  return(
    <HashRouter>
      <Header />
    </HashRouter>
  )
}

export default App;