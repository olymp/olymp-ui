'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CellMeasurer = require('react-virtualized/dist/commonjs/CellMeasurer');

var _AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer');

var _AutoSizer2 = _interopRequireDefault(_AutoSizer);

var _WindowScroller = require('react-virtualized/dist/commonjs/WindowScroller');

var _WindowScroller2 = _interopRequireDefault(_WindowScroller);

var _Masonry = require('react-virtualized/dist/commonjs/Masonry');

var _Masonry2 = _interopRequireDefault(_Masonry);

var _thumb = require('./thumb');

var _thumb2 = _interopRequireDefault(_thumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var overscanByPixels = 500;
var Item = function Item(_ref) {
  var style = _ref.style,
      item = _ref.item,
      isActive = _ref.isActive,
      onClick = _ref.onClick,
      onRemove = _ref.onRemove,
      width = _ref.width;
  return _react2.default.createElement(
    'div',
    {
      style: Object.assign({}, style, {
        display: 'flex',
        flexDirection: 'column',
        wordBreak: 'break-all',
        width: width
      })
    },
    _react2.default.createElement(_thumb2.default, {
      item: item,
      width: width,
      onClick: onClick && function (e) {
        return onClick(item, e.altKey || e.shiftKey);
      },
      onRemove: onRemove && function () {
        return onRemove(item);
      },
      isActive: isActive
    }),
    _react2.default.createElement(
      'small',
      {
        style: { textAlign: 'center', maxWidth: width, marginTop: '-0.5rem' }
      },
      _react2.default.createElement(
        'b',
        null,
        item.caption
      )
    )
  );
};

var columnWidth = 150;
var columnHeight = 150;
var gutterSize = 0;

var GridExample = function (_PureComponent) {
  _inherits(GridExample, _PureComponent);

  function GridExample(props) {
    _classCallCheck(this, GridExample);

    var _this = _possibleConstructorReturn(this, (GridExample.__proto__ || Object.getPrototypeOf(GridExample)).call(this, props));

    _this.height = 0;

    _this.calculateColumnCount = function () {
      _this.columnCount = Math.floor(_this.width / (columnWidth + gutterSize));
      _this.columnWidth = Math.floor(_this.width / _this.columnCount);
    };

    _this.cellRenderer = function (_ref2) {
      var index = _ref2.index,
          key = _ref2.key,
          parent = _ref2.parent,
          style = _ref2.style;
      var _this$props = _this.props,
          items = _this$props.items,
          onClick = _this$props.onClick,
          onRemove = _this$props.onRemove,
          isActive = _this$props.isActive;


      var item = (items || [])[index];
      if (!item) {
        return null;
      }
      return _react2.default.createElement(
        _CellMeasurer.CellMeasurer,
        { cache: _this.cache, index: index, key: key, parent: parent },
        _react2.default.createElement(Item, {
          isActive: isActive && isActive(item),
          style: style,
          item: item,
          onClick: onClick,
          onRemove: onRemove,
          width: _this.columnWidth
        })
      );
    };

    _this.initCellPositioner = function () {
      if (typeof _this.cellPositioner === 'undefined') {
        _this.cellPositioner = (0, _Masonry.createCellPositioner)({
          cellMeasurerCache: _this.cache,
          columnCount: _this.columnCount,
          columnWidth: _this.columnWidth,
          spacer: gutterSize
        });
      }
    };

    _this.onResize = function (_ref3) {
      var width = _ref3.width,
          height = _ref3.height;
      var useBodyScroll = _this.props.useBodyScroll;

      _this.width = width;
      if (!useBodyScroll) {
        _this.height = height;
      }
      _this.columnHeights = {};
      _this.calculateColumnCount();
      _this.resetCellPositioner();
      if (_this.masonry) {
        _this.masonry.recomputeCellPositions();
      }
    };

    _this.renderMasonry = function (_ref4) {
      var width = _ref4.width,
          height = _ref4.height;
      var _this$props2 = _this.props,
          items = _this$props2.items,
          useBodyScroll = _this$props2.useBodyScroll;

      _this.width = width;
      if (!useBodyScroll) {
        _this.height = height;
      }

      _this.calculateColumnCount();
      _this.initCellPositioner();

      return _react2.default.createElement(_Masonry2.default, {
        selection: _this.props.selection,
        autoHeight: useBodyScroll,
        height: _this.height,
        overscanByPixels: overscanByPixels,
        cellCount: (items || []).length,
        cellMeasurerCache: _this.cache,
        cellPositioner: _this.cellPositioner,
        cellRenderer: _this.cellRenderer,
        ref: _this.setMasonryRef,
        width: width,
        scrollTop: _this.scrollTop,
        style: { outline: 0 }
      });
    };

    _this.resetCellPositioner = function () {
      _this.cellPositioner.reset({
        columnCount: _this.columnCount,
        columnWidth: _this.columnWidth,
        spacer: gutterSize
      });
    };

    _this.setMasonryRef = function (ref) {
      _this.masonry = ref;
    };

    _this.renderAutoSizer = function (_ref5) {
      var height = _ref5.height,
          scrollTop = _ref5.scrollTop;
      var _this$props3 = _this.props,
          selection = _this$props3.selection,
          useBodyScroll = _this$props3.useBodyScroll;

      _this.height = height;
      _this.scrollTop = scrollTop;
      return _react2.default.createElement(
        _AutoSizer2.default,
        {
          selection: selection,
          disableHeight: useBodyScroll,
          height: height,
          overscanByPixels: overscanByPixels,
          onResize: _this.onResize,
          scrollTop: scrollTop
        },
        _this.renderMasonry
      );
    };

    _this.columnCount = 0;
    _this.columnHeights = {};
    _this.cache = new _CellMeasurer.CellMeasurerCache({
      defaultHeight: columnHeight,
      defaultWidth: columnWidth,
      fixedWidth: true
    });
    return _this;
  }

  _createClass(GridExample, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          useBodyScroll = _props.useBodyScroll,
          selection = _props.selection,
          marginRight = _props.marginRight;

      if (!useBodyScroll) {
        return this.renderAutoSizer({ height: this.height });
      }
      return _react2.default.createElement(
        'div',
        {
          style: {
            marginRight: marginRight || 72
          }
        },
        _react2.default.createElement(
          _WindowScroller2.default,
          {
            selection: selection,
            overscanByPixels: overscanByPixels
          },
          this.renderAutoSizer
        )
      );
    }
  }]);

  return GridExample;
}(_react.PureComponent);

GridExample.defaultProps = {
  useBodyScroll: true
};
exports.default = GridExample;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvdmlld3MvZ2FsbGVyeS5lczYiXSwibmFtZXMiOlsib3ZlcnNjYW5CeVBpeGVscyIsIkl0ZW0iLCJzdHlsZSIsIml0ZW0iLCJpc0FjdGl2ZSIsIm9uQ2xpY2siLCJvblJlbW92ZSIsIndpZHRoIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJ3b3JkQnJlYWsiLCJlIiwiYWx0S2V5Iiwic2hpZnRLZXkiLCJ0ZXh0QWxpZ24iLCJtYXhXaWR0aCIsIm1hcmdpblRvcCIsImNhcHRpb24iLCJjb2x1bW5XaWR0aCIsImNvbHVtbkhlaWdodCIsImd1dHRlclNpemUiLCJHcmlkRXhhbXBsZSIsInByb3BzIiwiaGVpZ2h0IiwiY2FsY3VsYXRlQ29sdW1uQ291bnQiLCJjb2x1bW5Db3VudCIsIk1hdGgiLCJmbG9vciIsImNlbGxSZW5kZXJlciIsImluZGV4Iiwia2V5IiwicGFyZW50IiwiaXRlbXMiLCJjYWNoZSIsImluaXRDZWxsUG9zaXRpb25lciIsImNlbGxQb3NpdGlvbmVyIiwiY2VsbE1lYXN1cmVyQ2FjaGUiLCJzcGFjZXIiLCJvblJlc2l6ZSIsInVzZUJvZHlTY3JvbGwiLCJjb2x1bW5IZWlnaHRzIiwicmVzZXRDZWxsUG9zaXRpb25lciIsIm1hc29ucnkiLCJyZWNvbXB1dGVDZWxsUG9zaXRpb25zIiwicmVuZGVyTWFzb25yeSIsInNlbGVjdGlvbiIsImxlbmd0aCIsInNldE1hc29ucnlSZWYiLCJzY3JvbGxUb3AiLCJvdXRsaW5lIiwicmVzZXQiLCJyZWYiLCJyZW5kZXJBdXRvU2l6ZXIiLCJkZWZhdWx0SGVpZ2h0IiwiZGVmYXVsdFdpZHRoIiwiZml4ZWRXaWR0aCIsIm1hcmdpblJpZ2h0IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsR0FBekI7QUFDQSxJQUFNQyxPQUFPLFNBQVBBLElBQU87QUFBQSxNQUFHQyxLQUFILFFBQUdBLEtBQUg7QUFBQSxNQUFVQyxJQUFWLFFBQVVBLElBQVY7QUFBQSxNQUFnQkMsUUFBaEIsUUFBZ0JBLFFBQWhCO0FBQUEsTUFBMEJDLE9BQTFCLFFBQTBCQSxPQUExQjtBQUFBLE1BQW1DQyxRQUFuQyxRQUFtQ0EsUUFBbkM7QUFBQSxNQUE2Q0MsS0FBN0MsUUFBNkNBLEtBQTdDO0FBQUEsU0FDWDtBQUFBO0FBQUE7QUFDRSwrQkFDS0wsS0FETDtBQUVFTSxpQkFBUyxNQUZYO0FBR0VDLHVCQUFlLFFBSGpCO0FBSUVDLG1CQUFXLFdBSmI7QUFLRUg7QUFMRjtBQURGO0FBU0U7QUFDRSxZQUFNSixJQURSO0FBRUUsYUFBT0ksS0FGVDtBQUdFLGVBQVNGLFdBQVk7QUFBQSxlQUFLQSxRQUFRRixJQUFSLEVBQWNRLEVBQUVDLE1BQUYsSUFBWUQsRUFBRUUsUUFBNUIsQ0FBTDtBQUFBLE9BSHZCO0FBSUUsZ0JBQVVQLFlBQWE7QUFBQSxlQUFNQSxTQUFTSCxJQUFULENBQU47QUFBQSxPQUp6QjtBQUtFLGdCQUFVQztBQUxaLE1BVEY7QUFnQkU7QUFBQTtBQUFBO0FBQ0UsZUFBTyxFQUFFVSxXQUFXLFFBQWIsRUFBdUJDLFVBQVVSLEtBQWpDLEVBQXdDUyxXQUFXLFNBQW5EO0FBRFQ7QUFHRTtBQUFBO0FBQUE7QUFBSWIsYUFBS2M7QUFBVDtBQUhGO0FBaEJGLEdBRFc7QUFBQSxDQUFiOztBQXlCQSxJQUFNQyxjQUFjLEdBQXBCO0FBQ0EsSUFBTUMsZUFBZSxHQUFyQjtBQUNBLElBQU1DLGFBQWEsQ0FBbkI7O0lBQ3FCQyxXOzs7QUFPbkIsdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSwwSEFDWEEsS0FEVzs7QUFBQSxVQU5uQkMsTUFNbUIsR0FOVixDQU1VOztBQUFBLFVBWW5CQyxvQkFabUIsR0FZSSxZQUFNO0FBQzNCLFlBQUtDLFdBQUwsR0FBbUJDLEtBQUtDLEtBQUwsQ0FBVyxNQUFLcEIsS0FBTCxJQUFjVyxjQUFjRSxVQUE1QixDQUFYLENBQW5CO0FBQ0EsWUFBS0YsV0FBTCxHQUFtQlEsS0FBS0MsS0FBTCxDQUFXLE1BQUtwQixLQUFMLEdBQWEsTUFBS2tCLFdBQTdCLENBQW5CO0FBQ0QsS0Fma0I7O0FBQUEsVUFpQm5CRyxZQWpCbUIsR0FpQkosaUJBQW1DO0FBQUEsVUFBaENDLEtBQWdDLFNBQWhDQSxLQUFnQztBQUFBLFVBQXpCQyxHQUF5QixTQUF6QkEsR0FBeUI7QUFBQSxVQUFwQkMsTUFBb0IsU0FBcEJBLE1BQW9CO0FBQUEsVUFBWjdCLEtBQVksU0FBWkEsS0FBWTtBQUFBLHdCQUNELE1BQUtvQixLQURKO0FBQUEsVUFDeENVLEtBRHdDLGVBQ3hDQSxLQUR3QztBQUFBLFVBQ2pDM0IsT0FEaUMsZUFDakNBLE9BRGlDO0FBQUEsVUFDeEJDLFFBRHdCLGVBQ3hCQSxRQUR3QjtBQUFBLFVBQ2RGLFFBRGMsZUFDZEEsUUFEYzs7O0FBR2hELFVBQU1ELE9BQU8sQ0FBQzZCLFNBQVMsRUFBVixFQUFjSCxLQUFkLENBQWI7QUFDQSxVQUFJLENBQUMxQixJQUFMLEVBQVc7QUFDVCxlQUFPLElBQVA7QUFDRDtBQUNELGFBQ0U7QUFBQTtBQUFBLFVBQWMsT0FBTyxNQUFLOEIsS0FBMUIsRUFBaUMsT0FBT0osS0FBeEMsRUFBK0MsS0FBS0MsR0FBcEQsRUFBeUQsUUFBUUMsTUFBakU7QUFDRSxzQ0FBQyxJQUFEO0FBQ0Usb0JBQVUzQixZQUFZQSxTQUFTRCxJQUFULENBRHhCO0FBRUUsaUJBQU9ELEtBRlQ7QUFHRSxnQkFBTUMsSUFIUjtBQUlFLG1CQUFTRSxPQUpYO0FBS0Usb0JBQVVDLFFBTFo7QUFNRSxpQkFBTyxNQUFLWTtBQU5kO0FBREYsT0FERjtBQVlELEtBcENrQjs7QUFBQSxVQXNDbkJnQixrQkF0Q21CLEdBc0NFLFlBQU07QUFDekIsVUFBSSxPQUFPLE1BQUtDLGNBQVosS0FBK0IsV0FBbkMsRUFBZ0Q7QUFDOUMsY0FBS0EsY0FBTCxHQUFzQixtQ0FBcUI7QUFDekNDLDZCQUFtQixNQUFLSCxLQURpQjtBQUV6Q1IsdUJBQWEsTUFBS0EsV0FGdUI7QUFHekNQLHVCQUFhLE1BQUtBLFdBSHVCO0FBSXpDbUIsa0JBQVFqQjtBQUppQyxTQUFyQixDQUF0QjtBQU1EO0FBQ0YsS0EvQ2tCOztBQUFBLFVBaURuQmtCLFFBakRtQixHQWlEUixpQkFBdUI7QUFBQSxVQUFwQi9CLEtBQW9CLFNBQXBCQSxLQUFvQjtBQUFBLFVBQWJnQixNQUFhLFNBQWJBLE1BQWE7QUFBQSxVQUN4QmdCLGFBRHdCLEdBQ04sTUFBS2pCLEtBREMsQ0FDeEJpQixhQUR3Qjs7QUFFaEMsWUFBS2hDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFVBQUksQ0FBQ2dDLGFBQUwsRUFBb0I7QUFDbEIsY0FBS2hCLE1BQUwsR0FBY0EsTUFBZDtBQUNEO0FBQ0QsWUFBS2lCLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxZQUFLaEIsb0JBQUw7QUFDQSxZQUFLaUIsbUJBQUw7QUFDQSxVQUFJLE1BQUtDLE9BQVQsRUFBa0I7QUFDaEIsY0FBS0EsT0FBTCxDQUFhQyxzQkFBYjtBQUNEO0FBQ0YsS0E3RGtCOztBQUFBLFVBK0RuQkMsYUEvRG1CLEdBK0RILGlCQUF1QjtBQUFBLFVBQXBCckMsS0FBb0IsU0FBcEJBLEtBQW9CO0FBQUEsVUFBYmdCLE1BQWEsU0FBYkEsTUFBYTtBQUFBLHlCQUNKLE1BQUtELEtBREQ7QUFBQSxVQUM3QlUsS0FENkIsZ0JBQzdCQSxLQUQ2QjtBQUFBLFVBQ3RCTyxhQURzQixnQkFDdEJBLGFBRHNCOztBQUVyQyxZQUFLaEMsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsVUFBSSxDQUFDZ0MsYUFBTCxFQUFvQjtBQUNsQixjQUFLaEIsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBRUQsWUFBS0Msb0JBQUw7QUFDQSxZQUFLVSxrQkFBTDs7QUFFQSxhQUNFO0FBQ0UsbUJBQVcsTUFBS1osS0FBTCxDQUFXdUIsU0FEeEI7QUFFRSxvQkFBWU4sYUFGZDtBQUdFLGdCQUFRLE1BQUtoQixNQUhmO0FBSUUsMEJBQWtCdkIsZ0JBSnBCO0FBS0UsbUJBQVcsQ0FBQ2dDLFNBQVMsRUFBVixFQUFjYyxNQUwzQjtBQU1FLDJCQUFtQixNQUFLYixLQU4xQjtBQU9FLHdCQUFnQixNQUFLRSxjQVB2QjtBQVFFLHNCQUFjLE1BQUtQLFlBUnJCO0FBU0UsYUFBSyxNQUFLbUIsYUFUWjtBQVVFLGVBQU94QyxLQVZUO0FBV0UsbUJBQVcsTUFBS3lDLFNBWGxCO0FBWUUsZUFBTyxFQUFFQyxTQUFTLENBQVg7QUFaVCxRQURGO0FBZ0JELEtBekZrQjs7QUFBQSxVQTJGbkJSLG1CQTNGbUIsR0EyRkcsWUFBTTtBQUMxQixZQUFLTixjQUFMLENBQW9CZSxLQUFwQixDQUEwQjtBQUN4QnpCLHFCQUFhLE1BQUtBLFdBRE07QUFFeEJQLHFCQUFhLE1BQUtBLFdBRk07QUFHeEJtQixnQkFBUWpCO0FBSGdCLE9BQTFCO0FBS0QsS0FqR2tCOztBQUFBLFVBbUduQjJCLGFBbkdtQixHQW1HSCxlQUFPO0FBQ3JCLFlBQUtMLE9BQUwsR0FBZVMsR0FBZjtBQUNELEtBckdrQjs7QUFBQSxVQXVHbkJDLGVBdkdtQixHQXVHRCxpQkFBMkI7QUFBQSxVQUF4QjdCLE1BQXdCLFNBQXhCQSxNQUF3QjtBQUFBLFVBQWhCeUIsU0FBZ0IsU0FBaEJBLFNBQWdCO0FBQUEseUJBQ04sTUFBSzFCLEtBREM7QUFBQSxVQUNuQ3VCLFNBRG1DLGdCQUNuQ0EsU0FEbUM7QUFBQSxVQUN4Qk4sYUFEd0IsZ0JBQ3hCQSxhQUR3Qjs7QUFFM0MsWUFBS2hCLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFlBQUt5QixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0UscUJBQVdILFNBRGI7QUFFRSx5QkFBZU4sYUFGakI7QUFHRSxrQkFBUWhCLE1BSFY7QUFJRSw0QkFBa0J2QixnQkFKcEI7QUFLRSxvQkFBVSxNQUFLc0MsUUFMakI7QUFNRSxxQkFBV1U7QUFOYjtBQVFHLGNBQUtKO0FBUlIsT0FERjtBQVlELEtBdkhrQjs7QUFHakIsVUFBS25CLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxVQUFLZSxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsVUFBS1AsS0FBTCxHQUFhLG9DQUFzQjtBQUNqQ29CLHFCQUFlbEMsWUFEa0I7QUFFakNtQyxvQkFBY3BDLFdBRm1CO0FBR2pDcUMsa0JBQVk7QUFIcUIsS0FBdEIsQ0FBYjtBQUxpQjtBQVVsQjs7Ozs2QkErR1E7QUFBQSxtQkFDMkMsS0FBS2pDLEtBRGhEO0FBQUEsVUFDQ2lCLGFBREQsVUFDQ0EsYUFERDtBQUFBLFVBQ2dCTSxTQURoQixVQUNnQkEsU0FEaEI7QUFBQSxVQUMyQlcsV0FEM0IsVUFDMkJBLFdBRDNCOztBQUVQLFVBQUksQ0FBQ2pCLGFBQUwsRUFBb0I7QUFDbEIsZUFBTyxLQUFLYSxlQUFMLENBQXFCLEVBQUU3QixRQUFRLEtBQUtBLE1BQWYsRUFBckIsQ0FBUDtBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUE7QUFDRSxpQkFBTztBQUNMaUMseUJBQWFBLGVBQWU7QUFEdkI7QUFEVDtBQUtFO0FBQUE7QUFBQTtBQUNFLHVCQUFXWCxTQURiO0FBRUUsOEJBQWtCN0M7QUFGcEI7QUFJRyxlQUFLb0Q7QUFKUjtBQUxGLE9BREY7QUFjRDs7Ozs7O0FBbkprQi9CLFcsQ0FHWm9DLFksR0FBZTtBQUNwQmxCLGlCQUFlO0FBREssQztrQkFISGxCLFciLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS92aWV3cy9nYWxsZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBDZWxsTWVhc3VyZXIsXG4gIENlbGxNZWFzdXJlckNhY2hlXG59IGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvQ2VsbE1lYXN1cmVyJztcbmltcG9ydCBBdXRvU2l6ZXIgZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9BdXRvU2l6ZXInO1xuaW1wb3J0IFdpbmRvd1Njcm9sbGVyIGZyb20gJ3JlYWN0LXZpcnR1YWxpemVkL2Rpc3QvY29tbW9uanMvV2luZG93U2Nyb2xsZXInO1xuaW1wb3J0IE1hc29ucnksIHtcbiAgY3JlYXRlQ2VsbFBvc2l0aW9uZXJcbn0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQvZGlzdC9jb21tb25qcy9NYXNvbnJ5JztcbmltcG9ydCBUaHVtYiBmcm9tICcuL3RodW1iJztcblxuY29uc3Qgb3ZlcnNjYW5CeVBpeGVscyA9IDUwMDtcbmNvbnN0IEl0ZW0gPSAoeyBzdHlsZSwgaXRlbSwgaXNBY3RpdmUsIG9uQ2xpY2ssIG9uUmVtb3ZlLCB3aWR0aCB9KSA9PiAoXG4gIDxkaXZcbiAgICBzdHlsZT17e1xuICAgICAgLi4uc3R5bGUsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgIHdvcmRCcmVhazogJ2JyZWFrLWFsbCcsXG4gICAgICB3aWR0aFxuICAgIH19XG4gID5cbiAgICA8VGh1bWJcbiAgICAgIGl0ZW09e2l0ZW19XG4gICAgICB3aWR0aD17d2lkdGh9XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrICYmIChlID0+IG9uQ2xpY2soaXRlbSwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSkpfVxuICAgICAgb25SZW1vdmU9e29uUmVtb3ZlICYmICgoKSA9PiBvblJlbW92ZShpdGVtKSl9XG4gICAgICBpc0FjdGl2ZT17aXNBY3RpdmV9XG4gICAgLz5cbiAgICA8c21hbGxcbiAgICAgIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1heFdpZHRoOiB3aWR0aCwgbWFyZ2luVG9wOiAnLTAuNXJlbScgfX1cbiAgICA+XG4gICAgICA8Yj57aXRlbS5jYXB0aW9ufTwvYj5cbiAgICA8L3NtYWxsPlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IGNvbHVtbldpZHRoID0gMTUwO1xuY29uc3QgY29sdW1uSGVpZ2h0ID0gMTUwO1xuY29uc3QgZ3V0dGVyU2l6ZSA9IDA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkRXhhbXBsZSBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICBoZWlnaHQgPSAwO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdXNlQm9keVNjcm9sbDogdHJ1ZVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5jb2x1bW5Db3VudCA9IDA7XG4gICAgdGhpcy5jb2x1bW5IZWlnaHRzID0ge307XG4gICAgdGhpcy5jYWNoZSA9IG5ldyBDZWxsTWVhc3VyZXJDYWNoZSh7XG4gICAgICBkZWZhdWx0SGVpZ2h0OiBjb2x1bW5IZWlnaHQsXG4gICAgICBkZWZhdWx0V2lkdGg6IGNvbHVtbldpZHRoLFxuICAgICAgZml4ZWRXaWR0aDogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlQ29sdW1uQ291bnQgPSAoKSA9PiB7XG4gICAgdGhpcy5jb2x1bW5Db3VudCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIChjb2x1bW5XaWR0aCArIGd1dHRlclNpemUpKTtcbiAgICB0aGlzLmNvbHVtbldpZHRoID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gdGhpcy5jb2x1bW5Db3VudCk7XG4gIH07XG5cbiAgY2VsbFJlbmRlcmVyID0gKHsgaW5kZXgsIGtleSwgcGFyZW50LCBzdHlsZSB9KSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcywgb25DbGljaywgb25SZW1vdmUsIGlzQWN0aXZlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaXRlbSA9IChpdGVtcyB8fCBbXSlbaW5kZXhdO1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8Q2VsbE1lYXN1cmVyIGNhY2hlPXt0aGlzLmNhY2hlfSBpbmRleD17aW5kZXh9IGtleT17a2V5fSBwYXJlbnQ9e3BhcmVudH0+XG4gICAgICAgIDxJdGVtXG4gICAgICAgICAgaXNBY3RpdmU9e2lzQWN0aXZlICYmIGlzQWN0aXZlKGl0ZW0pfVxuICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgb25SZW1vdmU9e29uUmVtb3ZlfVxuICAgICAgICAgIHdpZHRoPXt0aGlzLmNvbHVtbldpZHRofVxuICAgICAgICAvPlxuICAgICAgPC9DZWxsTWVhc3VyZXI+XG4gICAgKTtcbiAgfTtcblxuICBpbml0Q2VsbFBvc2l0aW9uZXIgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNlbGxQb3NpdGlvbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5jZWxsUG9zaXRpb25lciA9IGNyZWF0ZUNlbGxQb3NpdGlvbmVyKHtcbiAgICAgICAgY2VsbE1lYXN1cmVyQ2FjaGU6IHRoaXMuY2FjaGUsXG4gICAgICAgIGNvbHVtbkNvdW50OiB0aGlzLmNvbHVtbkNvdW50LFxuICAgICAgICBjb2x1bW5XaWR0aDogdGhpcy5jb2x1bW5XaWR0aCxcbiAgICAgICAgc3BhY2VyOiBndXR0ZXJTaXplXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgb25SZXNpemUgPSAoeyB3aWR0aCwgaGVpZ2h0IH0pID0+IHtcbiAgICBjb25zdCB7IHVzZUJvZHlTY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIGlmICghdXNlQm9keVNjcm9sbCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMuY29sdW1uSGVpZ2h0cyA9IHt9O1xuICAgIHRoaXMuY2FsY3VsYXRlQ29sdW1uQ291bnQoKTtcbiAgICB0aGlzLnJlc2V0Q2VsbFBvc2l0aW9uZXIoKTtcbiAgICBpZiAodGhpcy5tYXNvbnJ5KSB7XG4gICAgICB0aGlzLm1hc29ucnkucmVjb21wdXRlQ2VsbFBvc2l0aW9ucygpO1xuICAgIH1cbiAgfTtcblxuICByZW5kZXJNYXNvbnJ5ID0gKHsgd2lkdGgsIGhlaWdodCB9KSA9PiB7XG4gICAgY29uc3QgeyBpdGVtcywgdXNlQm9keVNjcm9sbCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgaWYgKCF1c2VCb2R5U2Nyb2xsKSB7XG4gICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUNvbHVtbkNvdW50KCk7XG4gICAgdGhpcy5pbml0Q2VsbFBvc2l0aW9uZXIoKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8TWFzb25yeVxuICAgICAgICBzZWxlY3Rpb249e3RoaXMucHJvcHMuc2VsZWN0aW9ufVxuICAgICAgICBhdXRvSGVpZ2h0PXt1c2VCb2R5U2Nyb2xsfVxuICAgICAgICBoZWlnaHQ9e3RoaXMuaGVpZ2h0fVxuICAgICAgICBvdmVyc2NhbkJ5UGl4ZWxzPXtvdmVyc2NhbkJ5UGl4ZWxzfVxuICAgICAgICBjZWxsQ291bnQ9eyhpdGVtcyB8fCBbXSkubGVuZ3RofVxuICAgICAgICBjZWxsTWVhc3VyZXJDYWNoZT17dGhpcy5jYWNoZX1cbiAgICAgICAgY2VsbFBvc2l0aW9uZXI9e3RoaXMuY2VsbFBvc2l0aW9uZXJ9XG4gICAgICAgIGNlbGxSZW5kZXJlcj17dGhpcy5jZWxsUmVuZGVyZXJ9XG4gICAgICAgIHJlZj17dGhpcy5zZXRNYXNvbnJ5UmVmfVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgIHNjcm9sbFRvcD17dGhpcy5zY3JvbGxUb3B9XG4gICAgICAgIHN0eWxlPXt7IG91dGxpbmU6IDAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZXNldENlbGxQb3NpdGlvbmVyID0gKCkgPT4ge1xuICAgIHRoaXMuY2VsbFBvc2l0aW9uZXIucmVzZXQoe1xuICAgICAgY29sdW1uQ291bnQ6IHRoaXMuY29sdW1uQ291bnQsXG4gICAgICBjb2x1bW5XaWR0aDogdGhpcy5jb2x1bW5XaWR0aCxcbiAgICAgIHNwYWNlcjogZ3V0dGVyU2l6ZVxuICAgIH0pO1xuICB9O1xuXG4gIHNldE1hc29ucnlSZWYgPSByZWYgPT4ge1xuICAgIHRoaXMubWFzb25yeSA9IHJlZjtcbiAgfTtcblxuICByZW5kZXJBdXRvU2l6ZXIgPSAoeyBoZWlnaHQsIHNjcm9sbFRvcCB9KSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24sIHVzZUJvZHlTY3JvbGwgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgcmV0dXJuIChcbiAgICAgIDxBdXRvU2l6ZXJcbiAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259XG4gICAgICAgIGRpc2FibGVIZWlnaHQ9e3VzZUJvZHlTY3JvbGx9XG4gICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICBvdmVyc2NhbkJ5UGl4ZWxzPXtvdmVyc2NhbkJ5UGl4ZWxzfVxuICAgICAgICBvblJlc2l6ZT17dGhpcy5vblJlc2l6ZX1cbiAgICAgICAgc2Nyb2xsVG9wPXtzY3JvbGxUb3B9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlck1hc29ucnl9XG4gICAgICA8L0F1dG9TaXplcj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZUJvZHlTY3JvbGwsIHNlbGVjdGlvbiwgbWFyZ2luUmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF1c2VCb2R5U2Nyb2xsKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJBdXRvU2l6ZXIoeyBoZWlnaHQ6IHRoaXMuaGVpZ2h0IH0pO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpblJpZ2h0OiBtYXJnaW5SaWdodCB8fCA3MlxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8V2luZG93U2Nyb2xsZXJcbiAgICAgICAgICBzZWxlY3Rpb249e3NlbGVjdGlvbn1cbiAgICAgICAgICBvdmVyc2NhbkJ5UGl4ZWxzPXtvdmVyc2NhbkJ5UGl4ZWxzfVxuICAgICAgICA+XG4gICAgICAgICAge3RoaXMucmVuZGVyQXV0b1NpemVyfVxuICAgICAgICA8L1dpbmRvd1Njcm9sbGVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19
