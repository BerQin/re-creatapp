import React , { Component } from 'react';
import './index.scss';

import {
  Link
} from 'react-router-dom'

export default class HeaderView extends Component {
  render() {
    return (
      <div className="app-header">
          <ul>
            <li><Link to="/home" >Home</Link></li>
            <li><Link to="/home/about" >About</Link></li>
            <li><Link to="/home/linke" >Linke</Link></li>
          </ul>
      </div>
    );
  }
}
