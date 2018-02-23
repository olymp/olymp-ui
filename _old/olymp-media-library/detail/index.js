'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _groupBy2 = require('lodash/groupBy');

var _groupBy3 = _interopRequireDefault(_groupBy2);

require('antd/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFela = require('react-fela');

var _recompose = require('recompose');

var _detailBrowser = require('./detail-browser');

var _detailBrowser2 = _interopRequireDefault(_detailBrowser);

var _detailPicker = require('./detail-picker');

var _detailPicker2 = _interopRequireDefault(_detailPicker);

var _gallery = require('./gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _lightboxGallery = require('../lightbox-gallery');

var _lightboxGallery2 = _interopRequireDefault(_lightboxGallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Container = (0, _reactFela.createComponent)(function (_ref) {
  var collapsed = _ref.collapsed,
      active = _ref.active;
  return {
    opacity: collapsed ? 0 : 1,
    transition: 'opacity 200ms ease-out',
    display: active ? 'block' : 'none'
  };
}, 'div');

var enhance = (0, _recompose.compose)(_form2.default.create(), (0, _recompose.withState)('activeId', 'setActive', null), (0, _recompose.withProps)(function (_ref2) {
  var value = _ref2.value;
  return {
    multi: value.length > 1
  };
}), (0, _recompose.withPropsOnChange)(['value'], function (_ref3) {
  var value = _ref3.value;

  // get tags
  var selectedTags = [];
  value.forEach(function (item) {
    return (item.tags || []).forEach(function (tag) {
      return selectedTags.push(tag);
    });
  });
  var groupedTags = (0, _groupBy3.default)(selectedTags);

  return { selectedTags: selectedTags, groupedTags: groupedTags };
}));

exports.default = enhance(function (_ref4) {
  var form = _ref4.form,
      _ref4$value = _ref4.value,
      value = _ref4$value === undefined ? [] : _ref4$value,
      activeId = _ref4.activeId,
      multi = _ref4.multi,
      collapsed = _ref4.collapsed,
      editable = _ref4.editable,
      onClick = _ref4.onClick,
      setActive = _ref4.setActive,
      onRemove = _ref4.onRemove,
      rest = _objectWithoutProperties(_ref4, ['form', 'value', 'activeId', 'multi', 'collapsed', 'editable', 'onClick', 'setActive', 'onRemove']);

  var Detail = editable ? _detailBrowser2.default : _detailPicker2.default;
  var active = value.find(function (x) {
    return x.id === activeId;
  }) || value[0] || {};

  return _react2.default.createElement(
    Container,
    { collapsed: collapsed, active: true },
    _react2.default.createElement(
      _lightboxGallery2.default,
      null,
      multi && _react2.default.createElement(_gallery2.default, {
        items: value,
        selectedIds: [active.id],
        onClick: function onClick(_ref5) {
          var id = _ref5.id;
          return setActive(id);
        },
        onRemove: onRemove,
        justifyContent: 'space-around'
      })
    ),
    value.map(function (item) {
      return _react2.default.createElement(
        Container,
        {
          key: item.id,
          collapsed: collapsed,
          active: item.id === active.id
        },
        _react2.default.createElement(Detail, Object.assign({}, rest, {
          form: form,
          id: item.id,
          value: value,
          item: item
        }))
      );
    })
  );
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2luZGV4LmVzNiJdLCJuYW1lcyI6WyJDb250YWluZXIiLCJjb2xsYXBzZWQiLCJhY3RpdmUiLCJvcGFjaXR5IiwidHJhbnNpdGlvbiIsImRpc3BsYXkiLCJlbmhhbmNlIiwiY3JlYXRlIiwidmFsdWUiLCJtdWx0aSIsImxlbmd0aCIsInNlbGVjdGVkVGFncyIsImZvckVhY2giLCJpdGVtIiwidGFncyIsInB1c2giLCJ0YWciLCJncm91cGVkVGFncyIsImZvcm0iLCJhY3RpdmVJZCIsImVkaXRhYmxlIiwib25DbGljayIsInNldEFjdGl2ZSIsIm9uUmVtb3ZlIiwicmVzdCIsIkRldGFpbCIsImZpbmQiLCJ4IiwiaWQiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFlBQVksZ0NBQ2hCO0FBQUEsTUFBR0MsU0FBSCxRQUFHQSxTQUFIO0FBQUEsTUFBY0MsTUFBZCxRQUFjQSxNQUFkO0FBQUEsU0FBNEI7QUFDMUJDLGFBQVNGLFlBQVksQ0FBWixHQUFnQixDQURDO0FBRTFCRyxnQkFBWSx3QkFGYztBQUcxQkMsYUFBU0gsU0FBUyxPQUFULEdBQW1CO0FBSEYsR0FBNUI7QUFBQSxDQURnQixFQU1oQixLQU5nQixDQUFsQjs7QUFTQSxJQUFNSSxVQUFVLHdCQUNkLGVBQUtDLE1BQUwsRUFEYyxFQUVkLDBCQUFVLFVBQVYsRUFBc0IsV0FBdEIsRUFBbUMsSUFBbkMsQ0FGYyxFQUdkLDBCQUFVO0FBQUEsTUFBR0MsS0FBSCxTQUFHQSxLQUFIO0FBQUEsU0FBZ0I7QUFDeEJDLFdBQU9ELE1BQU1FLE1BQU4sR0FBZTtBQURFLEdBQWhCO0FBQUEsQ0FBVixDQUhjLEVBTWQsa0NBQWtCLENBQUMsT0FBRCxDQUFsQixFQUE2QixpQkFBZTtBQUFBLE1BQVpGLEtBQVksU0FBWkEsS0FBWTs7QUFDMUM7QUFDQSxNQUFNRyxlQUFlLEVBQXJCO0FBQ0FILFFBQU1JLE9BQU4sQ0FBYztBQUFBLFdBQ1osQ0FBQ0MsS0FBS0MsSUFBTCxJQUFhLEVBQWQsRUFBa0JGLE9BQWxCLENBQTBCO0FBQUEsYUFBT0QsYUFBYUksSUFBYixDQUFrQkMsR0FBbEIsQ0FBUDtBQUFBLEtBQTFCLENBRFk7QUFBQSxHQUFkO0FBR0EsTUFBTUMsY0FBYyx1QkFBUU4sWUFBUixDQUFwQjs7QUFFQSxTQUFPLEVBQUVBLDBCQUFGLEVBQWdCTSx3QkFBaEIsRUFBUDtBQUNELENBVEQsQ0FOYyxDQUFoQjs7a0JBa0JlWCxRQUNiLGlCQVdNO0FBQUEsTUFWSlksSUFVSSxTQVZKQSxJQVVJO0FBQUEsMEJBVEpWLEtBU0k7QUFBQSxNQVRKQSxLQVNJLCtCQVRJLEVBU0o7QUFBQSxNQVJKVyxRQVFJLFNBUkpBLFFBUUk7QUFBQSxNQVBKVixLQU9JLFNBUEpBLEtBT0k7QUFBQSxNQU5KUixTQU1JLFNBTkpBLFNBTUk7QUFBQSxNQUxKbUIsUUFLSSxTQUxKQSxRQUtJO0FBQUEsTUFKSkMsT0FJSSxTQUpKQSxPQUlJO0FBQUEsTUFISkMsU0FHSSxTQUhKQSxTQUdJO0FBQUEsTUFGSkMsUUFFSSxTQUZKQSxRQUVJO0FBQUEsTUFEREMsSUFDQzs7QUFDSixNQUFNQyxTQUFTTCwyREFBZjtBQUNBLE1BQU1sQixTQUFTTSxNQUFNa0IsSUFBTixDQUFXO0FBQUEsV0FBS0MsRUFBRUMsRUFBRixLQUFTVCxRQUFkO0FBQUEsR0FBWCxLQUFzQ1gsTUFBTSxDQUFOLENBQXRDLElBQWtELEVBQWpFOztBQUVBLFNBQ0U7QUFBQyxhQUFEO0FBQUEsTUFBVyxXQUFXUCxTQUF0QixFQUFpQyxZQUFqQztBQUNFO0FBQUE7QUFBQTtBQUNHUSxlQUNDO0FBQ0UsZUFBT0QsS0FEVDtBQUVFLHFCQUFhLENBQUNOLE9BQU8wQixFQUFSLENBRmY7QUFHRSxpQkFBUztBQUFBLGNBQUdBLEVBQUgsU0FBR0EsRUFBSDtBQUFBLGlCQUFZTixVQUFVTSxFQUFWLENBQVo7QUFBQSxTQUhYO0FBSUUsa0JBQVVMLFFBSlo7QUFLRSx3QkFBZTtBQUxqQjtBQUZKLEtBREY7QUFZR2YsVUFBTXFCLEdBQU4sQ0FBVTtBQUFBLGFBQ1Q7QUFBQyxpQkFBRDtBQUFBO0FBQ0UsZUFBS2hCLEtBQUtlLEVBRFo7QUFFRSxxQkFBVzNCLFNBRmI7QUFHRSxrQkFBUVksS0FBS2UsRUFBTCxLQUFZMUIsT0FBTzBCO0FBSDdCO0FBS0Usc0NBQUMsTUFBRCxvQkFDTUosSUFETjtBQUVFLGdCQUFNTixJQUZSO0FBR0UsY0FBSUwsS0FBS2UsRUFIWDtBQUlFLGlCQUFPcEIsS0FKVDtBQUtFLGdCQUFNSztBQUxSO0FBTEYsT0FEUztBQUFBLEtBQVY7QUFaSCxHQURGO0FBOEJELENBOUNZLEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS9kZXRhaWwvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QtZmVsYSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnYW50ZCc7XG5pbXBvcnQgeyBncm91cEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGNvbXBvc2UsIHdpdGhQcm9wcywgd2l0aFByb3BzT25DaGFuZ2UsIHdpdGhTdGF0ZSB9IGZyb20gJ3JlY29tcG9zZSc7XG5pbXBvcnQgRGV0YWlsQnJvd3NlciBmcm9tICcuL2RldGFpbC1icm93c2VyJztcbmltcG9ydCBEZXRhaWxQaWNrZXIgZnJvbSAnLi9kZXRhaWwtcGlja2VyJztcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4vZ2FsbGVyeSc7XG5pbXBvcnQgTGlnaHRib3hHYWxsZXJ5IGZyb20gJy4uL2xpZ2h0Ym94LWdhbGxlcnknO1xuXG5jb25zdCBDb250YWluZXIgPSBjcmVhdGVDb21wb25lbnQoXG4gICh7IGNvbGxhcHNlZCwgYWN0aXZlIH0pID0+ICh7XG4gICAgb3BhY2l0eTogY29sbGFwc2VkID8gMCA6IDEsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMjAwbXMgZWFzZS1vdXQnLFxuICAgIGRpc3BsYXk6IGFjdGl2ZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgfSksXG4gICdkaXYnXG4pO1xuXG5jb25zdCBlbmhhbmNlID0gY29tcG9zZShcbiAgRm9ybS5jcmVhdGUoKSxcbiAgd2l0aFN0YXRlKCdhY3RpdmVJZCcsICdzZXRBY3RpdmUnLCBudWxsKSxcbiAgd2l0aFByb3BzKCh7IHZhbHVlIH0pID0+ICh7XG4gICAgbXVsdGk6IHZhbHVlLmxlbmd0aCA+IDFcbiAgfSkpLFxuICB3aXRoUHJvcHNPbkNoYW5nZShbJ3ZhbHVlJ10sICh7IHZhbHVlIH0pID0+IHtcbiAgICAvLyBnZXQgdGFnc1xuICAgIGNvbnN0IHNlbGVjdGVkVGFncyA9IFtdO1xuICAgIHZhbHVlLmZvckVhY2goaXRlbSA9PlxuICAgICAgKGl0ZW0udGFncyB8fCBbXSkuZm9yRWFjaCh0YWcgPT4gc2VsZWN0ZWRUYWdzLnB1c2godGFnKSlcbiAgICApO1xuICAgIGNvbnN0IGdyb3VwZWRUYWdzID0gZ3JvdXBCeShzZWxlY3RlZFRhZ3MpO1xuXG4gICAgcmV0dXJuIHsgc2VsZWN0ZWRUYWdzLCBncm91cGVkVGFncyB9O1xuICB9KVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgZW5oYW5jZShcbiAgKHtcbiAgICBmb3JtLFxuICAgIHZhbHVlID0gW10sXG4gICAgYWN0aXZlSWQsXG4gICAgbXVsdGksXG4gICAgY29sbGFwc2VkLFxuICAgIGVkaXRhYmxlLFxuICAgIG9uQ2xpY2ssXG4gICAgc2V0QWN0aXZlLFxuICAgIG9uUmVtb3ZlLFxuICAgIC4uLnJlc3RcbiAgfSkgPT4ge1xuICAgIGNvbnN0IERldGFpbCA9IGVkaXRhYmxlID8gRGV0YWlsQnJvd3NlciA6IERldGFpbFBpY2tlcjtcbiAgICBjb25zdCBhY3RpdmUgPSB2YWx1ZS5maW5kKHggPT4geC5pZCA9PT0gYWN0aXZlSWQpIHx8IHZhbHVlWzBdIHx8IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXIgY29sbGFwc2VkPXtjb2xsYXBzZWR9IGFjdGl2ZT5cbiAgICAgICAgPExpZ2h0Ym94R2FsbGVyeT5cbiAgICAgICAgICB7bXVsdGkgJiYgKFxuICAgICAgICAgICAgPEdhbGxlcnlcbiAgICAgICAgICAgICAgaXRlbXM9e3ZhbHVlfVxuICAgICAgICAgICAgICBzZWxlY3RlZElkcz17W2FjdGl2ZS5pZF19XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyh7IGlkIH0pID0+IHNldEFjdGl2ZShpZCl9XG4gICAgICAgICAgICAgIG9uUmVtb3ZlPXtvblJlbW92ZX1cbiAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1hcm91bmRcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0xpZ2h0Ym94R2FsbGVyeT5cbiAgICAgICAge3ZhbHVlLm1hcChpdGVtID0+IChcbiAgICAgICAgICA8Q29udGFpbmVyXG4gICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICBjb2xsYXBzZWQ9e2NvbGxhcHNlZH1cbiAgICAgICAgICAgIGFjdGl2ZT17aXRlbS5pZCA9PT0gYWN0aXZlLmlkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEZXRhaWxcbiAgICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgICAgIGZvcm09e2Zvcm19XG4gICAgICAgICAgICAgIGlkPXtpdGVtLmlkfVxuICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICApKX1cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbik7XG4iXX0=
