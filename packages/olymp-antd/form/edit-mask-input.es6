import React, { Component } from 'react';
import { Input } from 'antd';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

export default class MaskedTextInput extends Component {
  constructor(...args) {
    super(...args);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.initTextMask();
  }

  componentDidUpdate() {
    this.initTextMask();
  }

  onChange(event) {
    this.textMaskInputElement.update();

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  }

  initTextMask() {
    const { props, props: { value } } = this;

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.inputElement,
      ...props
    });
    this.textMaskInputElement.update(value);
  }

  render() {
    const props = { ...this.props };

    delete props.mask;
    delete props.guide;
    delete props.pipe;
    delete props.placeholderChar;
    delete props.keepCharPositions;
    delete props.value;
    delete props.onChange;
    delete props.showMask;

    return (
      <Input
        {...props}
        onChange={this.onChange}
        defaultValue={this.props.value}
        ref={inputElement => {
          this.inputElement = inputElement.input;
        }}
      />
    );
  }
}
