import React , { Component } from 'react';

import {
  Link
} from 'react-router-dom'

export default class AboutView extends Component {
  render() {
    return (
      <div className="app-abouttext">
        <h1><Link to="/home/about/abouttext/abi" >abouttext</Link></h1>
        {this.props.children}
      </div>
    );
  }
}
