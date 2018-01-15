import React , { Component } from 'react';
import HeaderView from './components/header';
import '../../styles/common.scss';

export default class HomeView extends Component {
  render() {
    return (
      <main>
        <HeaderView/>
        <div className="app-home">
          <h2>Welcom To React</h2>
          <p>A JavaScript library for building user interfaces</p>
        </div>
        {this.props.children}
      </main>
    );
  }
}