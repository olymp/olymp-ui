import React, { Component } from 'react';
import { Input } from 'antd';
import { get } from 'lodash';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';

// https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
// https://github.com/text-mask/text-mask/tree/master/addons

class Edit extends Component {
  componentDidMount() {
    if (this.props.mask) this.initTextMask();
  }

  componentDidUpdate() {
    if (this.props.mask) this.initTextMask();
  }

  onChange = event => {
    this.textMaskInputElement.update();

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  };

  initTextMask() {
    const { value } = this.props;

    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.inputElement,
      ...this.props
    });
    this.textMaskInputElement.update(value);
  }

  render() {
    const props = { ...this.props };

    delete props.guide;
    delete props.pipe;
    delete props.placeholderChar;
    delete props.keepCharPositions;
    delete props.showMask;

    if (!props.mask) return <Input {...props} />;

    delete props.mask;
    delete props.value;
    delete props.onChange;

    return (
      <Input
        {...props}
        onChange={this.onChange}
        defaultValue={this.props.value}
        ref={inputElement => {
          this.inputElement = get(inputElement, 'input');
        }}
      />
    );
  }
}
Edit.displayName = 'EditMaskInput';
Edit.type = 'string';
export default Edit;
