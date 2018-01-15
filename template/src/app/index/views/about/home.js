import React , { Component } from 'react';
import './index.scss';
import {
  Link
} from 'react-router-dom'

export default class AboutView extends Component {
  render() {
    return (
      <div className="app-about">
        <h2>About</h2>
        <p><Link to="/about/linke" >Linke</Link></p>
      </div>
    );
  }
}
