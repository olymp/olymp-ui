'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

require('antd/lib/form/style');

var _recompose = require('recompose');

var _gql = require('../gql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _recompose.compose)(_gql.mutateFile, _form2.default.create(), (0, _recompose.withHandlers)({
  save: function save(_ref) {
    var form = _ref.form,
        items = _ref.items,
        _save = _ref.save,
        onChange = _ref.onChange;
    return function () {
      form.validateFields(function (err, values) {
        if (err) {
          return console.error(err);
        }
        if (onChange) {
          return onChange(items.map(function (item) {
            return values[item.id];
          }));
        }
        Promise.all(items.map(function (item) {
          return _save(values[item.id], !item.removed && values[item.id].removed);
        })).then(function (x) {
          return form.resetFields();
        });
      });
    };
  }
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL3dpdGgtZmlsZS1mb3JtLmVzNiJdLCJuYW1lcyI6WyJjcmVhdGUiLCJzYXZlIiwiZm9ybSIsIml0ZW1zIiwib25DaGFuZ2UiLCJ2YWxpZGF0ZUZpZWxkcyIsImVyciIsInZhbHVlcyIsImNvbnNvbGUiLCJlcnJvciIsIm1hcCIsIml0ZW0iLCJpZCIsIlByb21pc2UiLCJhbGwiLCJyZW1vdmVkIiwidGhlbiIsInJlc2V0RmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7OztrQkFFZSx5Q0FFYixlQUFLQSxNQUFMLEVBRmEsRUFHYiw2QkFBYTtBQUNYQyxRQUFNO0FBQUEsUUFBR0MsSUFBSCxRQUFHQSxJQUFIO0FBQUEsUUFBU0MsS0FBVCxRQUFTQSxLQUFUO0FBQUEsUUFBZ0JGLEtBQWhCLFFBQWdCQSxJQUFoQjtBQUFBLFFBQXNCRyxRQUF0QixRQUFzQkEsUUFBdEI7QUFBQSxXQUFxQyxZQUFNO0FBQy9DRixXQUFLRyxjQUFMLENBQW9CLFVBQUNDLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUNuQyxZQUFJRCxHQUFKLEVBQVM7QUFDUCxpQkFBT0UsUUFBUUMsS0FBUixDQUFjSCxHQUFkLENBQVA7QUFDRDtBQUNELFlBQUlGLFFBQUosRUFBYztBQUNaLGlCQUFPQSxTQUFTRCxNQUFNTyxHQUFOLENBQVU7QUFBQSxtQkFBUUgsT0FBT0ksS0FBS0MsRUFBWixDQUFSO0FBQUEsV0FBVixDQUFULENBQVA7QUFDRDtBQUNEQyxnQkFBUUMsR0FBUixDQUNFWCxNQUFNTyxHQUFOLENBQVU7QUFBQSxpQkFDUlQsTUFBS00sT0FBT0ksS0FBS0MsRUFBWixDQUFMLEVBQXNCLENBQUNELEtBQUtJLE9BQU4sSUFBaUJSLE9BQU9JLEtBQUtDLEVBQVosRUFBZ0JHLE9BQXZELENBRFE7QUFBQSxTQUFWLENBREYsRUFJRUMsSUFKRixDQUlPO0FBQUEsaUJBQUtkLEtBQUtlLFdBQUwsRUFBTDtBQUFBLFNBSlA7QUFLRCxPQVpEO0FBYUQsS0FkSztBQUFBO0FBREssQ0FBYixDQUhhLEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS9kZXRhaWwvd2l0aC1maWxlLWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlLCB3aXRoSGFuZGxlcnMgfSBmcm9tICdyZWNvbXBvc2UnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJ2FudGQnO1xuaW1wb3J0IHsgbXV0YXRlRmlsZSB9IGZyb20gJy4uL2dxbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2UoXG4gIG11dGF0ZUZpbGUsXG4gIEZvcm0uY3JlYXRlKCksXG4gIHdpdGhIYW5kbGVycyh7XG4gICAgc2F2ZTogKHsgZm9ybSwgaXRlbXMsIHNhdmUsIG9uQ2hhbmdlIH0pID0+ICgpID0+IHtcbiAgICAgIGZvcm0udmFsaWRhdGVGaWVsZHMoKGVyciwgdmFsdWVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbkNoYW5nZSkge1xuICAgICAgICAgIHJldHVybiBvbkNoYW5nZShpdGVtcy5tYXAoaXRlbSA9PiB2YWx1ZXNbaXRlbS5pZF0pKTtcbiAgICAgICAgfVxuICAgICAgICBQcm9taXNlLmFsbChcbiAgICAgICAgICBpdGVtcy5tYXAoaXRlbSA9PlxuICAgICAgICAgICAgc2F2ZSh2YWx1ZXNbaXRlbS5pZF0sICFpdGVtLnJlbW92ZWQgJiYgdmFsdWVzW2l0ZW0uaWRdLnJlbW92ZWQpLFxuICAgICAgICAgICksXG4gICAgICAgICkudGhlbih4ID0+IGZvcm0ucmVzZXRGaWVsZHMoKSk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9KSxcbik7XG4iXX0=
