'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudinaryRequestDone = undefined;

var _message4 = require('antd/lib/message');

var _message5 = _interopRequireDefault(_message4);

var _templateObject = _taggedTemplateLiteral(['\n    mutation file(\n      $id: String\n      $input: FileInput\n      $operationType: MUTATION_TYPE\n    ) {\n      item: file(id: $id, input: $input, type: $operationType) {\n        id\n        publicId\n        format\n        version\n        resourceType\n        type\n        createdAt\n        height\n        width\n        bytes\n        tags\n        url\n        caption\n        source\n        removed\n        folder\n        pages\n        colors\n      }\n    }\n  '], ['\n    mutation file(\n      $id: String\n      $input: FileInput\n      $operationType: MUTATION_TYPE\n    ) {\n      item: file(id: $id, input: $input, type: $operationType) {\n        id\n        publicId\n        format\n        version\n        resourceType\n        type\n        createdAt\n        height\n        width\n        bytes\n        tags\n        url\n        caption\n        source\n        removed\n        folder\n        pages\n        colors\n      }\n    }\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    mutation cloudinaryRequestDone(\n      $id: String\n      $token: String\n      $folder: String\n      $tags: [String]\n    ) {\n      cloudinaryRequestDone(\n        id: $id\n        token: $token\n        folder: $folder\n        tags: $tags\n      ) {\n        id\n        publicId\n        url\n        tags\n        colors\n        width\n        height\n        createdAt\n        caption\n        folder\n        source\n        format\n        bytes\n        removed\n      }\n    }\n  '], ['\n    mutation cloudinaryRequestDone(\n      $id: String\n      $token: String\n      $folder: String\n      $tags: [String]\n    ) {\n      cloudinaryRequestDone(\n        id: $id\n        token: $token\n        folder: $folder\n        tags: $tags\n      ) {\n        id\n        publicId\n        url\n        tags\n        colors\n        width\n        height\n        createdAt\n        caption\n        folder\n        source\n        format\n        bytes\n        removed\n      }\n    }\n  ']);

require('antd/lib/message/style');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

var _reactApollo = require('react-apollo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ok = function ok(item, mutate, remove) {
  mutate({
    variables: {
      id: item.id,
      input: Object.assign({}, item, { __typename: undefined }),
      operationType: item.removed ? 'REMOVE' : 'UPDATE'
    },
    updateQueries: item.removed ? {
      fileList: function fileList(prev, _ref) {
        var mutationResult = _ref.mutationResult;
        return Object.assign({}, prev, {
          items: prev.items.filter(function (item) {
            return item.id !== mutationResult.data.item.id;
          })
        });
      }
    } : undefined
  }).then(function (_ref2) {
    var newItem = _ref2.data.item;

    if (remove) {
      _message5.default.success('Datei \'' + newItem.id + '\' wurde gel\xF6scht');
    } else {
      _message5.default.success('Datei \'' + newItem.id + '\' wurde gespeichert');
    }
  }).catch(function (err) {
    return _message5.default.error(err.message);
  });
};

exports.default = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject), {
  props: function props(_ref3) {
    var ownProps = _ref3.ownProps,
        mutate = _ref3.mutate;
    return Object.assign({}, ownProps, {
      save: function save(item, remove) {
        return ok(item, mutate, remove);
      },
      mutate: mutate
    });
  }
});
var cloudinaryRequestDone = exports.cloudinaryRequestDone = (0, _reactApollo.graphql)((0, _graphqlTag2.default)(_templateObject2), {
  props: function props(_ref4) {
    var ownProps = _ref4.ownProps,
        mutate = _ref4.mutate;

    return {
      done: function done(_ref5) {
        var id = _ref5.id,
            token = _ref5.token,
            folder = _ref5.folder,
            tags = _ref5.tags;

        return mutate({
          variables: { id: id, token: token, folder: folder, tags: tags },
          updateQueries: {
            fileList: function fileList(prev, _ref6) {
              var mutationResult = _ref6.mutationResult;

              var newData = mutationResult.data.cloudinaryRequestDone;
              return Object.assign({}, prev, {
                items: [newData].concat(_toConsumableArray(prev.items))
              });
            }
          }
        });
      }
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZ3FsL211dGF0aW9uLmVzNiJdLCJuYW1lcyI6WyJvayIsIml0ZW0iLCJtdXRhdGUiLCJyZW1vdmUiLCJ2YXJpYWJsZXMiLCJpZCIsImlucHV0IiwiX190eXBlbmFtZSIsInVuZGVmaW5lZCIsIm9wZXJhdGlvblR5cGUiLCJyZW1vdmVkIiwidXBkYXRlUXVlcmllcyIsImZpbGVMaXN0IiwicHJldiIsIm11dGF0aW9uUmVzdWx0IiwiaXRlbXMiLCJmaWx0ZXIiLCJkYXRhIiwidGhlbiIsIm5ld0l0ZW0iLCJzdWNjZXNzIiwiY2F0Y2giLCJlcnJvciIsImVyciIsIm1lc3NhZ2UiLCJwcm9wcyIsIm93blByb3BzIiwic2F2ZSIsImNsb3VkaW5hcnlSZXF1ZXN0RG9uZSIsImRvbmUiLCJ0b2tlbiIsImZvbGRlciIsInRhZ3MiLCJuZXdEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7QUFHQSxJQUFNQSxLQUFLLFNBQUxBLEVBQUssQ0FBQ0MsSUFBRCxFQUFPQyxNQUFQLEVBQWVDLE1BQWYsRUFBMEI7QUFDbkNELFNBQU87QUFDTEUsZUFBVztBQUNUQyxVQUFJSixLQUFLSSxFQURBO0FBRVRDLCtCQUFZTCxJQUFaLElBQWtCTSxZQUFZQyxTQUE5QixHQUZTO0FBR1RDLHFCQUFlUixLQUFLUyxPQUFMLEdBQWUsUUFBZixHQUEwQjtBQUhoQyxLQUROO0FBTUxDLG1CQUFlVixLQUFLUyxPQUFMLEdBQ1g7QUFDRUUsZ0JBQVUsa0JBQUNDLElBQUQ7QUFBQSxZQUFTQyxjQUFULFFBQVNBLGNBQVQ7QUFBQSxpQ0FDTEQsSUFESztBQUVSRSxpQkFBT0YsS0FBS0UsS0FBTCxDQUFXQyxNQUFYLENBQ0w7QUFBQSxtQkFBUWYsS0FBS0ksRUFBTCxLQUFZUyxlQUFlRyxJQUFmLENBQW9CaEIsSUFBcEIsQ0FBeUJJLEVBQTdDO0FBQUEsV0FESztBQUZDO0FBQUE7QUFEWixLQURXLEdBU1hHO0FBZkMsR0FBUCxFQWlCR1UsSUFqQkgsQ0FpQlEsaUJBQWlDO0FBQUEsUUFBaEJDLE9BQWdCLFNBQTlCRixJQUE4QixDQUF0QmhCLElBQXNCOztBQUNyQyxRQUFJRSxNQUFKLEVBQVk7QUFDVix3QkFBUWlCLE9BQVIsY0FBMEJELFFBQVFkLEVBQWxDO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsd0JBQVFlLE9BQVIsY0FBMEJELFFBQVFkLEVBQWxDO0FBQ0Q7QUFDRixHQXZCSCxFQXdCR2dCLEtBeEJILENBd0JTO0FBQUEsV0FBTyxrQkFBUUMsS0FBUixDQUFjQyxJQUFJQyxPQUFsQixDQUFQO0FBQUEsR0F4QlQ7QUF5QkQsQ0ExQkQ7O2tCQTRCZSxzRUE2QmI7QUFDRUMsU0FBTztBQUFBLFFBQUdDLFFBQUgsU0FBR0EsUUFBSDtBQUFBLFFBQWF4QixNQUFiLFNBQWFBLE1BQWI7QUFBQSw2QkFDRndCLFFBREU7QUFFTEMsWUFBTSxjQUFDMUIsSUFBRCxFQUFPRSxNQUFQO0FBQUEsZUFBa0JILEdBQUdDLElBQUgsRUFBU0MsTUFBVCxFQUFpQkMsTUFBakIsQ0FBbEI7QUFBQSxPQUZEO0FBR0xEO0FBSEs7QUFBQTtBQURULENBN0JhLEM7QUFzQ1IsSUFBTTBCLHdEQUF3Qix1RUErQm5DO0FBQ0VILE9BREYsd0JBQzhCO0FBQUEsUUFBcEJDLFFBQW9CLFNBQXBCQSxRQUFvQjtBQUFBLFFBQVZ4QixNQUFVLFNBQVZBLE1BQVU7O0FBQzFCLFdBQU87QUFDTDJCLFVBREssdUJBQzZCO0FBQUEsWUFBM0J4QixFQUEyQixTQUEzQkEsRUFBMkI7QUFBQSxZQUF2QnlCLEtBQXVCLFNBQXZCQSxLQUF1QjtBQUFBLFlBQWhCQyxNQUFnQixTQUFoQkEsTUFBZ0I7QUFBQSxZQUFSQyxJQUFRLFNBQVJBLElBQVE7O0FBQ2hDLGVBQU85QixPQUFPO0FBQ1pFLHFCQUFXLEVBQUVDLE1BQUYsRUFBTXlCLFlBQU4sRUFBYUMsY0FBYixFQUFxQkMsVUFBckIsRUFEQztBQUVackIseUJBQWU7QUFDYkMsc0JBQVUsa0JBQUNDLElBQUQsU0FBOEI7QUFBQSxrQkFBckJDLGNBQXFCLFNBQXJCQSxjQUFxQjs7QUFDdEMsa0JBQU1tQixVQUFVbkIsZUFBZUcsSUFBZixDQUFvQlcscUJBQXBDO0FBQ0EsdUNBQ0tmLElBREw7QUFFRUUsd0JBQVFrQixPQUFSLDRCQUFvQnBCLEtBQUtFLEtBQXpCO0FBRkY7QUFJRDtBQVBZO0FBRkgsU0FBUCxDQUFQO0FBWUQ7QUFkSSxLQUFQO0FBZ0JEO0FBbEJILENBL0JtQyxDQUE5QiIsImZpbGUiOiJwYWNrYWdlcy9vbHltcC1tZWRpYS1saWJyYXJ5L2dxbC9tdXRhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0IHsgZ3JhcGhxbCB9IGZyb20gJ3JlYWN0LWFwb2xsbyc7XG5pbXBvcnQgeyBtZXNzYWdlIH0gZnJvbSAnYW50ZCc7XG5cbmNvbnN0IG9rID0gKGl0ZW0sIG11dGF0ZSwgcmVtb3ZlKSA9PiB7XG4gIG11dGF0ZSh7XG4gICAgdmFyaWFibGVzOiB7XG4gICAgICBpZDogaXRlbS5pZCxcbiAgICAgIGlucHV0OiB7IC4uLml0ZW0sIF9fdHlwZW5hbWU6IHVuZGVmaW5lZCB9LFxuICAgICAgb3BlcmF0aW9uVHlwZTogaXRlbS5yZW1vdmVkID8gJ1JFTU9WRScgOiAnVVBEQVRFJyxcbiAgICB9LFxuICAgIHVwZGF0ZVF1ZXJpZXM6IGl0ZW0ucmVtb3ZlZFxuICAgICAgPyB7XG4gICAgICAgICAgZmlsZUxpc3Q6IChwcmV2LCB7IG11dGF0aW9uUmVzdWx0IH0pID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgaXRlbXM6IHByZXYuaXRlbXMuZmlsdGVyKFxuICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uaWQgIT09IG11dGF0aW9uUmVzdWx0LmRhdGEuaXRlbS5pZCxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfSksXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICB9KVxuICAgIC50aGVuKCh7IGRhdGE6IHsgaXRlbTogbmV3SXRlbSB9IH0pID0+IHtcbiAgICAgIGlmIChyZW1vdmUpIHtcbiAgICAgICAgbWVzc2FnZS5zdWNjZXNzKGBEYXRlaSAnJHtuZXdJdGVtLmlkfScgd3VyZGUgZ2Vsw7ZzY2h0YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlLnN1Y2Nlc3MoYERhdGVpICcke25ld0l0ZW0uaWR9JyB3dXJkZSBnZXNwZWljaGVydGApO1xuICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiBtZXNzYWdlLmVycm9yKGVyci5tZXNzYWdlKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBncmFwaHFsKFxuICBncWxgXG4gICAgbXV0YXRpb24gZmlsZShcbiAgICAgICRpZDogU3RyaW5nXG4gICAgICAkaW5wdXQ6IEZpbGVJbnB1dFxuICAgICAgJG9wZXJhdGlvblR5cGU6IE1VVEFUSU9OX1RZUEVcbiAgICApIHtcbiAgICAgIGl0ZW06IGZpbGUoaWQ6ICRpZCwgaW5wdXQ6ICRpbnB1dCwgdHlwZTogJG9wZXJhdGlvblR5cGUpIHtcbiAgICAgICAgaWRcbiAgICAgICAgcHVibGljSWRcbiAgICAgICAgZm9ybWF0XG4gICAgICAgIHZlcnNpb25cbiAgICAgICAgcmVzb3VyY2VUeXBlXG4gICAgICAgIHR5cGVcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIGhlaWdodFxuICAgICAgICB3aWR0aFxuICAgICAgICBieXRlc1xuICAgICAgICB0YWdzXG4gICAgICAgIHVybFxuICAgICAgICBjYXB0aW9uXG4gICAgICAgIHNvdXJjZVxuICAgICAgICByZW1vdmVkXG4gICAgICAgIGZvbGRlclxuICAgICAgICBwYWdlc1xuICAgICAgICBjb2xvcnNcbiAgICAgIH1cbiAgICB9XG4gIGAsXG4gIHtcbiAgICBwcm9wczogKHsgb3duUHJvcHMsIG11dGF0ZSB9KSA9PiAoe1xuICAgICAgLi4ub3duUHJvcHMsXG4gICAgICBzYXZlOiAoaXRlbSwgcmVtb3ZlKSA9PiBvayhpdGVtLCBtdXRhdGUsIHJlbW92ZSksXG4gICAgICBtdXRhdGUsXG4gICAgfSksXG4gIH0sXG4pO1xuXG5leHBvcnQgY29uc3QgY2xvdWRpbmFyeVJlcXVlc3REb25lID0gZ3JhcGhxbChcbiAgZ3FsYFxuICAgIG11dGF0aW9uIGNsb3VkaW5hcnlSZXF1ZXN0RG9uZShcbiAgICAgICRpZDogU3RyaW5nXG4gICAgICAkdG9rZW46IFN0cmluZ1xuICAgICAgJGZvbGRlcjogU3RyaW5nXG4gICAgICAkdGFnczogW1N0cmluZ11cbiAgICApIHtcbiAgICAgIGNsb3VkaW5hcnlSZXF1ZXN0RG9uZShcbiAgICAgICAgaWQ6ICRpZFxuICAgICAgICB0b2tlbjogJHRva2VuXG4gICAgICAgIGZvbGRlcjogJGZvbGRlclxuICAgICAgICB0YWdzOiAkdGFnc1xuICAgICAgKSB7XG4gICAgICAgIGlkXG4gICAgICAgIHB1YmxpY0lkXG4gICAgICAgIHVybFxuICAgICAgICB0YWdzXG4gICAgICAgIGNvbG9yc1xuICAgICAgICB3aWR0aFxuICAgICAgICBoZWlnaHRcbiAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgIGNhcHRpb25cbiAgICAgICAgZm9sZGVyXG4gICAgICAgIHNvdXJjZVxuICAgICAgICBmb3JtYXRcbiAgICAgICAgYnl0ZXNcbiAgICAgICAgcmVtb3ZlZFxuICAgICAgfVxuICAgIH1cbiAgYCxcbiAge1xuICAgIHByb3BzKHsgb3duUHJvcHMsIG11dGF0ZSB9KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lKHsgaWQsIHRva2VuLCBmb2xkZXIsIHRhZ3MgfSkge1xuICAgICAgICAgIHJldHVybiBtdXRhdGUoe1xuICAgICAgICAgICAgdmFyaWFibGVzOiB7IGlkLCB0b2tlbiwgZm9sZGVyLCB0YWdzIH0sXG4gICAgICAgICAgICB1cGRhdGVRdWVyaWVzOiB7XG4gICAgICAgICAgICAgIGZpbGVMaXN0OiAocHJldiwgeyBtdXRhdGlvblJlc3VsdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGF0YSA9IG11dGF0aW9uUmVzdWx0LmRhdGEuY2xvdWRpbmFyeVJlcXVlc3REb25lO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtuZXdEYXRhLCAuLi5wcmV2Lml0ZW1zXSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgfSxcbik7XG4iXX0=
