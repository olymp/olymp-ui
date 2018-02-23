'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryTags = exports.queryMedias = undefined;

var _templateObject = _taggedTemplateLiteral(['\n    query file($id: String) {\n      item: file(id: $id) {\n        id\n        publicId\n        url\n        tags\n        folder\n        colors\n        width\n        height\n        createdAt\n        caption\n        source\n        format\n        bytes\n      }\n    }\n  '], ['\n    query file($id: String) {\n      item: file(id: $id) {\n        id\n        publicId\n        url\n        tags\n        folder\n        colors\n        width\n        height\n        createdAt\n        caption\n        source\n        format\n        bytes\n      }\n    }\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    query fileList {\n      items: fileList {\n        id\n        publicId\n        url\n        tags\n        folder\n        colors\n        width\n        height\n        createdAt\n        caption\n        source\n        format\n        bytes\n        removed\n      }\n    }\n  '], ['\n    query fileList {\n      items: fileList {\n        id\n        publicId\n        url\n        tags\n        folder\n        colors\n        width\n        height\n        createdAt\n        caption\n        source\n        format\n        bytes\n        removed\n      }\n    }\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    query fileTags($folder: String) {\n      fileTags(folder: $folder)\n    }\n  '], ['\n    query fileTags($folder: String) {\n      fileTags(folder: $folder)\n    }\n  ']);

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApollo = require('react-apollo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

exports.default = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject), {
  options: function options(_ref) {
    var id = _ref.id,
        mediaId = _ref.mediaId,
        query = _ref.query;
    return {
      variables: { id: mediaId }
    };
  },
  props: function props(_ref2) {
    var ownProps = _ref2.ownProps,
        data = _ref2.data;
    return Object.assign({}, ownProps, {
      item: data.item,
      data: data
    });
  }
});
var queryMedias = exports.queryMedias = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject2), {
  props: function props(_ref3) {
    var ownProps = _ref3.ownProps,
        data = _ref3.data;
    return Object.assign({}, ownProps, {
      items: data.items || [],
      data: data
    });
  }
});
var queryTags = exports.queryTags = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject3), {
  options: function options(_ref4) {
    var folder = _ref4.folder;
    return {
      variables: {
        folder: folder ? folder.split('/').filter(function (x, i) {
          return i !== 0;
        }).join('/') : undefined
      }
    };
  },
  props: function props(_ref5) {
    var ownProps = _ref5.ownProps,
        data = _ref5.data;
    return Object.assign({}, ownProps, {
      fileTags: data.fileTags || [],
      data: data
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZ3FsL3F1ZXJ5LmVzNiJdLCJuYW1lcyI6WyJvcHRpb25zIiwiaWQiLCJtZWRpYUlkIiwicXVlcnkiLCJ2YXJpYWJsZXMiLCJwcm9wcyIsIm93blByb3BzIiwiZGF0YSIsIml0ZW0iLCJxdWVyeU1lZGlhcyIsIml0ZW1zIiwicXVlcnlUYWdzIiwiZm9sZGVyIiwic3BsaXQiLCJmaWx0ZXIiLCJ4IiwiaSIsImpvaW4iLCJ1bmRlZmluZWQiLCJmaWxlVGFncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWUsc0VBb0JiO0FBQ0VBLFdBQVM7QUFBQSxRQUFHQyxFQUFILFFBQUdBLEVBQUg7QUFBQSxRQUFPQyxPQUFQLFFBQU9BLE9BQVA7QUFBQSxRQUFnQkMsS0FBaEIsUUFBZ0JBLEtBQWhCO0FBQUEsV0FBNkI7QUFDcENDLGlCQUFXLEVBQUVILElBQUlDLE9BQU47QUFEeUIsS0FBN0I7QUFBQSxHQURYO0FBSUVHLFNBQU87QUFBQSxRQUFHQyxRQUFILFNBQUdBLFFBQUg7QUFBQSxRQUFhQyxJQUFiLFNBQWFBLElBQWI7QUFBQSw2QkFDRkQsUUFERTtBQUVMRSxZQUFNRCxLQUFLQyxJQUZOO0FBR0xEO0FBSEs7QUFBQTtBQUpULENBcEJhLEM7QUFnQ1IsSUFBTUUsb0NBQWMsdUVBcUJ6QjtBQUNFSixTQUFPO0FBQUEsUUFBR0MsUUFBSCxTQUFHQSxRQUFIO0FBQUEsUUFBYUMsSUFBYixTQUFhQSxJQUFiO0FBQUEsNkJBQ0ZELFFBREU7QUFFTEksYUFBT0gsS0FBS0csS0FBTCxJQUFjLEVBRmhCO0FBR0xIO0FBSEs7QUFBQTtBQURULENBckJ5QixDQUFwQjtBQTZCQSxJQUFNSSxnQ0FBWSx1RUFNdkI7QUFDRVgsV0FBUztBQUFBLFFBQUdZLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFdBQWlCO0FBQ3hCUixpQkFBVztBQUNUUSxnQkFBUUEsU0FDSkEsT0FDR0MsS0FESCxDQUNTLEdBRFQsRUFFR0MsTUFGSCxDQUVVLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLGlCQUFVQSxNQUFNLENBQWhCO0FBQUEsU0FGVixFQUdHQyxJQUhILENBR1EsR0FIUixDQURJLEdBS0pDO0FBTks7QUFEYSxLQUFqQjtBQUFBLEdBRFg7QUFXRWIsU0FBTztBQUFBLFFBQUdDLFFBQUgsU0FBR0EsUUFBSDtBQUFBLFFBQWFDLElBQWIsU0FBYUEsSUFBYjtBQUFBLDZCQUNGRCxRQURFO0FBRUxhLGdCQUFVWixLQUFLWSxRQUFMLElBQWlCLEVBRnRCO0FBR0xaO0FBSEs7QUFBQTtBQVhULENBTnVCLENBQWxCIiwiZmlsZSI6InBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZ3FsL3F1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdxbCBmcm9tICdncmFwaHFsLXRhZyc7XG5pbXBvcnQgeyBncmFwaHFsIH0gZnJvbSAncmVhY3QtYXBvbGxvJztcblxuZXhwb3J0IGRlZmF1bHQgZ3JhcGhxbChcbiAgZ3FsYFxuICAgIHF1ZXJ5IGZpbGUoJGlkOiBTdHJpbmcpIHtcbiAgICAgIGl0ZW06IGZpbGUoaWQ6ICRpZCkge1xuICAgICAgICBpZFxuICAgICAgICBwdWJsaWNJZFxuICAgICAgICB1cmxcbiAgICAgICAgdGFnc1xuICAgICAgICBmb2xkZXJcbiAgICAgICAgY29sb3JzXG4gICAgICAgIHdpZHRoXG4gICAgICAgIGhlaWdodFxuICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgY2FwdGlvblxuICAgICAgICBzb3VyY2VcbiAgICAgICAgZm9ybWF0XG4gICAgICAgIGJ5dGVzXG4gICAgICB9XG4gICAgfVxuICBgLFxuICB7XG4gICAgb3B0aW9uczogKHsgaWQsIG1lZGlhSWQsIHF1ZXJ5IH0pID0+ICh7XG4gICAgICB2YXJpYWJsZXM6IHsgaWQ6IG1lZGlhSWQgfVxuICAgIH0pLFxuICAgIHByb3BzOiAoeyBvd25Qcm9wcywgZGF0YSB9KSA9PiAoe1xuICAgICAgLi4ub3duUHJvcHMsXG4gICAgICBpdGVtOiBkYXRhLml0ZW0sXG4gICAgICBkYXRhXG4gICAgfSlcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHF1ZXJ5TWVkaWFzID0gZ3JhcGhxbChcbiAgZ3FsYFxuICAgIHF1ZXJ5IGZpbGVMaXN0IHtcbiAgICAgIGl0ZW1zOiBmaWxlTGlzdCB7XG4gICAgICAgIGlkXG4gICAgICAgIHB1YmxpY0lkXG4gICAgICAgIHVybFxuICAgICAgICB0YWdzXG4gICAgICAgIGZvbGRlclxuICAgICAgICBjb2xvcnNcbiAgICAgICAgd2lkdGhcbiAgICAgICAgaGVpZ2h0XG4gICAgICAgIGNyZWF0ZWRBdFxuICAgICAgICBjYXB0aW9uXG4gICAgICAgIHNvdXJjZVxuICAgICAgICBmb3JtYXRcbiAgICAgICAgYnl0ZXNcbiAgICAgICAgcmVtb3ZlZFxuICAgICAgfVxuICAgIH1cbiAgYCxcbiAge1xuICAgIHByb3BzOiAoeyBvd25Qcm9wcywgZGF0YSB9KSA9PiAoe1xuICAgICAgLi4ub3duUHJvcHMsXG4gICAgICBpdGVtczogZGF0YS5pdGVtcyB8fCBbXSxcbiAgICAgIGRhdGFcbiAgICB9KVxuICB9XG4pO1xuZXhwb3J0IGNvbnN0IHF1ZXJ5VGFncyA9IGdyYXBocWwoXG4gIGdxbGBcbiAgICBxdWVyeSBmaWxlVGFncygkZm9sZGVyOiBTdHJpbmcpIHtcbiAgICAgIGZpbGVUYWdzKGZvbGRlcjogJGZvbGRlcilcbiAgICB9XG4gIGAsXG4gIHtcbiAgICBvcHRpb25zOiAoeyBmb2xkZXIgfSkgPT4gKHtcbiAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICBmb2xkZXI6IGZvbGRlclxuICAgICAgICAgID8gZm9sZGVyXG4gICAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAgIC5maWx0ZXIoKHgsIGkpID0+IGkgIT09IDApXG4gICAgICAgICAgICAgIC5qb2luKCcvJylcbiAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH0pLFxuICAgIHByb3BzOiAoeyBvd25Qcm9wcywgZGF0YSB9KSA9PiAoe1xuICAgICAgLi4ub3duUHJvcHMsXG4gICAgICBmaWxlVGFnczogZGF0YS5maWxlVGFncyB8fCBbXSxcbiAgICAgIGRhdGFcbiAgICB9KVxuICB9XG4pO1xuIl19
