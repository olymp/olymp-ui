import React, { Component } from 'react';

const defaultTransform = item => item;
export default ({ 
  prop = 'value',
  transform = defaultTransform
} = {}) => WrappedComponent => class StateWrapper extends Component {
  state = { item: {}, hasChanged: false };
  constructor(newProps) {
    super(newProps)
    if (newProps[prop]) {
      this.state = { item: transform(newProps[prop]), hasChanged: false };
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps[prop] !== this.props[prop]) {
      const item = newProps[prop] ? transform(newProps[prop]) : {};
      this.setState({ item, hasChanged: false });
    }
  }
  onChange = (change, item) => {
    this.setState({ item, hasChanged: true });
  };
  render() {
    const props = {
      onChange: this.onChange,
      hasChanged: !!this.state.hasChanged,
      [prop]: this.state.item,
    };
    return <WrappedComponent {...this.props} {...props} />;
  }
}
