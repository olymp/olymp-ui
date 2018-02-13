import React, { Component } from 'react';

export default ({ id = 'id', item = 'item' } = {}) => WrappedComponent => class StateWrapper extends Component {
  state = { changedItem: null };
  componentWillReceiveProps(newProps) {
    if (newProps[id] !== this.props[id]) {
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
      item: this.state.changedItem || this.props[item] || {},
    };
    return <WrappedComponent {...this.props} {...props} />;
  }
}
