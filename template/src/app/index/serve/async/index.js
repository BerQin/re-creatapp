import React, { Component } from 'react';

export default function asyncComponent(importComponent, call) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
      this.call = call;
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }
    render() {
      const C = this.state.component;
      let Resault = C;
      if(this.call){
        Resault = this.call(C);
      };
      return Resault
        ? <Resault {...this.props} />
        : null;
    }
  }
  return AsyncComponent;
}