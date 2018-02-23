'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _reactFela = require('react-fela');

var _trio = require('olymp-ui/menu/trio');

var _olympUi = require('olymp-ui');

var _menu = require('olymp-ui/menu');

var _menu2 = _interopRequireDefault(_menu);

var _faChevronLeft = require('olymp-icons/lib/fa-chevron-left');

var _faChevronLeft2 = _interopRequireDefault(_faChevronLeft);

var _faPictureO = require('olymp-icons/lib/fa-picture-o');

var _faPictureO2 = _interopRequireDefault(_faPictureO);

var _upload = require('olymp-antd/upload');

var _upload2 = _interopRequireDefault(_upload);

var _cloudinary = require('olymp-antd/upload/cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _gql = require('../gql');

var _gallery = require('./gallery');

var _gallery2 = _interopRequireDefault(_gallery);

var _detail = require('../detail');

var _detail2 = _interopRequireDefault(_detail);

var _image = require('../image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// import Dragzone from '../components/dragzone';

var Upload = (0, _cloudinary2.default)(_upload2.default);
var EMPTY = 'Keine Tags';
var TRASH = 'Papierkorb';
var GENERAL = 'Allgemein';
var INITIAL_ARRAY = [];

var Label = (0, _reactFela.createComponent)(function (_ref) {
  var theme = _ref.theme;
  return {
    '> circle': {
      fill: theme.dark5
    }
  };
}, function (_ref2) {
  var children = _ref2.children,
      p = _objectWithoutProperties(_ref2, ['children']);

  return _react2.default.createElement(
    'svg',
    Object.assign({
      width: '64',
      height: '64',
      viewBox: '0 0 64 64',
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1'
    }, p),
    _react2.default.createElement('circle', { cx: '32', cy: '32', r: '31' }),
    _react2.default.createElement(
      'text',
      {
        textAnchor: 'middle',
        x: '50%',
        y: '50%',
        dy: '.35em',
        fontFamily: 'sans-serif',
        fontSize: '45px',
        fill: 'white'
      },
      children
    )
  );
});

var addSortedChildren = function addSortedChildren(obj) {
  var sorter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'length';

  if (!obj.map) {
    return obj;
  }
  var map = obj.map;

  var keys = Object.keys(map);
  if (sorter === 'length') {
    keys = (0, _sortBy3.default)(keys, function (key) {
      return map[key].items.length;
    }).reverse();
  } else if (sorter === 'name') {
    keys = (0, _sortBy3.default)(keys);
  }
  return keys.reduce(function (result, key) {
    var childs = addSortedChildren(map[key], sorter);
    childs.key = key;
    result.map[key] = childs;
    result.children.push(childs);
    return result;
  }, Object.assign({}, obj, { children: [], map: {} }));
};

var CloudinaryView = (_dec = (0, _recompose.withPropsOnChange)(['items', 'search', 'format'], function (_ref3) {
  var items = _ref3.items,
      search = _ref3.search,
      format = _ref3.format;

  var apps = items.reduce(function (result, item) {
    if (format && item.format !== format) {
      return result;
    }
    var app = !!item.publicId && item.publicId.indexOf('/') !== -1 && item.publicId.split('/')[0] || 'gzk';
    var f = item.removed ? TRASH : item.folder || GENERAL;
    if (f && search && f.toLowerCase().indexOf(search.toLowerCase()) === -1) {
      return result;
    }
    if (!result[app]) {
      result[app] = {
        children: [],
        map: {},
        items: []
      };
    }
    if (!result[app].map[f]) {
      result[app].map[f] = {
        children: [],
        map: {},
        items: []
      };
    }
    result[app].items.push(item);
    result[app].map[f].items.push(item);

    var tags = result[app].map[f].map;
    if (!item.tags || !item.tags.length) {
      if (!tags[GENERAL]) {
        tags[GENERAL] = {
          children: [],
          map: {},
          items: []
        };
      }
      if (!tags[GENERAL].map[EMPTY]) {
        tags[GENERAL].map[EMPTY] = {
          children: [],
          map: {},
          items: []
        };
      }
      tags[GENERAL].items.push(item);
      tags[GENERAL].map[EMPTY].items.push(item);
    } else {
      item.tags.forEach(function (tag) {
        if (search && tag.toLowerCase().indexOf(search.toLowerCase()) === -1) {
          return;
        }
        var lastIndex = tag.lastIndexOf('/');
        var firstPart = lastIndex !== -1 ? tag.substr(0, lastIndex) : GENERAL;
        var lastPart = lastIndex !== -1 ? tag.substr(lastIndex + 1) : tag;
        if (!tags[firstPart]) {
          tags[firstPart] = {
            children: [],
            map: {},
            items: []
          };
        }
        if (!tags[firstPart].map[lastPart]) {
          tags[firstPart].map[lastPart] = {
            children: [],
            map: {},
            items: []
          };
        }
        tags[firstPart].items.push(item);
        tags[firstPart].map[lastPart].items.push(item);
      });
    }

    return result;
  }, {});

  return {
    tree: apps
  };
}), _dec2 = (0, _recompose.withPropsOnChange)(['sorting', 'tree'], function (_ref4) {
  var tree = _ref4.tree,
      sorting = _ref4.sorting,
      items = _ref4.items;
  return {
    tree: addSortedChildren({ map: tree, items: items }, sorting)
  };
}), _dec3 = (0, _recompose.withPropsOnChange)(['value'], function (_ref5) {
  var value = _ref5.value;
  return {
    value: value ? value.filter(function (x) {
      return x;
    }) : null
  };
}), _dec4 = (0, _recompose.withState)('collapsed', 'setCollapsed', true), _dec5 = (0, _recompose.withState)('sorting', 'setSorting', 'length'), _dec6 = (0, _recompose.withState)('tags', 'setTags', INITIAL_ARRAY), _dec7 = (0, _recompose.withState)('selection', 'setSelection', function (_ref6) {
  var value = _ref6.value;
  return value ? value.map(function (v) {
    return v.id;
  }) : [];
}), _dec8 = (0, _recompose.withPropsOnChange)(['selection', 'items'], function (_ref7) {
  var selection = _ref7.selection,
      _ref7$items = _ref7.items,
      items = _ref7$items === undefined ? [] : _ref7$items;
  return {
    selectedItems: items.filter(function (x) {
      return selection.includes(x.id);
    })
  };
}), (0, _gql.queryMedias)(_class = _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = function (_Component) {
  _inherits(CloudinaryView, _Component);

  function CloudinaryView() {
    var _ref8;

    var _temp, _this, _ret;

    _classCallCheck(this, CloudinaryView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref8 = CloudinaryView.__proto__ || Object.getPrototypeOf(CloudinaryView)).call.apply(_ref8, [this].concat(args))), _this), _this.onClick = function (_ref9) {
      var id = _ref9.id;
      var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          selection = _this$props.selection,
          setSelection = _this$props.setSelection,
          multi = _this$props.multi;


      if (multi && multiple) {
        if (selection.findIndex(function (sId) {
          return sId === id;
        }) === -1) {
          setSelection([].concat(_toConsumableArray(selection), [id]));
        } else {
          setSelection(selection.filter(function (x) {
            return x !== id;
          }));
        }
      } else {
        setSelection([id]);
      }
    }, _this.initial = true, _this.renderMenu = function () {
      var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _this$props2 = _this.props,
          goRoot = _this$props2.goRoot,
          setTags = _this$props2.setTags,
          tags = _this$props2.tags,
          tree = _this$props2.tree,
          app = _this$props2.app;


      var children = [];
      if (keys.length === 0) {
        children = tree.children.map(function (app) {
          return _react2.default.createElement(
            _menu2.default.List,
            { key: app.key, title: app.key },
            app.children.map(function (dir) {
              return _react2.default.createElement(
                _menu2.default.Item,
                {
                  onClick: function onClick() {
                    return setTags([app.key + '/' + dir.key]);
                  },
                  key: dir.key,
                  extra: _react2.default.createElement(
                    'b',
                    null,
                    dir.items.length,
                    '\xA0\xA0'
                  )
                },
                dir.key
              );
            })
          );
        });
      } else {
        var _keys = _slicedToArray(keys, 1),
            key0 = _keys[0];

        var _key0$split = key0.split('/'),
            _key0$split2 = _slicedToArray(_key0$split, 2),
            _app = _key0$split2[0],
            folder = _key0$split2[1];

        var node = tree.map[_app].map[folder];
        children = node.children.map(function (tag) {
          return _react2.default.createElement(
            _menu2.default.List,
            {
              key: tag.key,
              title: tag.key,
              extra: _react2.default.createElement(
                'b',
                null,
                tag.items.length,
                '\xA0\xA0'
              )
            },
            tag.children.map(function (subTag) {
              return _react2.default.createElement(
                _menu2.default.Item,
                {
                  onClick: function onClick() {
                    return setTags([key0, tag.key + '/' + subTag.key]);
                  },
                  key: subTag.key,
                  active: tags.indexOf(tag.key + '/' + subTag.key) !== -1,
                  extra: _react2.default.createElement(
                    'b',
                    null,
                    subTag.items.length,
                    '\xA0\xA0'
                  )
                },
                subTag.key
              );
            })
          );
        });
      }

      return _react2.default.createElement(
        _menu2.default,
        {
          key: keys.join('|'),
          header: _react2.default.createElement(
            _menu2.default.Item,
            { large: true, onClick: goRoot, icon: _react2.default.createElement(_faPictureO2.default, null) },
            'Mediathek'
          )
        },
        keys.length > 0 && _react2.default.createElement(
          _menu2.default.Item,
          { icon: _react2.default.createElement(_faChevronLeft2.default, null), onClick: function onClick() {
              return setTags([]);
            } },
          'Zur\xFCck'
        ),
        _react2.default.createElement(Upload, { onSuccess: function onSuccess(x) {
            return console.log('SUCCESS', x);
          } }),
        children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CloudinaryView, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref10) {
      var _ref10$selectedItems = _ref10.selectedItems,
          selectedItems = _ref10$selectedItems === undefined ? [] : _ref10$selectedItems;

      var thisSelection = this.props.selectedItems || [];
      if (selectedItems.length !== thisSelection.length) {
        this.initial = false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          tags = _props.tags,
          setCollapsed = _props.setCollapsed,
          selection = _props.selection,
          tree = _props.tree,
          setSelection = _props.setSelection,
          selectedItems = _props.selectedItems,
          inModal = _props.inModal,
          multi = _props.multi,
          value = _props.value,
          onChange = _props.onChange,
          onClose = _props.onClose;

      var collapsed = false;

      var _tags = _slicedToArray(tags, 2),
          key0 = _tags[0],
          key1 = _tags[1];

      var _ref11 = key0 ? key0.split('/') : [],
          _ref12 = _slicedToArray(_ref11, 2),
          app = _ref12[0],
          folder = _ref12[1];

      var _ref13 = key1 ? key1.split('/') : [],
          _ref14 = _slicedToArray(_ref13, 2),
          group = _ref14[0],
          tag = _ref14[1];

      var node = app && folder ? tree.map[app].map[folder] : tree;
      var filteredItems = group && tag ? node.map[group].map[tag].items : node.items;

      return _react2.default.createElement(
        _trio.SecondarySidebar,
        {
          width: 240,
          menu: _react2.default.createElement(_menu.StackedMenu, {
            keys: tags.filter(function (x, i) {
              return i < 1;
            }),
            renderMenu: this.renderMenu
          })
        },
        _react2.default.createElement(_gallery2.default, {
          useBodyScroll: !inModal,
          key: tags.join('|'),
          items: this.initial && !tags.length && selectedItems.length ? selectedItems : filteredItems,
          marginRight: collapsed ? 72 : 300,
          onClick: this.onClick,
          selection: selection,
          isActive: function isActive(_ref15) {
            var id = _ref15.id;
            return selection.indexOf(id) !== -1;
          },
          onRemove: function onRemove(_ref16) {
            var id = _ref16.id;
            return setSelection(selection.filter(function (x) {
              return id !== x;
            }));
          }
        }),
        !!selectedItems.length && _react2.default.createElement(
          _olympUi.Drawer,
          {
            open: true,
            collapsed: collapsed,
            dim: false,
            right: true,
            width: collapsed ? 72 : 300,
            onMouseEnter: function onMouseEnter() {
              return setCollapsed(false);
            },
            onMouseLeave: function onMouseLeave() {
              return setCollapsed(true);
            }
          },
          _react2.default.createElement(
            _menu2.default,
            {
              collapsed: collapsed,
              header: _react2.default.createElement(
                _menu2.default.Item,
                { large: true, icon: _react2.default.createElement(
                    Label,
                    null,
                    selectedItems.length
                  ) },
                'Bearbeiten'
              )
              // headerInverted
              // headerColor
            },
            _react2.default.createElement(
              _menu2.default.Space,
              null,
              collapsed && (value || selectedItems || []).map(function (v) {
                return _react2.default.createElement(_menu2.default.Item, {
                  key: v.id,
                  large: true,
                  icon: _react2.default.createElement(_image2.default, { value: v, width: 60, height: 60 })
                });
              }),
              _react2.default.createElement(_detail2.default, {
                value: value || selectedItems || [],
                multi: multi,
                editable: !inModal,
                collapsed: collapsed,
                onRemove: function onRemove(_ref17) {
                  var id = _ref17.id;
                  return setSelection(selection.filter(function (x) {
                    return id !== x;
                  }));
                }
              })
            )
          )
        )
      );
    }
  }]);

  return CloudinaryView;
}(_react.Component)) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
CloudinaryView.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.object),
  filteredItems: _propTypes2.default.arrayOf(_propTypes2.default.object),
  selectedIds: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onClose: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  addSelection: _propTypes2.default.func,
  removeSelection: _propTypes2.default.func,
  setSelection: _propTypes2.default.func,
  format: _propTypes2.default.string,
  multi: _propTypes2.default.bool
};
CloudinaryView.defaultProps = {
  items: [],
  filteredItems: [],
  selectedIds: [],
  multi: true,
  onClose: undefined,
  onChange: undefined,
  addSelection: undefined,
  removeSelection: undefined,
  setSelection: undefined,
  format: undefined
};
exports.default = CloudinaryView;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvdmlld3MvY2xvdWRpbmFyeS5lczYiXSwibmFtZXMiOlsiVXBsb2FkIiwiRU1QVFkiLCJUUkFTSCIsIkdFTkVSQUwiLCJJTklUSUFMX0FSUkFZIiwiTGFiZWwiLCJ0aGVtZSIsImZpbGwiLCJkYXJrNSIsImNoaWxkcmVuIiwicCIsImFkZFNvcnRlZENoaWxkcmVuIiwib2JqIiwic29ydGVyIiwibWFwIiwia2V5cyIsIk9iamVjdCIsImtleSIsIml0ZW1zIiwibGVuZ3RoIiwicmV2ZXJzZSIsInJlZHVjZSIsInJlc3VsdCIsImNoaWxkcyIsInB1c2giLCJDbG91ZGluYXJ5VmlldyIsInNlYXJjaCIsImZvcm1hdCIsImFwcHMiLCJpdGVtIiwiYXBwIiwicHVibGljSWQiLCJpbmRleE9mIiwic3BsaXQiLCJmIiwicmVtb3ZlZCIsImZvbGRlciIsInRvTG93ZXJDYXNlIiwidGFncyIsImZvckVhY2giLCJ0YWciLCJsYXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImZpcnN0UGFydCIsInN1YnN0ciIsImxhc3RQYXJ0IiwidHJlZSIsInNvcnRpbmciLCJ2YWx1ZSIsImZpbHRlciIsIngiLCJ2IiwiaWQiLCJzZWxlY3Rpb24iLCJzZWxlY3RlZEl0ZW1zIiwiaW5jbHVkZXMiLCJvbkNsaWNrIiwibXVsdGlwbGUiLCJwcm9wcyIsInNldFNlbGVjdGlvbiIsIm11bHRpIiwiZmluZEluZGV4Iiwic0lkIiwiaW5pdGlhbCIsInJlbmRlck1lbnUiLCJnb1Jvb3QiLCJzZXRUYWdzIiwiZGlyIiwia2V5MCIsIm5vZGUiLCJzdWJUYWciLCJqb2luIiwiY29uc29sZSIsImxvZyIsInRoaXNTZWxlY3Rpb24iLCJzZXRDb2xsYXBzZWQiLCJpbk1vZGFsIiwib25DaGFuZ2UiLCJvbkNsb3NlIiwiY29sbGFwc2VkIiwia2V5MSIsImdyb3VwIiwiZmlsdGVyZWRJdGVtcyIsImkiLCJwcm9wVHlwZXMiLCJhcnJheU9mIiwib2JqZWN0Iiwic2VsZWN0ZWRJZHMiLCJzdHJpbmciLCJmdW5jIiwiYWRkU2VsZWN0aW9uIiwicmVtb3ZlU2VsZWN0aW9uIiwiYm9vbCIsImRlZmF1bHRQcm9wcyIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBLElBQU1BLFNBQVMsMkNBQWY7QUFDQSxJQUFNQyxRQUFRLFlBQWQ7QUFDQSxJQUFNQyxRQUFRLFlBQWQ7QUFDQSxJQUFNQyxVQUFVLFdBQWhCO0FBQ0EsSUFBTUMsZ0JBQWdCLEVBQXRCOztBQUVBLElBQU1DLFFBQVEsZ0NBQ1o7QUFBQSxNQUFHQyxLQUFILFFBQUdBLEtBQUg7QUFBQSxTQUFnQjtBQUNkLGdCQUFZO0FBQ1ZDLFlBQU1ELE1BQU1FO0FBREY7QUFERSxHQUFoQjtBQUFBLENBRFksRUFNWjtBQUFBLE1BQUdDLFFBQUgsU0FBR0EsUUFBSDtBQUFBLE1BQWdCQyxDQUFoQjs7QUFBQSxTQUNFO0FBQUE7QUFBQTtBQUNFLGFBQU0sSUFEUjtBQUVFLGNBQU8sSUFGVDtBQUdFLGVBQVEsV0FIVjtBQUlFLGFBQU0sNEJBSlI7QUFLRSxlQUFRO0FBTFYsT0FNTUEsQ0FOTjtBQVFFLDhDQUFRLElBQUcsSUFBWCxFQUFnQixJQUFHLElBQW5CLEVBQXdCLEdBQUUsSUFBMUIsR0FSRjtBQVNFO0FBQUE7QUFBQTtBQUNFLG9CQUFXLFFBRGI7QUFFRSxXQUFFLEtBRko7QUFHRSxXQUFFLEtBSEo7QUFJRSxZQUFHLE9BSkw7QUFLRSxvQkFBVyxZQUxiO0FBTUUsa0JBQVMsTUFOWDtBQU9FLGNBQUs7QUFQUDtBQVNHRDtBQVRIO0FBVEYsR0FERjtBQUFBLENBTlksQ0FBZDs7QUErQkEsSUFBTUUsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsR0FBRCxFQUE0QjtB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ZXdzL2Nsb3VkaW5hcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHdpdGhQcm9wc09uQ2hhbmdlLCB3aXRoU3RhdGUgfSBmcm9tICdyZWNvbXBvc2UnO1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QtZmVsYSc7XG5pbXBvcnQgeyBTZWNvbmRhcnlTaWRlYmFyIH0gZnJvbSAnb2x5bXAtdWkvbWVudS90cmlvJztcbmltcG9ydCB7IERyYXdlciB9IGZyb20gJ29seW1wLXVpJztcbmltcG9ydCBNZW51LCB7IFN0YWNrZWRNZW51IH0gZnJvbSAnb2x5bXAtdWkvbWVudSc7XG5pbXBvcnQgeyBGYUNoZXZyb25MZWZ0LCBGYVBpY3R1cmVPIH0gZnJvbSAnb2x5bXAtaWNvbnMnO1xuaW1wb3J0IHsgc29ydEJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcGxvYWRlciBmcm9tICdvbHltcC1hbnRkL3VwbG9hZCc7XG5pbXBvcnQgZW5oYW5jZVVwbG9hZCBmcm9tICdvbHltcC1hbnRkL3VwbG9hZC9jbG91ZGluYXJ5JztcbmltcG9ydCB7IHF1ZXJ5TWVkaWFzIH0gZnJvbSAnLi4vZ3FsJztcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4vZ2FsbGVyeSc7XG5pbXBvcnQgRGV0YWlsIGZyb20gJy4uL2RldGFpbCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi4vaW1hZ2UnO1xuLy8gaW1wb3J0IERyYWd6b25lIGZyb20gJy4uL2NvbXBvbmVudHMvZHJhZ3pvbmUnO1xuXG5jb25zdCBVcGxvYWQgPSBlbmhhbmNlVXBsb2FkKFVwbG9hZGVyKTtcbmNvbnN0IEVNUFRZID0gJ0tlaW5lIFRhZ3MnO1xuY29uc3QgVFJBU0ggPSAnUGFwaWVya29yYic7XG5jb25zdCBHRU5FUkFMID0gJ0FsbGdlbWVpbic7XG5jb25zdCBJTklUSUFMX0FSUkFZID0gW107XG5cbmNvbnN0IExhYmVsID0gY3JlYXRlQ29tcG9uZW50KFxuICAoeyB0aGVtZSB9KSA9PiAoe1xuICAgICc+IGNpcmNsZSc6IHtcbiAgICAgIGZpbGw6IHRoZW1lLmRhcms1XG4gICAgfVxuICB9KSxcbiAgKHsgY2hpbGRyZW4sIC4uLnAgfSkgPT4gKFxuICAgIDxzdmdcbiAgICAgIHdpZHRoPVwiNjRcIlxuICAgICAgaGVpZ2h0PVwiNjRcIlxuICAgICAgdmlld0JveD1cIjAgMCA2NCA2NFwiXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgIHZlcnNpb249XCIxLjFcIlxuICAgICAgey4uLnB9XG4gICAgPlxuICAgICAgPGNpcmNsZSBjeD1cIjMyXCIgY3k9XCIzMlwiIHI9XCIzMVwiIC8+XG4gICAgICA8dGV4dFxuICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgeD1cIjUwJVwiXG4gICAgICAgIHk9XCI1MCVcIlxuICAgICAgICBkeT1cIi4zNWVtXCJcbiAgICAgICAgZm9udEZhbWlseT1cInNhbnMtc2VyaWZcIlxuICAgICAgICBmb250U2l6ZT1cIjQ1cHhcIlxuICAgICAgICBmaWxsPVwid2hpdGVcIlxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L3RleHQ+XG4gICAgPC9zdmc+XG4gIClcbik7XG5cbmNvbnN0IGFkZFNvcnRlZENoaWxkcmVuID0gKG9iaiwgc29ydGVyID0gJ2xlbmd0aCcpID0+IHtcbiAgaWYgKCFvYmoubWFwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICBjb25zdCB7IG1hcCB9ID0gb2JqO1xuICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG4gIGlmIChzb3J0ZXIgPT09ICdsZW5ndGgnKSB7XG4gICAga2V5cyA9IHNvcnRCeShrZXlzLCBrZXkgPT4gbWFwW2tleV0uaXRlbXMubGVuZ3RoKS5yZXZlcnNlKCk7XG4gIH0gZWxzZSBpZiAoc29ydGVyID09PSAnbmFtZScpIHtcbiAgICBrZXlzID0gc29ydEJ5KGtleXMpO1xuICB9XG4gIHJldHVybiBrZXlzLnJlZHVjZShcbiAgICAocmVzdWx0LCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcyA9IGFkZFNvcnRlZENoaWxkcmVuKG1hcFtrZXldLCBzb3J0ZXIpO1xuICAgICAgY2hpbGRzLmtleSA9IGtleTtcbiAgICAgIHJlc3VsdC5tYXBba2V5XSA9IGNoaWxkcztcbiAgICAgIHJlc3VsdC5jaGlsZHJlbi5wdXNoKGNoaWxkcyk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgeyAuLi5vYmosIGNoaWxkcmVuOiBbXSwgbWFwOiB7fSB9XG4gICk7XG59O1xuXG5AcXVlcnlNZWRpYXNcbkB3aXRoUHJvcHNPbkNoYW5nZShcbiAgWydpdGVtcycsICdzZWFyY2gnLCAnZm9ybWF0J10sXG4gICh7IGl0ZW1zLCBzZWFyY2gsIGZvcm1hdCB9KSA9PiB7XG4gICAgY29uc3QgYXBwcyA9IGl0ZW1zLnJlZHVjZSgocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICBpZiAoZm9ybWF0ICYmIGl0ZW0uZm9ybWF0ICE9PSBmb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFwcCA9XG4gICAgICAgICghIWl0ZW0ucHVibGljSWQgJiZcbiAgICAgICAgICBpdGVtLnB1YmxpY0lkLmluZGV4T2YoJy8nKSAhPT0gLTEgJiZcbiAgICAgICAgICBpdGVtLnB1YmxpY0lkLnNwbGl0KCcvJylbMF0pIHx8XG4gICAgICAgICdnemsnO1xuICAgICAgY29uc3QgZiA9IGl0ZW0ucmVtb3ZlZCA/IFRSQVNIIDogaXRlbS5mb2xkZXIgfHwgR0VORVJBTDtcbiAgICAgIGlmIChmICYmIHNlYXJjaCAmJiBmLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gudG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBpZiAoIXJlc3VsdFthcHBdKSB7XG4gICAgICAgIHJlc3VsdFthcHBdID0ge1xuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICBtYXA6IHt9LFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCFyZXN1bHRbYXBwXS5tYXBbZl0pIHtcbiAgICAgICAgcmVzdWx0W2FwcF0ubWFwW2ZdID0ge1xuICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICBtYXA6IHt9LFxuICAgICAgICAgIGl0ZW1zOiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmVzdWx0W2FwcF0uaXRlbXMucHVzaChpdGVtKTtcbiAgICAgIHJlc3VsdFthcHBdLm1hcFtmXS5pdGVtcy5wdXNoKGl0ZW0pO1xuXG4gICAgICBjb25zdCB0YWdzID0gcmVzdWx0W2FwcF0ubWFwW2ZdLm1hcDtcbiAgICAgIGlmICghaXRlbS50YWdzIHx8ICFpdGVtLnRhZ3MubGVuZ3RoKSB7XG4gICAgICAgIGlmICghdGFnc1tHRU5FUkFMXSkge1xuICAgICAgICAgIHRhZ3NbR0VORVJBTF0gPSB7XG4gICAgICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgICAgICBtYXA6IHt9LFxuICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRhZ3NbR0VORVJBTF0ubWFwW0VNUFRZXSkge1xuICAgICAgICAgIHRhZ3NbR0VORVJBTF0ubWFwW0VNUFRZXSA9IHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgIG1hcDoge30sXG4gICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRhZ3NbR0VORVJBTF0uaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgdGFnc1tHRU5FUkFMXS5tYXBbRU1QVFldLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnRhZ3MuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNlYXJjaCAmJlxuICAgICAgICAgICAgdGFnLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gudG9Mb3dlckNhc2UoKSkgPT09IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHRhZy5sYXN0SW5kZXhPZignLycpO1xuICAgICAgICAgIGNvbnN0IGZpcnN0UGFydCA9XG4gICAgICAgICAgICBsYXN0SW5kZXggIT09IC0xID8gdGFnLnN1YnN0cigwLCBsYXN0SW5kZXgpIDogR0VORVJBTDtcbiAgICAgICAgICBjb25zdCBsYXN0UGFydCA9IGxhc3RJbmRleCAhPT0gLTEgPyB0YWcuc3Vic3RyKGxhc3RJbmRleCArIDEpIDogdGFnO1xuICAgICAgICAgIGlmICghdGFnc1tmaXJzdFBhcnRdKSB7XG4gICAgICAgICAgICB0YWdzW2ZpcnN0UGFydF0gPSB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgICAgbWFwOiB7fSxcbiAgICAgICAgICAgICAgaXRlbXM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRhZ3NbZmlyc3RQYXJ0XS5tYXBbbGFzdFBhcnRdKSB7XG4gICAgICAgICAgICB0YWdzW2ZpcnN0UGFydF0ubWFwW2xhc3RQYXJ0XSA9IHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICAgICAgICBtYXA6IHt9LFxuICAgICAgICAgICAgICBpdGVtczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhZ3NbZmlyc3RQYXJ0XS5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgIHRhZ3NbZmlyc3RQYXJ0XS5tYXBbbGFzdFBhcnRdLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9KTtcblxuICAgIHJldHVybiB7XG4gICAgICB0cmVlOiBhcHBzXG4gICAgfTtcbiAgfVxuKVxuQHdpdGhQcm9wc09uQ2hhbmdlKFsnc29ydGluZycsICd0cmVlJ10sICh7IHRyZWUsIHNvcnRpbmcsIGl0ZW1zIH0pID0+ICh7XG4gIHRyZWU6IGFkZFNvcnRlZENoaWxkcmVuKHsgbWFwOiB0cmVlLCBpdGVtcyB9LCBzb3J0aW5nKVxufSkpXG5Ad2l0aFByb3BzT25DaGFuZ2UoWyd2YWx1ZSddLCAoeyB2YWx1ZSB9KSA9PiAoe1xuICB2YWx1ZTogdmFsdWUgPyB2YWx1ZS5maWx0ZXIoeCA9PiB4KSA6IG51bGxcbn0pKVxuQHdpdGhTdGF0ZSgnY29sbGFwc2VkJywgJ3NldENvbGxhcHNlZCcsIHRydWUpXG5Ad2l0aFN0YXRlKCdzb3J0aW5nJywgJ3NldFNvcnRpbmcnLCAnbGVuZ3RoJylcbkB3aXRoU3RhdGUoJ3RhZ3MnLCAnc2V0VGFncycsIElOSVRJQUxfQVJSQVkpXG5Ad2l0aFN0YXRlKFxuICAnc2VsZWN0aW9uJyxcbiAgJ3NldFNlbGVjdGlvbicsXG4gICh7IHZhbHVlIH0pID0+ICh2YWx1ZSA/IHZhbHVlLm1hcCh2ID0+IHYuaWQpIDogW10pXG4pXG5Ad2l0aFByb3BzT25DaGFuZ2UoWydzZWxlY3Rpb24nLCAnaXRlbXMnXSwgKHsgc2VsZWN0aW9uLCBpdGVtcyA9IFtdIH0pID0+ICh7XG4gIHNlbGVjdGVkSXRlbXM6IGl0ZW1zLmZpbHRlcih4ID0+IHNlbGVjdGlvbi5pbmNsdWRlcyh4LmlkKSlcbn0pKVxuY2xhc3MgQ2xvdWRpbmFyeVZpZXcgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBmaWx0ZXJlZEl0ZW1zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMub2JqZWN0KSxcbiAgICBzZWxlY3RlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFkZFNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVtb3ZlU2VsZWN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZXRTZWxlY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICAgIGZvcm1hdDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtdWx0aTogUHJvcFR5cGVzLmJvb2xcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGl0ZW1zOiBbXSxcbiAgICBmaWx0ZXJlZEl0ZW1zOiBbXSxcbiAgICBzZWxlY3RlZElkczogW10sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgb25DbG9zZTogdW5kZWZpbmVkLFxuICAgIG9uQ2hhbmdlOiB1bmRlZmluZWQsXG4gICAgYWRkU2VsZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgcmVtb3ZlU2VsZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgc2V0U2VsZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgZm9ybWF0OiB1bmRlZmluZWRcbiAgfTtcblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHsgc2VsZWN0ZWRJdGVtcyA9IFtdIH0pIHtcbiAgICBjb25zdCB0aGlzU2VsZWN0aW9uID0gdGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zIHx8IFtdO1xuICAgIGlmIChzZWxlY3RlZEl0ZW1zLmxlbmd0aCAhPT0gdGhpc1NlbGVjdGlvbi5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5pdGlhbCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2sgPSAoeyBpZCB9LCBtdWx0aXBsZSA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgeyBzZWxlY3Rpb24sIHNldFNlbGVjdGlvbiwgbXVsdGkgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAobXVsdGkgJiYgbXVsdGlwbGUpIHtcbiAgICAgIGlmIChzZWxlY3Rpb24uZmluZEluZGV4KHNJZCA9PiBzSWQgPT09IGlkKSA9PT0gLTEpIHtcbiAgICAgICAgc2V0U2VsZWN0aW9uKFsuLi5zZWxlY3Rpb24sIGlkXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uLmZpbHRlcih4ID0+IHggIT09IGlkKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGlvbihbaWRdKTtcbiAgICB9XG4gIH07XG5cbiAgaW5pdGlhbCA9IHRydWU7XG5cbiAgcmVuZGVyTWVudSA9IChrZXlzID0gW10pID0+IHtcbiAgICBjb25zdCB7IGdvUm9vdCwgc2V0VGFncywgdGFncywgdHJlZSwgYXBwIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IGNoaWxkcmVuID0gW107XG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjaGlsZHJlbiA9IHRyZWUuY2hpbGRyZW4ubWFwKGFwcCA9PiAoXG4gICAgICAgIDxNZW51Lkxpc3Qga2V5PXthcHAua2V5fSB0aXRsZT17YXBwLmtleX0+XG4gICAgICAgICAge2FwcC5jaGlsZHJlbi5tYXAoZGlyID0+IChcbiAgICAgICAgICAgIDxNZW51Lkl0ZW1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGFncyhbYCR7YXBwLmtleX0vJHtkaXIua2V5fWBdKX1cbiAgICAgICAgICAgICAga2V5PXtkaXIua2V5fVxuICAgICAgICAgICAgICBleHRyYT17PGI+e2Rpci5pdGVtcy5sZW5ndGh9Jm5ic3A7Jm5ic3A7PC9iPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Rpci5rZXl9XG4gICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9NZW51Lkxpc3Q+XG4gICAgICApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgW2tleTBdID0ga2V5cztcbiAgICAgIGNvbnN0IFthcHAsIGZvbGRlcl0gPSBrZXkwLnNwbGl0KCcvJyk7XG5cbiAgICAgIGNvbnN0IG5vZGUgPSB0cmVlLm1hcFthcHBdLm1hcFtmb2xkZXJdO1xuICAgICAgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuLm1hcCh0YWcgPT4gKFxuICAgICAgICA8TWVudS5MaXN0XG4gICAgICAgICAga2V5PXt0YWcua2V5fVxuICAgICAgICAgIHRpdGxlPXt0YWcua2V5fVxuICAgICAgICAgIGV4dHJhPXs8Yj57dGFnLml0ZW1zLmxlbmd0aH0mbmJzcDsmbmJzcDs8L2I+fVxuICAgICAgICA+XG4gICAgICAgICAge3RhZy5jaGlsZHJlbi5tYXAoc3ViVGFnID0+IChcbiAgICAgICAgICAgIDxNZW51Lkl0ZW1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGFncyhba2V5MCwgYCR7dGFnLmtleX0vJHtzdWJUYWcua2V5fWBdKX1cbiAgICAgICAgICAgICAga2V5PXtzdWJUYWcua2V5fVxuICAgICAgICAgICAgICBhY3RpdmU9e3RhZ3MuaW5kZXhPZihgJHt0YWcua2V5fS8ke3N1YlRhZy5rZXl9YCkgIT09IC0xfVxuICAgICAgICAgICAgICBleHRyYT17PGI+e3N1YlRhZy5pdGVtcy5sZW5ndGh9Jm5ic3A7Jm5ic3A7PC9iPn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3N1YlRhZy5rZXl9XG4gICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9NZW51Lkxpc3Q+XG4gICAgICApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1lbnVcbiAgICAgICAga2V5PXtrZXlzLmpvaW4oJ3wnKX1cbiAgICAgICAgaGVhZGVyPXtcbiAgICAgICAgICA8TWVudS5JdGVtIGxhcmdlIG9uQ2xpY2s9e2dvUm9vdH0gaWNvbj17PEZhUGljdHVyZU8gLz59PlxuICAgICAgICAgICAgTWVkaWF0aGVrXG4gICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgIH1cbiAgICAgID5cbiAgICAgICAge2tleXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPE1lbnUuSXRlbSBpY29uPXs8RmFDaGV2cm9uTGVmdCAvPn0gb25DbGljaz17KCkgPT4gc2V0VGFncyhbXSl9PlxuICAgICAgICAgICAgWnVyw7xja1xuICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICApfVxuXG4gICAgICAgIDxVcGxvYWQgb25TdWNjZXNzPXt4ID0+IGNvbnNvbGUubG9nKCdTVUNDRVNTJywgeCl9IC8+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvTWVudT5cbiAgICApO1xuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgdGFncyxcbiAgICAgIHNldENvbGxhcHNlZCxcbiAgICAgIHNlbGVjdGlvbixcbiAgICAgIHRyZWUsXG4gICAgICBzZXRTZWxlY3Rpb24sXG4gICAgICBzZWxlY3RlZEl0ZW1zLFxuICAgICAgaW5Nb2RhbCxcbiAgICAgIG11bHRpLFxuICAgICAgdmFsdWUsXG4gICAgICBvbkNoYW5nZSxcbiAgICAgIG9uQ2xvc2VcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBjb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IFtrZXkwLCBrZXkxXSA9IHRhZ3M7XG4gICAgY29uc3QgW2FwcCwgZm9sZGVyXSA9IGtleTAgPyBrZXkwLnNwbGl0KCcvJykgOiBbXTtcbiAgICBjb25zdCBbZ3JvdXAsIHRhZ10gPSBrZXkxID8ga2V5MS5zcGxpdCgnLycpIDogW107XG4gICAgY29uc3Qgbm9kZSA9IGFwcCAmJiBmb2xkZXIgPyB0cmVlLm1hcFthcHBdLm1hcFtmb2xkZXJdIDogdHJlZTtcbiAgICBjb25zdCBmaWx0ZXJlZEl0ZW1zID1cbiAgICAgIGdyb3VwICYmIHRhZyA/IG5vZGUubWFwW2dyb3VwXS5tYXBbdGFnXS5pdGVtcyA6IG5vZGUuaXRlbXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNlY29uZGFyeVNpZGViYXJcbiAgICAgICAgd2lkdGg9ezI0MH1cbiAgICAgICAgbWVudT17XG4gICAgICAgICAgPFN0YWNrZWRNZW51XG4gICAgICAgICAgICBrZXlzPXt0YWdzLmZpbHRlcigoeCwgaSkgPT4gaSA8IDEpfVxuICAgICAgICAgICAgcmVuZGVyTWVudT17dGhpcy5yZW5kZXJNZW51fVxuICAgICAgICAgIC8+XG4gICAgICAgIH1cbiAgICAgID5cbiAgICAgICAgPEdhbGxlcnlcbiAgICAgICAgICB1c2VCb2R5U2Nyb2xsPXshaW5Nb2RhbH1cbiAgICAgICAgICBrZXk9e3RhZ3Muam9pbignfCcpfVxuICAgICAgICAgIGl0ZW1zPXtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbCAmJiAhdGFncy5sZW5ndGggJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGhcbiAgICAgICAgICAgICAgPyBzZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICAgIDogZmlsdGVyZWRJdGVtc1xuICAgICAgICAgIH1cbiAgICAgICAgICBtYXJnaW5SaWdodD17Y29sbGFwc2VkID8gNzIgOiAzMDB9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5vbkNsaWNrfVxuICAgICAgICAgIHNlbGVjdGlvbj17c2VsZWN0aW9ufVxuICAgICAgICAgIGlzQWN0aXZlPXsoeyBpZCB9KSA9PiBzZWxlY3Rpb24uaW5kZXhPZihpZCkgIT09IC0xfVxuICAgICAgICAgIG9uUmVtb3ZlPXsoeyBpZCB9KSA9PiBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uLmZpbHRlcih4ID0+IGlkICE9PSB4KSl9XG4gICAgICAgIC8+XG4gICAgICAgIHshIXNlbGVjdGVkSXRlbXMubGVuZ3RoICYmIChcbiAgICAgICAgICA8RHJhd2VyXG4gICAgICAgICAgICBvcGVuXG4gICAgICAgICAgICBjb2xsYXBzZWQ9e2NvbGxhcHNlZH1cbiAgICAgICAgICAgIGRpbT17ZmFsc2V9XG4gICAgICAgICAgICByaWdodFxuICAgICAgICAgICAgd2lkdGg9e2NvbGxhcHNlZCA/IDcyIDogMzAwfVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRDb2xsYXBzZWQoZmFsc2UpfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRDb2xsYXBzZWQodHJ1ZSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1lbnVcbiAgICAgICAgICAgICAgY29sbGFwc2VkPXtjb2xsYXBzZWR9XG4gICAgICAgICAgICAgIGhlYWRlcj17XG4gICAgICAgICAgICAgICAgPE1lbnUuSXRlbSBsYXJnZSBpY29uPXs8TGFiZWw+e3NlbGVjdGVkSXRlbXMubGVuZ3RofTwvTGFiZWw+fT5cbiAgICAgICAgICAgICAgICAgIEJlYXJiZWl0ZW5cbiAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBoZWFkZXJJbnZlcnRlZFxuICAgICAgICAgICAgICAvLyBoZWFkZXJDb2xvclxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8TWVudS5TcGFjZT5cbiAgICAgICAgICAgICAgICB7Y29sbGFwc2VkICYmXG4gICAgICAgICAgICAgICAgICAodmFsdWUgfHwgc2VsZWN0ZWRJdGVtcyB8fCBbXSkubWFwKHYgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8TWVudS5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXt2LmlkfVxuICAgICAgICAgICAgICAgICAgICAgIGxhcmdlXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbj17PEltYWdlIHZhbHVlPXt2fSB3aWR0aD17NjB9IGhlaWdodD17NjB9IC8+fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPERldGFpbFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlIHx8IHNlbGVjdGVkSXRlbXMgfHwgW119XG4gICAgICAgICAgICAgICAgICBtdWx0aT17bXVsdGl9XG4gICAgICAgICAgICAgICAgICBlZGl0YWJsZT17IWluTW9kYWx9XG4gICAgICAgICAgICAgICAgICBjb2xsYXBzZWQ9e2NvbGxhcHNlZH1cbiAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoeyBpZCB9KSA9PlxuICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3Rpb24oc2VsZWN0aW9uLmZpbHRlcih4ID0+IGlkICE9PSB4KSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L01lbnUuU3BhY2U+XG4gICAgICAgICAgICA8L01lbnU+XG4gICAgICAgICAgPC9EcmF3ZXI+XG4gICAgICAgICl9XG4gICAgICA8L1NlY29uZGFyeVNpZGViYXI+XG4gICAgKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2xvdWRpbmFyeVZpZXc7XG4iXX0=
