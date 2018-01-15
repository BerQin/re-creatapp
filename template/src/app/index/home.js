import React , { Component } from 'react';
import HeaderView from './components/header';
import '../../styles/common.scss';

export default class HomeView extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <main>
        <HeaderView/>
        {this.props.children}
      </main>
    );
  }
}