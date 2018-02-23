'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

require('antd/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _reactFela = require('react-fela');

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ImageContainer = (0, _reactFela.createComponent)(function (_ref) {
  var theme = _ref.theme,
      isActive = _ref.isActive;
  return {
    position: 'relative',
    margin: '.5rem',
    padding: 1,
    cursor: 'pointer',
    display: 'inline-block',
    // outline: isActive ? `3px solid ${theme.color}` : 'none',
    // transform: isActive ? 'scale(1.15)' : 'none',
    transition: 'all .1s ease-in-out',
    backgroundColor: isActive ? theme.color : 'transparent',
    border: isActive ? '1px solid ' + theme.color : '1px solid #ddd',
    // boxShadow: `0px 0px 10px 0px rgba(0, 0, 0, ${isActive ? 0.4 : 0.2})`,
    '> div': {
      opacity: isActive ? 0.8 : 1
    },
    ':hover': {
      // boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.4)',
      transform: 'scale(1.025)',
      transition: 'all .1s ease-in-out'
    }
  };
}, 'div', function (_ref2) {
  var height = _ref2.height,
      isActive = _ref2.isActive,
      p = _objectWithoutProperties(_ref2, ['height', 'isActive']);

  return Object.keys(p);
});

var ImageLabel = (0, _reactFela.createComponent)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%)',
    transition: 'all .15s ease-in-out',
    backgroundColor: theme.color,
    color: '#FFF',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
    lineHeight: 1
    // boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.75)",
  };
}, 'span', function (p) {
  return Object.keys(p);
});

var CheckLabel = (0, _reactFela.createComponent)(function (_ref4) {
  var theme = _ref4.theme;
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(40%, -40%) scale(0.667)',
    transition: 'all .15s ease-in-out',
    backgroundColor: theme.color,
    color: '#FFF',
    borderRadius: '50%',
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
    lineHeight: 1,
    width: 32,
    height: 32,
    '> *': {
      center: true
    }
  };
}, 'span', function (p) {
  return Object.keys(p);
});

var CloseLabel = (0, _reactFela.createComponent)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    ':hover': {
      transform: 'translate(40%, -40%) scale(0.75)',
      transition: 'all .15s ease-in-out'
    }
  };
}, CheckLabel, function (p) {
  return Object.keys(p);
});

var Thumb = function Thumb(_ref6) {
  var item = _ref6.item,
      width = _ref6.width,
      height = _ref6.height,
      onClick = _ref6.onClick,
      onRemove = _ref6.onRemove,
      isActive = _ref6.isActive;
  return item ? _react2.default.createElement(
    ImageContainer,
    { isActive: isActive },
    height ? _react2.default.createElement(_image2.default, { value: item, height: height, maxWidth: 300, onClick: onClick }) : null,
    width ? _react2.default.createElement(_image2.default, {
      value: Object.assign({}, item, { width: width, height: item.height / item.width * width }),
      width: '100%',
      onClick: onClick
    }) : null,
    item.format === 'pdf' ? _react2.default.createElement(
      ImageLabel,
      null,
      _react2.default.createElement(_icon2.default, { type: 'file-pdf' })
    ) : undefined,
    isActive ? onRemove ? _react2.default.createElement(
      CloseLabel,
      { onClick: onRemove },
      _react2.default.createElement(_icon2.default, { type: 'close' })
    ) : _react2.default.createElement(
      CheckLabel,
      null,
      _react2.default.createElement(_icon2.default, { type: 'check' })
    ) : undefined
  ) : null;
};
Thumb.propTypes = {
  item: _propTypes.object,
  onClick: _propTypes.func,
  onRemove: _propTypes.func,
  height: _propTypes.number,
  isActive: _propTypes.bool
};
exports.default = Thumb;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvdmlld3MvdGh1bWIuZXM2Il0sIm5hbWVzIjpbIkltYWdlQ29udGFpbmVyIiwidGhlbWUiLCJpc0FjdGl2ZSIsInBvc2l0aW9uIiwibWFyZ2luIiwicGFkZGluZyIsImN1cnNvciIsImRpc3BsYXkiLCJ0cmFuc2l0aW9uIiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJib3JkZXIiLCJvcGFjaXR5IiwidHJhbnNmb3JtIiwiaGVpZ2h0IiwicCIsIk9iamVjdCIsImtleXMiLCJJbWFnZUxhYmVsIiwidG9wIiwicmlnaHQiLCJib3JkZXJSYWRpdXMiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJDaGVja0xhYmVsIiwid2lkdGgiLCJjZW50ZXIiLCJDbG9zZUxhYmVsIiwiVGh1bWIiLCJpdGVtIiwib25DbGljayIsIm9uUmVtb3ZlIiwiZm9ybWF0IiwidW5kZWZpbmVkIiwicHJvcFR5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixnQ0FDckI7QUFBQSxNQUFHQyxLQUFILFFBQUdBLEtBQUg7QUFBQSxNQUFVQyxRQUFWLFFBQVVBLFFBQVY7QUFBQSxTQUEwQjtBQUN4QkMsY0FBVSxVQURjO0FBRXhCQyxZQUFRLE9BRmdCO0FBR3hCQyxhQUFTLENBSGU7QUFJeEJDLFlBQVEsU0FKZ0I7QUFLeEJDLGFBQVMsY0FMZTtBQU14QjtBQUNBO0FBQ0FDLGdCQUFZLHFCQVJZO0FBU3hCQyxxQkFBaUJQLFdBQVdELE1BQU1TLEtBQWpCLEdBQXlCLGFBVGxCO0FBVXhCQyxZQUFRVCwwQkFBd0JELE1BQU1TLEtBQTlCLEdBQXdDLGdCQVZ4QjtBQVd4QjtBQUNBLGFBQVM7QUFDUEUsZUFBU1YsV0FBVyxHQUFYLEdBQWlCO0FBRG5CLEtBWmU7QUFleEIsY0FBVTtBQUNSO0FBQ0FXLGlCQUFXLGNBRkg7QUFH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a0JHaEMsZUFDQzhCLFdBQ0U7QUFBQyxnQkFBRDtBQUFBLFFBQVksU0FBU0EsUUFBckI7QUFDRSxzREFBTSxNQUFLLE9BQVg7QUFERixLQURGLEdBS0U7QUFBQyxnQkFBRDtBQUFBO0FBQ0Usc0RBQU0sTUFBSyxPQUFYO0FBREYsS0FOSCxHQVdDRTtBQTdCSixHQURGLEdBaUNJLElBbENRO0FBQUEsQ0FBZDtBQW1DQUwsTUFBTU0sU0FBTixHQUFrQjtBQUNoQkwseUJBRGdCO0FBRWhCQywwQkFGZ0I7QUFHaEJDLDJCQUhnQjtBQUloQmxCLDJCQUpnQjtBQUtoQlo7QUFMZ0IsQ0FBbEI7a0JBT2UyQixLIiwiZmlsZSI6InBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvdmlld3MvdGh1bWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgb2JqZWN0LCBmdW5jLCBudW1iZXIsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEljb24gfSBmcm9tICdhbnRkJztcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0LWZlbGEnO1xuaW1wb3J0IEltYWdlIGZyb20gJy4uL2ltYWdlJztcblxuY29uc3QgSW1hZ2VDb250YWluZXIgPSBjcmVhdGVDb21wb25lbnQoXG4gICh7IHRoZW1lLCBpc0FjdGl2ZSB9KSA9PiAoe1xuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgIG1hcmdpbjogJy41cmVtJyxcbiAgICBwYWRkaW5nOiAxLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIC8vIG91dGxpbmU6IGlzQWN0aXZlID8gYDNweCBzb2xpZCAke3RoZW1lLmNvbG9yfWAgOiAnbm9uZScsXG4gICAgLy8gdHJhbnNmb3JtOiBpc0FjdGl2ZSA/ICdzY2FsZSgxLjE1KScgOiAnbm9uZScsXG4gICAgdHJhbnNpdGlvbjogJ2FsbCAuMXMgZWFzZS1pbi1vdXQnLFxuICAgIGJhY2tncm91bmRDb2xvcjogaXNBY3RpdmUgPyB0aGVtZS5jb2xvciA6ICd0cmFuc3BhcmVudCcsXG4gICAgYm9yZGVyOiBpc0FjdGl2ZSA/IGAxcHggc29saWQgJHt0aGVtZS5jb2xvcn1gIDogJzFweCBzb2xpZCAjZGRkJyxcbiAgICAvLyBib3hTaGFkb3c6IGAwcHggMHB4IDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgJHtpc0FjdGl2ZSA/IDAuNCA6IDAuMn0pYCxcbiAgICAnPiBkaXYnOiB7XG4gICAgICBvcGFjaXR5OiBpc0FjdGl2ZSA/IDAuOCA6IDEsXG4gICAgfSxcbiAgICAnOmhvdmVyJzoge1xuICAgICAgLy8gYm94U2hhZG93OiAnMHB4IDBweCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuNCknLFxuICAgICAgdHJhbnNmb3JtOiAnc2NhbGUoMS4wMjUpJyxcbiAgICAgIHRyYW5zaXRpb246ICdhbGwgLjFzIGVhc2UtaW4tb3V0JyxcbiAgICB9LFxuICB9KSxcbiAgJ2RpdicsXG4gICh7IGhlaWdodCwgaXNBY3RpdmUsIC4uLnAgfSkgPT4gT2JqZWN0LmtleXMocCksXG4pO1xuXG5jb25zdCBJbWFnZUxhYmVsID0gY3JlYXRlQ29tcG9uZW50KFxuICAoeyB0aGVtZSB9KSA9PiAoe1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzUwJScsXG4gICAgcmlnaHQ6ICc1MCUnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSg1MCUsIC01MCUpJyxcbiAgICB0cmFuc2l0aW9uOiAnYWxsIC4xNXMgZWFzZS1pbi1vdXQnLFxuICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29sb3IsXG4gICAgY29sb3I6ICcjRkZGJyxcbiAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgZm9udFNpemU6IDI1LFxuICAgIHBhZGRpbmc6IDUsXG4gICAgbGluZUhlaWdodDogMSxcbiAgICAvLyBib3hTaGFkb3c6IFwiMHB4IDBweCAxMnB4IDBweCByZ2JhKDAsMCwwLDAuNzUpXCIsXG4gIH0pLFxuICAnc3BhbicsXG4gIHAgPT4gT2JqZWN0LmtleXMocCksXG4pO1xuXG5jb25zdCBDaGVja0xhYmVsID0gY3JlYXRlQ29tcG9uZW50KFxuICAoeyB0aGVtZSB9KSA9PiAoe1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoNDAlLCAtNDAlKSBzY2FsZSgwLjY2NyknLFxuICAgIHRyYW5zaXRpb246ICdhbGwgLjE1cyBlYXNlLWluLW91dCcsXG4gICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5jb2xvcixcbiAgICBjb2xvcjogJyNGRkYnLFxuICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICBmb250U2l6ZTogMjUsXG4gICAgcGFkZGluZzogNSxcbiAgICBsaW5lSGVpZ2h0OiAxLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgICc+IConOiB7XG4gICAgICBjZW50ZXI6IHRydWUsXG4gICAgfSxcbiAgfSksXG4gICdzcGFuJyxcbiAgcCA9PiBPYmplY3Qua2V5cyhwKSxcbik7XG5cbmNvbnN0IENsb3NlTGFiZWwgPSBjcmVhdGVDb21wb25lbnQoXG4gICh7IHRoZW1lIH0pID0+ICh7XG4gICAgJzpob3Zlcic6IHtcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSg0MCUsIC00MCUpIHNjYWxlKDAuNzUpJyxcbiAgICAgIHRyYW5zaXRpb246ICdhbGwgLjE1cyBlYXNlLWluLW91dCcsXG4gICAgfSxcbiAgfSksXG4gIENoZWNrTGFiZWwsXG4gIHAgPT4gT2JqZWN0LmtleXMocCksXG4pO1xuXG5jb25zdCBUaHVtYiA9ICh7IGl0ZW0sIHdpZHRoLCBoZWlnaHQsIG9uQ2xpY2ssIG9uUmVtb3ZlLCBpc0FjdGl2ZSB9KSA9PlxuICBpdGVtID8gKFxuICAgIDxJbWFnZUNvbnRhaW5lciBpc0FjdGl2ZT17aXNBY3RpdmV9PlxuICAgICAge2hlaWdodCA/IChcbiAgICAgICAgPEltYWdlIHZhbHVlPXtpdGVtfSBoZWlnaHQ9e2hlaWdodH0gbWF4V2lkdGg9ezMwMH0gb25DbGljaz17b25DbGlja30gLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge3dpZHRoID8gKFxuICAgICAgICA8SW1hZ2VcbiAgICAgICAgICB2YWx1ZT17eyAuLi5pdGVtLCB3aWR0aCwgaGVpZ2h0OiBpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggKiB3aWR0aCB9fVxuICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge2l0ZW0uZm9ybWF0ID09PSAncGRmJyA/IChcbiAgICAgICAgPEltYWdlTGFiZWw+XG4gICAgICAgICAgPEljb24gdHlwZT1cImZpbGUtcGRmXCIgLz5cbiAgICAgICAgPC9JbWFnZUxhYmVsPlxuICAgICAgKSA6IChcbiAgICAgICAgdW5kZWZpbmVkXG4gICAgICApfVxuICAgICAge2lzQWN0aXZlID8gKFxuICAgICAgICBvblJlbW92ZSA/IChcbiAgICAgICAgICA8Q2xvc2VMYWJlbCBvbkNsaWNrPXtvblJlbW92ZX0+XG4gICAgICAgICAgICA8SWNvbiB0eXBlPVwiY2xvc2VcIiAvPlxuICAgICAgICAgIDwvQ2xvc2VMYWJlbD5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8Q2hlY2tMYWJlbD5cbiAgICAgICAgICAgIDxJY29uIHR5cGU9XCJjaGVja1wiIC8+XG4gICAgICAgICAgPC9DaGVja0xhYmVsPlxuICAgICAgICApXG4gICAgICApIDogKFxuICAgICAgICB1bmRlZmluZWRcbiAgICAgICl9XG4gICAgPC9JbWFnZUNvbnRhaW5lcj5cbiAgKSA6IG51bGw7XG5UaHVtYi5wcm9wVHlwZXMgPSB7XG4gIGl0ZW06IG9iamVjdCxcbiAgb25DbGljazogZnVuYyxcbiAgb25SZW1vdmU6IGZ1bmMsXG4gIGhlaWdodDogbnVtYmVyLFxuICBpc0FjdGl2ZTogYm9vbCxcbn07XG5leHBvcnQgZGVmYXVsdCBUaHVtYjtcbiJdfQ==
