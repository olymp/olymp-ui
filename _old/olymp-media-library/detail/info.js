'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

require('antd/lib/form/style');

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menu = require('olymp-ui/menu');

var _menu2 = _interopRequireDefault(_menu);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormForFullLayout = {
  wrapperCol: { span: 24, offset: 0 },
  style: { marginBottom: 4 }
};

exports.default = function (item, app) {
  return _react2.default.createElement(
    _menu2.default.List,
    { title: 'Meta-Daten', key: '2' },
    _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'project', label: 'Projekt' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, { disabled: true, placeholder: 'Projekt', value: app })
    ),
    _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'size', label: 'Gr\xF6\xDFe' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, {
        disabled: true,
        placeholder: 'Gr\xF6\xDFe',
        value: item.width + 'x' + item.height
      })
    ),
    _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'date', label: 'Hinzugef\xFCgt' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, {
        disabled: true,
        placeholder: 'Hinzugef\xFCgt',
        value: (0, _format2.default)(item.createdAt, 'DD. MMMM YYYY, HH:mm:ss') + ' Uhr'
      })
    ),
    _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'format', label: 'Format' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, { disabled: true, placeholder: 'Format', value: item.format })
    ),
    item.format === 'pdf' ? _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'pages', label: 'Seiten' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, { disabled: true, placeholder: 'Seiten', value: item.pages })
    ) : undefined,
    _react2.default.createElement(
      _form2.default.Item,
      Object.assign({ key: 'bytes', label: 'Dateigr\xF6\xDFe' }, FormForFullLayout),
      _react2.default.createElement(_input2.default, {
        disabled: true,
        placeholder: 'Dateigr\xF6\xDFe',
        value: item.bytes / 1000 + ' kB'
      })
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2luZm8uZXM2Il0sIm5hbWVzIjpbIkZvcm1Gb3JGdWxsTGF5b3V0Iiwid3JhcHBlckNvbCIsInNwYW4iLCJvZmZzZXQiLCJzdHlsZSIsIm1hcmdpbkJvdHRvbSIsIml0ZW0iLCJhcHAiLCJ3aWR0aCIsImhlaWdodCIsImNyZWF0ZWRBdCIsImZvcm1hdCIsInBhZ2VzIiwidW5kZWZpbmVkIiwiYnl0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7QUFHQSxJQUFNQSxvQkFBb0I7QUFDeEJDLGNBQVksRUFBRUMsTUFBTSxFQUFSLEVBQVlDLFFBQVEsQ0FBcEIsRUFEWTtBQUV4QkMsU0FBTyxFQUFFQyxjQUFjLENBQWhCO0FBRmlCLENBQTFCOztrQkFLZSxVQUFDQyxJQUFELEVBQU9DLEdBQVA7QUFBQSxTQUNiO0FBQUEsbUJBQU0sSUFBTjtBQUFBLE1BQVcsT0FBTSxZQUFqQixFQUE4QixLQUFJLEdBQWxDO0FBQ0U7QUFBQSxxQkFBTSxJQUFOO0FBQUEsc0JBQVcsS0FBSSxTQUFmLEVBQXlCLE9BQU0sU0FBL0IsSUFBNkNQLGlCQUE3QztBQUNFLHVEQUFPLGNBQVAsRUFBZ0IsYUFBWSxTQUE1QixFQUFzQyxPQUFPTyxHQUE3QztBQURGLEtBREY7QUFJRTtBQUFBLHFCQUFNLElBQU47QUFBQSxzQkFBVyxLQUFJLE1BQWYsRUFBc0IsT0FBTSxhQUE1QixJQUF3Q1AsaUJBQXhDO0FBQ0U7QUFDRSxzQkFERjtBQUVFLHFCQUFZLGFBRmQ7QUFHRSxlQUFVTSxLQUFLRSxLQUFmLFNBQXdCRixLQUFLRztBQUgvQjtBQURGLEtBSkY7QUFXRTtBQUFBLHFCQUFNLElBQU47QUFBQSxzQkFBVyxLQUFJLE1BQWYsRUFBc0IsT0FBTSxnQkFBNUIsSUFBOENULGlCQUE5QztBQUNFO0FBQ0Usc0JBREY7QUFFRSxxQkFBWSxnQkFGZDtBQUdFLGVBQVUsc0JBQU9NLEtBQUtJLFNBQVosRUFBdUIseUJBQXZCLENBQVY7QUFIRjtBQURGLEtBWEY7QUFrQkU7QUFBQSxxQkFBTSxJQUFOO0FBQUEsc0JBQVcsS0FBSSxRQUFmLEVBQXdCLE9BQU0sUUFBOUIsSUFBMkNWLGlCQUEzQztBQUNFLHVEQUFPLGNBQVAsRUFBZ0IsYUFBWSxRQUE1QixFQUFxQyxPQUFPTSxLQUFLSyxNQUFqRDtBQURGLEtBbEJGO0FBcUJHTCxTQUFLSyxNQUFMLEtBQWdCLEtBQWhCLEdBQ0M7QUFBQSxxQkFBTSxJQUFOO0FBQUEsc0JBQVcsS0FBSSxPQUFmLEVBQXVCLE9BQU0sUUFBN0IsSUFBMENYLGlCQUExQztBQUNFLHVEQUFPLGNBQVAsRUFBZ0IsYUFBWSxRQUE1QixFQUFxQyxPQUFPTSxLQUFLTSxLQUFqRDtBQURGLEtBREQsR0FLQ0MsU0ExQko7QUE0QkU7QUFBQSxxQkFBTSxJQUFOO0FBQUEsc0JBQVcsS0FBSSxPQUFmLEVBQXVCLE9BQU0sa0JBQTdCLElBQThDYixpQkFBOUM7QUFDRTtBQUNFLHNCQURGO0FBRUUscUJBQVksa0JBRmQ7QUFHRSxlQUFVTSxLQUFLUSxLQUFMLEdBQWEsSUFBdkI7QUFIRjtBQURGO0FBNUJGLEdBRGE7QUFBQSxDIiwiZmlsZSI6InBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgRm9ybSwgSW5wdXQgfSBmcm9tICdhbnRkJztcbmltcG9ydCBNZW51IGZyb20gJ29seW1wLXVpL21lbnUnO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jb25zdCBGb3JtRm9yRnVsbExheW91dCA9IHtcbiAgd3JhcHBlckNvbDogeyBzcGFuOiAyNCwgb2Zmc2V0OiAwIH0sXG4gIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogNCB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgKGl0ZW0sIGFwcCkgPT4gKFxuICA8TWVudS5MaXN0IHRpdGxlPVwiTWV0YS1EYXRlblwiIGtleT1cIjJcIj5cbiAgICA8Rm9ybS5JdGVtIGtleT1cInByb2plY3RcIiBsYWJlbD1cIlByb2pla3RcIiB7Li4uRm9ybUZvckZ1bGxMYXlvdXR9PlxuICAgICAgPElucHV0IGRpc2FibGVkIHBsYWNlaG9sZGVyPVwiUHJvamVrdFwiIHZhbHVlPXthcHB9IC8+XG4gICAgPC9Gb3JtLkl0ZW0+XG4gICAgPEZvcm0uSXRlbSBrZXk9XCJzaXplXCIgbGFiZWw9XCJHcsO2w59lXCIgey4uLkZvcm1Gb3JGdWxsTGF5b3V0fT5cbiAgICAgIDxJbnB1dFxuICAgICAgICBkaXNhYmxlZFxuICAgICAgICBwbGFjZWhvbGRlcj1cIkdyw7bDn2VcIlxuICAgICAgICB2YWx1ZT17YCR7aXRlbS53aWR0aH14JHtpdGVtLmhlaWdodH1gfVxuICAgICAgLz5cbiAgICA8L0Zvcm0uSXRlbT5cbiAgICA8Rm9ybS5JdGVtIGtleT1cImRhdGVcIiBsYWJlbD1cIkhpbnp1Z2Vmw7xndFwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICA8SW5wdXRcbiAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJIaW56dWdlZsO8Z3RcIlxuICAgICAgICB2YWx1ZT17YCR7Zm9ybWF0KGl0ZW0uY3JlYXRlZEF0LCAnREQuIE1NTU0gWVlZWSwgSEg6bW06c3MnKX0gVWhyYH1cbiAgICAgIC8+XG4gICAgPC9Gb3JtLkl0ZW0+XG4gICAgPEZvcm0uSXRlbSBrZXk9XCJmb3JtYXRcIiBsYWJlbD1cIkZvcm1hdFwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICA8SW5wdXQgZGlzYWJsZWQgcGxhY2Vob2xkZXI9XCJGb3JtYXRcIiB2YWx1ZT17aXRlbS5mb3JtYXR9IC8+XG4gICAgPC9Gb3JtLkl0ZW0+XG4gICAge2l0ZW0uZm9ybWF0ID09PSAncGRmJyA/IChcbiAgICAgIDxGb3JtLkl0ZW0ga2V5PVwicGFnZXNcIiBsYWJlbD1cIlNlaXRlblwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgIDxJbnB1dCBkaXNhYmxlZCBwbGFjZWhvbGRlcj1cIlNlaXRlblwiIHZhbHVlPXtpdGVtLnBhZ2VzfSAvPlxuICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgKSA6IChcbiAgICAgIHVuZGVmaW5lZFxuICAgICl9XG4gICAgPEZvcm0uSXRlbSBrZXk9XCJieXRlc1wiIGxhYmVsPVwiRGF0ZWlncsO2w59lXCIgey4uLkZvcm1Gb3JGdWxsTGF5b3V0fT5cbiAgICAgIDxJbnB1dFxuICAgICAgICBkaXNhYmxlZFxuICAgICAgICBwbGFjZWhvbGRlcj1cIkRhdGVpZ3LDtsOfZVwiXG4gICAgICAgIHZhbHVlPXtgJHtpdGVtLmJ5dGVzIC8gMTAwMH0ga0JgfVxuICAgICAgLz5cbiAgICA8L0Zvcm0uSXRlbT5cbiAgPC9NZW51Lkxpc3Q+XG4pO1xuIl19
