import React from 'react'
import Home from './Home'

import Header from '../components/Header'
import Footer from '../components/Footer'

import '../css/app.sass';
import '../css/styles.css';

class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Home />
        <Footer />
      </div>
    )
  }
}

export default Index
