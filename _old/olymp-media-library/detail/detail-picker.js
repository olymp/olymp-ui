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

var _crop = require('../components/crop');

var _crop2 = _interopRequireDefault(_crop);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var form = _ref.form,
      item = _ref.item;

  form.getFieldDecorator(item.id + '.id', { initialValue: item.id });
  form.getFieldDecorator(item.id + '.url', { initialValue: item.url });
  form.getFieldDecorator(item.id + '.width', { initialValue: item.width });
  form.getFieldDecorator(item.id + '.height', { initialValue: item.height });

  return _react2.default.createElement(
    _form2.default,
    null,
    _react2.default.createElement(
      _form2.default.Item,
      _utils.FormForFullLayout,
      form.getFieldDecorator(item.id + '.crop', {
        initialValue: item.crop
      })(_react2.default.createElement(_crop2.default, { url: item.url, height: item.height, width: item.width }))
    ),
    _react2.default.createElement(
      _menu2.default.List,
      { title: 'Bild' },
      form.getFieldDecorator(item.id + '.source', {
        initialValue: item.source
      })(_react2.default.createElement(
        _form2.default.Item,
        Object.assign({ label: 'Quelle' }, _utils.FormForFullLayout),
        _react2.default.createElement(_input2.default, { placeholder: 'Quelle' })
      )),
      _react2.default.createElement(
        _form2.default.Item,
        Object.assign({ key: 'caption', label: 'Bezeichnung' }, _utils.FormForFullLayout),
        form.getFieldDecorator(item.id + '.caption', {
          initialValue: item.caption
        })(_react2.default.createElement(_input2.default.TextArea, { rows: 3, placeholder: 'Bezeichnung' }))
      )
    ),
    (0, _info2.default)(item)
  );
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2RldGFpbC1waWNrZXIuZXM2Il0sIm5hbWVzIjpbImZvcm0iLCJpdGVtIiwiZ2V0RmllbGREZWNvcmF0b3IiLCJpZCIsImluaXRpYWxWYWx1ZSIsInVybCIsIndpZHRoIiwiaGVpZ2h0IiwiY3JvcCIsInNvdXJjZSIsImNhcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7a0JBRWUsZ0JBQW9CO0FBQUEsTUFBakJBLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLE1BQVhDLElBQVcsUUFBWEEsSUFBVzs7QUFDakNELE9BQUtFLGlCQUFMLENBQTBCRCxLQUFLRSxFQUEvQixVQUF3QyxFQUFFQyxjQUFjSCxLQUFLRSxFQUFyQixFQUF4QztBQUNBSCxPQUFLRSxpQkFBTCxDQUEwQkQsS0FBS0UsRUFBL0IsV0FBeUMsRUFBRUMsY0FBY0gsS0FBS0ksR0FBckIsRUFBekM7QUFDQUwsT0FBS0UsaUJBQUwsQ0FBMEJELEtBQUtFLEVBQS9CLGFBQTJDLEVBQUVDLGNBQWNILEtBQUtLLEtBQXJCLEVBQTNDO0FBQ0FOLE9BQUtFLGlCQUFMLENBQTBCRCxLQUFLRSxFQUEvQixjQUE0QyxFQUFFQyxjQUFjSCxLQUFLTSxNQUFyQixFQUE1Qzs7QUFFQSxTQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUEscUJBQU0sSUFBTjtBQUFBO0FBQ0dQLFdBQUtFLGlCQUFMLENBQTBCRCxLQUFLRSxFQUEvQixZQUEwQztBQUN6Q0Msc0JBQWNILEtBQUtPO0FBRHNCLE9BQTFDLEVBRUUsZ0RBQU0sS0FBS1AsS0FBS0ksR0FBaEIsRUFBcUIsUUFBUUosS0FBS00sTUFBbEMsRUFBMEMsT0FBT04sS0FBS0ssS0FBdEQsR0FGRjtBQURILEtBREY7QUFPRTtBQUFBLHFCQUFNLElBQU47QUFBQSxRQUFXLE9BQU0sTUFBakI7QUFDR04sV0FBS0UsaUJBQUwsQ0FBMEJELEtBQUtFLEVBQS9CLGNBQTRDO0FBQzNDQyxzQkFBY0gsS0FBS1E7QUFEd0IsT0FBNUMsRUFHQztBQUFBLHVCQUFNLElBQU47QUFBQSx3QkFBVyxPQUFNLFFBQWpCO0FBQ0UseURBQU8sYUFBWSxRQUFuQjtBQURGLE9BSEQsQ0FESDtBQVFFO0FBQUEsdUJBQU0sSUFBTjtBQUFBLHdCQUFXLEtBQUksU0FBZixFQUF5QixPQUFNLGFBQS9CO0FBQ0dULGFBQUtFLGlCQUFMLENBQTBCRCxLQUFLRSxFQUEvQixlQUE2QztBQUM1Q0Msd0JBQWNILEtBQUtTO0FBRHlCLFNBQTdDLEVBRUUsOENBQU8sUUFBUCxJQUFnQixNQUFNLENBQXRCLEVBQXlCLGFBQVksYUFBckMsR0FGRjtBQURIO0FBUkYsS0FQRjtBQXNCRyx3QkFBYVQsSUFBYjtBQXRCSCxHQURGO0FBMEJELEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS9kZXRhaWwvZGV0YWlsLXBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGb3JtLCBJbnB1dCB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IE1lbnUgZnJvbSAnb2x5bXAtdWkvbWVudSc7XG5pbXBvcnQgQ3JvcCBmcm9tICcuLi9jb21wb25lbnRzL2Nyb3AnO1xuaW1wb3J0IGdldEltYWdlSW5mbyBmcm9tICcuL2luZm8nO1xuaW1wb3J0IHsgRm9ybUZvckZ1bGxMYXlvdXQgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgKHsgZm9ybSwgaXRlbSB9KSA9PiB7XG4gIGZvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0uaWRgLCB7IGluaXRpYWxWYWx1ZTogaXRlbS5pZCB9KTtcbiAgZm9ybS5nZXRGaWVsZERlY29yYXRvcihgJHtpdGVtLmlkfS51cmxgLCB7IGluaXRpYWxWYWx1ZTogaXRlbS51cmwgfSk7XG4gIGZvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0ud2lkdGhgLCB7IGluaXRpYWxWYWx1ZTogaXRlbS53aWR0aCB9KTtcbiAgZm9ybS5nZXRGaWVsZERlY29yYXRvcihgJHtpdGVtLmlkfS5oZWlnaHRgLCB7IGluaXRpYWxWYWx1ZTogaXRlbS5oZWlnaHQgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybT5cbiAgICAgIDxGb3JtLkl0ZW0gey4uLkZvcm1Gb3JGdWxsTGF5b3V0fT5cbiAgICAgICAge2Zvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0uY3JvcGAsIHtcbiAgICAgICAgICBpbml0aWFsVmFsdWU6IGl0ZW0uY3JvcCxcbiAgICAgICAgfSkoPENyb3AgdXJsPXtpdGVtLnVybH0gaGVpZ2h0PXtpdGVtLmhlaWdodH0gd2lkdGg9e2l0ZW0ud2lkdGh9IC8+KX1cbiAgICAgIDwvRm9ybS5JdGVtPlxuXG4gICAgICA8TWVudS5MaXN0IHRpdGxlPVwiQmlsZFwiPlxuICAgICAgICB7Zm9ybS5nZXRGaWVsZERlY29yYXRvcihgJHtpdGVtLmlkfS5zb3VyY2VgLCB7XG4gICAgICAgICAgaW5pdGlhbFZhbHVlOiBpdGVtLnNvdXJjZSxcbiAgICAgICAgfSkoXG4gICAgICAgICAgPEZvcm0uSXRlbSBsYWJlbD1cIlF1ZWxsZVwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgICAgICA8SW5wdXQgcGxhY2Vob2xkZXI9XCJRdWVsbGVcIiAvPlxuICAgICAgICAgIDwvRm9ybS5JdGVtPixcbiAgICAgICAgKX1cbiAgICAgICAgPEZvcm0uSXRlbSBrZXk9XCJjYXB0aW9uXCIgbGFiZWw9XCJCZXplaWNobnVuZ1wiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgICAge2Zvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0uY2FwdGlvbmAsIHtcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaXRlbS5jYXB0aW9uLFxuICAgICAgICAgIH0pKDxJbnB1dC5UZXh0QXJlYSByb3dzPXszfSBwbGFjZWhvbGRlcj1cIkJlemVpY2hudW5nXCIgLz4pfVxuICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgIDwvTWVudS5MaXN0PlxuXG4gICAgICB7Z2V0SW1hZ2VJbmZvKGl0ZW0pfVxuICAgIDwvRm9ybT5cbiAgKTtcbn07XG4iXX0=
