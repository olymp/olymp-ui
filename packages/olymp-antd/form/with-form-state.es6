import React, { Component } from 'react';

const defaultTransform = item => item;
const defaultOnChange = item => item;
export default ({ 
  prop = 'value',
  transform = defaultTransform,
  onChange = defaultOnChange,
} = {}) => WrappedComponent => class StateWrapper extends Component {
  state = { item: {}, hasChanged: false };
  constructor(newProps) {
    super(newProps)
    if (newProps[prop]) {
      this.state = { item: onChange(transform(newProps[prop])), hasChanged: false };
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps[prop] !== this.props[prop]) {
      const item = newProps[prop] ? transform(newProps[prop]) : {};
      this.setState({ item: onChange(item), hasChanged: false });
    }
  }
  onChange = (item, form, change) => {
    this.setState({ item: onChange((item, form, change), hasChanged: true });
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
