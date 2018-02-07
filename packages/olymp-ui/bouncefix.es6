import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withStyle } from 'olymp-fela';
import assign from 'object-assign';

@withStyle(() => ({
  overflowY: 'auto',
  // overflowX: 'hidden',
  '-webkit-overflow-scrolling': 'touch',
}))
export default class BounceFix extends Component {
    static defaultProps = {
            componentClass: 'div'
    }
    onTouchMove = (e) => {
        if (this._blockTouchMove) {
            e.preventDefault();
        }
    }
    onTouchEnd = (e) => {
        this._blockTouchMove = false;
    }
    scrollToEnd = (el) => {
      let curPos = el.scrollTop,
          height = el.offsetHeight,
          scroll = el.scrollHeight;

      // If at top, bump down 1px
      if(curPos <= 0) { el.scrollTop = 1; }

      // If at bottom, bump up 1px
      if(curPos + height >= scroll) {
          el.scrollTop = scroll - height - 1;
      }
    }
    onTouchStart = (e) => {
      const el = ReactDOM.findDOMNode(this);
      const isScrollable = el.scrollHeight > el.offsetHeight;

      // If scrollable, adjust
      if (isScrollable) {
          this._blockTouchMove = false;
          return this.scrollToEnd(el);
      }
      // Else block touchmove
      this._blockTouchMove = true;
    }
    render() {
      const props = assign({}, this.props, {
        onTouchStart: this.onTouchStart,
        onTouchMove: this.onTouchMove,
        onTouchEnd: this.onTouchEnd,
        onTouchCancel: this.onTouchEnd
      });
      delete props.componentClass;
      
      return React.createElement(this.props.componentClass, props, this.props.children);
    }
}
