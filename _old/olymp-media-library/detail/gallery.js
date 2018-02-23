'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaList = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFela = require('react-fela');

var _thumb = require('../views/thumb');

var _thumb2 = _interopRequireDefault(_thumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Thumbs = (0, _reactFela.createComponent)(function (_ref) {
  var justifyContent = _ref.justifyContent;
  return {
    padding: '.5rem 0',
    borderTop: '1px solid #eee',
    maxHeight: 100,
    maxWidth: '100%',
    overflowY: 'hidden',
    overflowX: 'scroll',
    hasFlex: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: justifyContent || 'space-between',
      alignContent: 'flex-start',
      alignItems: 'flex-start'
    }
  };
}, 'div', function (_ref2) {
  var justifyContent = _ref2.justifyContent,
      p = _objectWithoutProperties(_ref2, ['justifyContent']);

  return Object.keys(p);
});

var MediaList = function MediaList(_ref3) {
  var items = _ref3.items,
      itemHeight = _ref3.itemHeight,
      selectedIds = _ref3.selectedIds,
      _onClick = _ref3.onClick,
      _onRemove = _ref3.onRemove,
      rest = _objectWithoutProperties(_ref3, ['items', 'itemHeight', 'selectedIds', 'onClick', 'onRemove']);

  return _react2.default.createElement(
    Thumbs,
    rest,
    (items || []).map(function (item) {
      return _react2.default.createElement(_thumb2.default, {
        item: item,
        onClick: function onClick() {
          return _onClick(item);
        },
        onRemove: function onRemove() {
          return _onRemove(item);
        },
        isActive: selectedIds.indexOf(item.id) !== -1,
        height: itemHeight,
        key: item.id
      });
    })
  );
};
exports.MediaList = MediaList;
MediaList.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.object),
  itemHeight: _propTypes2.default.number,
  selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onClick: _propTypes2.default.func,
  onRemove: _propTypes2.default.func
};
MediaList.defaultProps = {
  items: [],
  itemHeight: 80,
  selectedIds: [],
  onClick: function onClick() {},
  onRemove: function onRemove() {}
};
exports.default = MediaList;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2dhbGxlcnkuZXM2Il0sIm5hbWVzIjpbIlRodW1icyIsImp1c3RpZnlDb250ZW50IiwicGFkZGluZyIsImJvcmRlclRvcCIsIm1heEhlaWdodCIsIm1heFdpZHRoIiwib3ZlcmZsb3dZIiwib3ZlcmZsb3dYIiwiaGFzRmxleCIsImRpc3BsYXkiLCJmbGV4RmxvdyIsImFsaWduQ29udGVudCIsImFsaWduSXRlbXMiLCJwIiwiT2JqZWN0Iiwia2V5cyIsIk1lZGlhTGlzdCIsIml0ZW1zIiwiaXRlbUhlaWdodCIsInNlbGVjdGVkSWRzIiwib25DbGljayIsIm9uUmVtb3ZlIiwicmVzdCIsIm1hcCIsIml0ZW0iLCJpbmRleE9mIiwiaWQiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0IiwibnVtYmVyIiwic3RyaW5nIiwiZnVuYyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLGdDQUNiO0FBQUEsTUFBR0MsY0FBSCxRQUFHQSxjQUFIO0FBQUEsU0FBeUI7QUFDdkJDLGFBQVMsU0FEYztBQUV2QkMsZUFBVyxnQkFGWTtBQUd2QkMsZUFBVyxHQUhZO0FBSXZCQyxjQUFVLE1BSmE7QUFLdkJDLGVBQVcsUUFMWTtBQU12QkMsZUFBVyxRQU5ZO0FBT3ZCQyxhQUFTO0FBQ1BDLGVBQVMsTUFERjtBQUVQQyxnQkFBVSxhQUZIO0FBR1BULHNCQUFnQkEsa0JBQWtCLGVBSDNCO0FBSVBVLG9CQUFjLFlBSlA7QUFLUEMsa0JBQVk7QUFMTDtBQVBjLEdBQXpCO0FBQUEsQ0FEYSxFQWdCYixLQWhCYSxFQWlCYjtBQUFBLE1BQUdYLGNBQUgsU0FBR0EsY0FBSDtBQUFBLE1BQXNCWSxDQUF0Qjs7QUFBQSxTQUE4QkMsT0FBT0MsSUFBUCxDQUFZRixDQUFaLENBQTlCO0FBQUEsQ0FqQmEsQ0FBZjs7QUFvQk8sSUFBTUcsWUFBWSxTQUFaQSxTQUFZO0FBQUEsTUFDdkJDLEtBRHVCLFNBQ3ZCQSxLQUR1QjtBQUFBLE1BRXZCQyxVQUZ1QixTQUV2QkEsVUFGdUI7QUFBQSxNQUd2QkMsV0FIdUIsU0FHdkJBLFdBSHVCO0FBQUEsTUFJdkJDLFFBSnVCLFNBSXZCQSxPQUp1QjtBQUFBLE1BS3ZCQyxTQUx1QixTQUt2QkEsUUFMdUI7QUFBQSxNQU1wQkMsSUFOb0I7O0FBQUEsU0FRdkI7QUFBQyxVQUFEO0FBQVlBLFFBQVo7QUFDRyxLQUFDTCxTQUFTLEVBQVYsRUFBY00sR0FBZCxDQUFrQjtBQUFBLGFBQ2pCO0FBQ0UsY0FBTUMsSUFEUjtBQUVFLGlCQUFTO0FBQUEsaUJBQU1KLFNBQVFJLElBQVIsQ0FBTjtBQUFBLFNBRlg7QUFHRSxrQkFBVTtBQUFBLGlCQUFNSCxVQUFTRyxJQUFULENBQU47QUFBQSxTQUhaO0FBSUUsa0JBQVVMLFlBQVlNLE9BQVosQ0FBb0JELEtBQUtFLEVBQXpCLE1BQWlDLENBQUMsQ0FKOUM7QUFLRSxnQkFBUVIsVUFMVjtBQU1FLGFBQUtNLEtBQUtFO0FBTlosUUFEaUI7QUFBQSxLQUFsQjtBQURILEdBUnVCO0FBQUEsQ0FBbEI7O0FBcUJQVixVQUFVVyxTQUFWLEdBQXNCO0FBQ3BCVixTQUFPLG9CQUFVVyxPQUFWLENBQWtCLG9CQUFVQyxNQUE1QixDQURhO0FBRXBCWCxjQUFZLG9CQUFVWSxNQUZGO0FBR3BCWCxlQUFhLG9CQUFVUyxPQUFWLENBQWtCLG9CQUFVRyxNQUE1QixDQUhPO0FBSXBCWCxXQUFTLG9CQUFVWSxJQUpDO0FBS3BCWCxZQUFVLG9CQUFVVztBQUxBLENBQXRCO0FBT0FoQixVQUFVaUIsWUFBVixHQUF5QjtBQUN2QmhCLFNBQU8sRUFEZ0I7QUFFdkJDLGNBQVksRUFGVztBQUd2QkMsZUFBYSxFQUhVO0FBSXZCQyxXQUFTLG1CQUFNLENBQUUsQ0FKTTtBQUt2QkMsWUFBVSxvQkFBTSxDQUFFO0FBTEssQ0FBekI7a0JBT2VMLFMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS9kZXRhaWwvZ2FsbGVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QtZmVsYSc7XG5pbXBvcnQgVGh1bWIgZnJvbSAnLi4vdmlld3MvdGh1bWInO1xuXG5jb25zdCBUaHVtYnMgPSBjcmVhdGVDb21wb25lbnQoXG4gICh7IGp1c3RpZnlDb250ZW50IH0pID0+ICh7XG4gICAgcGFkZGluZzogJy41cmVtIDAnLFxuICAgIGJvcmRlclRvcDogJzFweCBzb2xpZCAjZWVlJyxcbiAgICBtYXhIZWlnaHQ6IDEwMCxcbiAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgIG92ZXJmbG93WTogJ2hpZGRlbicsXG4gICAgb3ZlcmZsb3dYOiAnc2Nyb2xsJyxcbiAgICBoYXNGbGV4OiB7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBmbGV4RmxvdzogJ2NvbHVtbiB3cmFwJyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5Q29udGVudCB8fCAnc3BhY2UtYmV0d2VlbicsXG4gICAgICBhbGlnbkNvbnRlbnQ6ICdmbGV4LXN0YXJ0JyxcbiAgICAgIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0J1xuICAgIH1cbiAgfSksXG4gICdkaXYnLFxuICAoeyBqdXN0aWZ5Q29udGVudCwgLi4ucCB9KSA9PiBPYmplY3Qua2V5cyhwKVxuKTtcblxuZXhwb3J0IGNvbnN0IE1lZGlhTGlzdCA9ICh7XG4gIGl0ZW1zLFxuICBpdGVtSGVpZ2h0LFxuICBzZWxlY3RlZElkcyxcbiAgb25DbGljayxcbiAgb25SZW1vdmUsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPFRodW1icyB7Li4ucmVzdH0+XG4gICAgeyhpdGVtcyB8fCBbXSkubWFwKGl0ZW0gPT4gKFxuICAgICAgPFRodW1iXG4gICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2xpY2soaXRlbSl9XG4gICAgICAgIG9uUmVtb3ZlPXsoKSA9PiBvblJlbW92ZShpdGVtKX1cbiAgICAgICAgaXNBY3RpdmU9e3NlbGVjdGVkSWRzLmluZGV4T2YoaXRlbS5pZCkgIT09IC0xfVxuICAgICAgICBoZWlnaHQ9e2l0ZW1IZWlnaHR9XG4gICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgIC8+XG4gICAgKSl9XG4gIDwvVGh1bWJzPlxuKTtcbk1lZGlhTGlzdC5wcm9wVHlwZXMgPSB7XG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgaXRlbUhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgc2VsZWN0ZWRJZHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jXG59O1xuTWVkaWFMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgaXRlbXM6IFtdLFxuICBpdGVtSGVpZ2h0OiA4MCxcbiAgc2VsZWN0ZWRJZHM6IFtdLFxuICBvbkNsaWNrOiAoKSA9PiB7fSxcbiAgb25SZW1vdmU6ICgpID0+IHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgTWVkaWFMaXN0O1xuIl19
