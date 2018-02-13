import React, { Component } from 'react';

export default ({ idProp = 'id', itemProp, valueProp = 'value' } = {}) => WrappedComponent => class StateWrapper extends Component {
  state = { changedItem: null };
  componentWillReceiveProps(newProps) {
    if (newProps[idProp] !== this.props[idProp]) {
      this.setState({ changedItem: null, hasChanged: false })
    }
  }
  onChange = (change, changedItem) => {
    this.setState({ changedItem, hasChanged: true });
  };
  render() {
    const props = {
      onChange: this.onChange,
      hasChanged: !!this.state.hasChanged,
      [valueProp]: this.state.changedItem || this.props[itemProp || valueProp] || {},
    };
    return <WrappedComponent {...this.props} {...props} />;
  }
}
