'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = require('antd/lib/tag');

var _tag2 = _interopRequireDefault(_tag);

require('antd/lib/form/style');

require('antd/lib/input/style');

require('antd/lib/checkbox/style');

require('antd/lib/tag/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFela = require('react-fela');

var _menu = require('olymp-ui/menu');

var _menu2 = _interopRequireDefault(_menu);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

var _utils = require('./utils');

var _gql = require('../gql');

var _lightboxImage = require('../lightbox-image');

var _lightboxImage2 = _interopRequireDefault(_lightboxImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var CheckableTag = (0, _reactFela.createComponent)(function (_ref) {
  var theme = _ref.theme,
      checked = _ref.checked,
      marked = _ref.marked;
  return {
    marginBottom: theme.space1,
    ellipsis: true,
    ':not(.ant-tag-checkable-checked)': {
      backgroundColor: !checked && marked ? theme.dark2 : theme.dark5,
      color: !checked && marked && theme.light
    }
  };
}, function (p) {
  return _react2.default.createElement(_tag2.default.CheckableTag, p);
}, function (_ref2) {
  var marked = _ref2.marked,
      p = _objectWithoutProperties(_ref2, ['marked']);

  return Object.keys(p);
});

var CheckboxMargin = (0, _reactFela.createComponent)(function () {
  return {
    marginY: 10
  };
}, function (p) {
  return _react2.default.createElement(_checkbox2.default, p);
}, function (p) {
  return Object.keys(p);
});

var TagContainer = (0, _gql.queryTags)((0, _reactFela.createComponent)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    padding: theme.space2,
    hasFlex: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    }
  };
}, function (_ref4) {
  var className = _ref4.className,
      _ref4$fileTags = _ref4.fileTags,
      fileTags = _ref4$fileTags === undefined ? [] : _ref4$fileTags,
      selectedTags = _ref4.selectedTags,
      form = _ref4.form;
  return _react2.default.createElement(
    'div',
    { className: className },
    [].concat(_toConsumableArray(fileTags)).sort().map(function (tag) {
      return _react2.default.createElement(
        CheckableTag,
        {
          key: tag,
          checked: (form.getFieldValue('tags') || []).indexOf(tag) !== -1,
          marked: selectedTags.filter(function (sTag) {
            return sTag === tag;
          }).length > 0,
          onChange: function onChange(checked) {
            return form.setFieldsValue({
              tags: checked ? [].concat(_toConsumableArray(form.getFieldValue('tags')), [tag]) : form.getFieldValue('tags').filter(function (x) {
                return x !== tag;
              })
            });
          }
        },
        tag
      );
    })
  );
}, ['fileTags', 'selectedTags', 'form']));

exports.default = function (_ref5) {
  var multi = _ref5.multi,
      item = _ref5.item,
      form = _ref5.form,
      groupedTags = _ref5.groupedTags,
      value = _ref5.value,
      selectedTags = _ref5.selectedTags;

  form.getFieldDecorator(item.id + '.id', { initialValue: item.id });
  return _react2.default.createElement(
    _form2.default,
    null,
    value.length === 1 && _react2.default.createElement(
      _form2.default.Item,
      _utils.FormForFullLayout,
      _react2.default.createElement(_lightboxImage2.default, { value: item, width: '100%', maxHeight: 200 })
    ),
    _react2.default.createElement(
      _menu2.default.List,
      null,
      _react2.default.createElement(
        _form2.default.Item,
        Object.assign({ label: 'Ordner' }, _utils.FormForFullLayout),
        form.getFieldDecorator(item.id + '.folder', {
          initialValue: item.folder
        })(_react2.default.createElement(_input2.default, { placeholder: 'Ordner' }))
      ),
      _react2.default.createElement(
        _form2.default.Item,
        Object.assign({ label: 'Quelle' }, _utils.FormForFullLayout),
        form.getFieldDecorator(item.id + '.source', {
          initialValue: item.source
        })(_react2.default.createElement(_input2.default, { placeholder: 'Quelle' }))
      ),
      _react2.default.createElement(
        _form2.default.Item,
        Object.assign({ key: 'caption', label: 'Bezeichnung' }, _utils.FormForFullLayout),
        form.getFieldDecorator(item.id + '.caption', {
          initialValue: item.caption
        })(_react2.default.createElement(_input2.default.TextArea, { rows: 3, placeholder: 'Bezeichnung' }))
      ),
      _react2.default.createElement(
        _form2.default.Item,
        Object.assign({ label: 'Schlagworte' }, _utils.FormForFullLayout),
        form.getFieldDecorator(item.id + '.tags', {
          initialValue: Object.keys(groupedTags).filter(function (key) {
            return groupedTags[key].length === value.length;
          })
        })(_react2.default.createElement(_input2.default, { searchPlaceholder: 'Suche ...', placeholder: 'Schlagworte' }))
      ),
      form.getFieldDecorator(item.id + '.removed', {
        initialValue: item.removed,
        valuePropName: 'checked'
      })(_react2.default.createElement(
        CheckboxMargin,
        null,
        'Im Papierkorb'
      ))
    ),
    _react2.default.createElement(
      _menu2.default.List,
      { title: 'Tagcloud' },
      _react2.default.createElement(TagContainer, { selectedTags: selectedTags, form: form })
    )
  );
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhY2thZ2VzL29seW1wLW1lZGlhLWxpYnJhcnkvZGV0YWlsL2RldGFpbC1icm93c2VyLmVzNiJdLCJuYW1lcyI6WyJDaGVja2FibGVUYWciLCJ0aGVtZSIsImNoZWNrZWQiLCJtYXJrZWQiLCJtYXJnaW5Cb3R0b20iLCJzcGFjZTEiLCJlbGxpcHNpcyIsImJhY2tncm91bmRDb2xvciIsImRhcmsyIiwiZGFyazUiLCJjb2xvciIsImxpZ2h0IiwicCIsIk9iamVjdCIsImtleXMiLCJDaGVja2JveE1hcmdpbiIsIm1hcmdpblkiLCJUYWdDb250YWluZXIiLCJwYWRkaW5nIiwic3BhY2UyIiwiaGFzRmxleCIsImRpc3BsYXkiLCJmbGV4V3JhcCIsImp1c3RpZnlDb250ZW50IiwiY2xhc3NOYW1lIiwiZmlsZVRhZ3MiLCJzZWxlY3RlZFRhZ3MiLCJmb3JtIiwic29ydCIsIm1hcCIsInRhZyIsImdldEZpZWxkVmFsdWUiLCJpbmRleE9mIiwiZmlsdGVyIiwic1RhZyIsImxlbmd0aCIsInNldEZpZWxkc1ZhbHVlIiwidGFncyIsIngiLCJtdWx0aSIsIml0ZW0iLCJncm91cGVkVGFncyIsInZhbHVlIiwiZ2V0RmllbGREZWNvcmF0b3IiLCJpZCIsImluaXRpYWxWYWx1ZSIsImZvbGRlciIsInNvdXJjZSIsImNhcHRpb24iLCJrZXkiLCJyZW1vdmVkIiwidmFsdWVQcm9wTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxlQUFlLGdDQUNuQjtBQUFBLE1BQUdDLEtBQUgsUUFBR0EsS0FBSDtBQUFBLE1BQVVDLE9BQVYsUUFBVUEsT0FBVjtBQUFBLE1BQW1CQyxNQUFuQixRQUFtQkEsTUFBbkI7QUFBQSxTQUFpQztBQUMvQkMsa0JBQWNILE1BQU1JLE1BRFc7QUFFL0JDLGNBQVUsSUFGcUI7QUFHL0Isd0NBQW9D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SSxFQUEvQixlQUE2QztBQUM1Q0Msc0JBQWNMLEtBQUtVLE9BRHlCO0FBRTVDQyx1QkFBZTtBQUY2QixPQUE3QyxFQUdFO0FBQUMsc0JBQUQ7QUFBQTtBQUFBO0FBQUEsT0FIRjtBQXpCSCxLQVBGO0FBc0NFO0FBQUEscUJBQU0sSUFBTjtBQUFBLFFBQVcsT0FBTSxVQUFqQjtBQUNFLG9DQUFDLFlBQUQsSUFBYyxjQUFjekIsWUFBNUIsRUFBMEMsTUFBTUMsSUFBaEQ7QUFERjtBQXRDRixHQURGO0FBNkNELEMiLCJmaWxlIjoicGFja2FnZXMvb2x5bXAtbWVkaWEtbGlicmFyeS9kZXRhaWwvZGV0YWlsLWJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2hlY2tib3gsIEZvcm0sIElucHV0LCBUYWcgfSBmcm9tICdhbnRkJztcbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0LWZlbGEnO1xuaW1wb3J0IE1lbnUgZnJvbSAnb2x5bXAtdWkvbWVudSc7XG5pbXBvcnQgZ2V0SW1hZ2VJbmZvIGZyb20gJy4vaW5mbyc7XG5pbXBvcnQgeyBGb3JtRm9yRnVsbExheW91dCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgcXVlcnlUYWdzIH0gZnJvbSAnLi4vZ3FsJztcbmltcG9ydCBMaWdodGJveEltYWdlIGZyb20gJy4uL2xpZ2h0Ym94LWltYWdlJztcblxuY29uc3QgQ2hlY2thYmxlVGFnID0gY3JlYXRlQ29tcG9uZW50KFxuICAoeyB0aGVtZSwgY2hlY2tlZCwgbWFya2VkIH0pID0+ICh7XG4gICAgbWFyZ2luQm90dG9tOiB0aGVtZS5zcGFjZTEsXG4gICAgZWxsaXBzaXM6IHRydWUsXG4gICAgJzpub3QoLmFudC10YWctY2hlY2thYmxlLWNoZWNrZWQpJzoge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiAhY2hlY2tlZCAmJiBtYXJrZWQgPyB0aGVtZS5kYXJrMiA6IHRoZW1lLmRhcms1LFxuICAgICAgY29sb3I6ICFjaGVja2VkICYmIG1hcmtlZCAmJiB0aGVtZS5saWdodFxuICAgIH1cbiAgfSksXG4gIHAgPT4gPFRhZy5DaGVja2FibGVUYWcgey4uLnB9IC8+LFxuICAoeyBtYXJrZWQsIC4uLnAgfSkgPT4gT2JqZWN0LmtleXMocClcbik7XG5cbmNvbnN0IENoZWNrYm94TWFyZ2luID0gY3JlYXRlQ29tcG9uZW50KFxuICAoKSA9PiAoe1xuICAgIG1hcmdpblk6IDEwXG4gIH0pLFxuICBwID0+IDxDaGVja2JveCB7Li4ucH0gLz4sXG4gIHAgPT4gT2JqZWN0LmtleXMocClcbik7XG5cbmNvbnN0IFRhZ0NvbnRhaW5lciA9IHF1ZXJ5VGFncyhcbiAgY3JlYXRlQ29tcG9uZW50KFxuICAgICh7IHRoZW1lIH0pID0+ICh7XG4gICAgICBwYWRkaW5nOiB0aGVtZS5zcGFjZTIsXG4gICAgICBoYXNGbGV4OiB7XG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnXG4gICAgICB9XG4gICAgfSksXG4gICAgKHsgY2xhc3NOYW1lLCBmaWxlVGFncyA9IFtdLCBzZWxlY3RlZFRhZ3MsIGZvcm0gfSkgPT4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIHtbLi4uZmlsZVRhZ3NdLnNvcnQoKS5tYXAodGFnID0+IChcbiAgICAgICAgICA8Q2hlY2thYmxlVGFnXG4gICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgIGNoZWNrZWQ9eyhmb3JtLmdldEZpZWxkVmFsdWUoJ3RhZ3MnKSB8fCBbXSkuaW5kZXhPZih0YWcpICE9PSAtMX1cbiAgICAgICAgICAgIG1hcmtlZD17c2VsZWN0ZWRUYWdzLmZpbHRlcihzVGFnID0+IHNUYWcgPT09IHRhZykubGVuZ3RoID4gMH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtjaGVja2VkID0+XG4gICAgICAgICAgICAgIGZvcm0uc2V0RmllbGRzVmFsdWUoe1xuICAgICAgICAgICAgICAgIHRhZ3M6IGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgID8gWy4uLmZvcm0uZ2V0RmllbGRWYWx1ZSgndGFncycpLCB0YWddXG4gICAgICAgICAgICAgICAgICA6IGZvcm0uZ2V0RmllbGRWYWx1ZSgndGFncycpLmZpbHRlcih4ID0+IHggIT09IHRhZylcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFnfVxuICAgICAgICAgIDwvQ2hlY2thYmxlVGFnPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICksXG4gICAgWydmaWxlVGFncycsICdzZWxlY3RlZFRhZ3MnLCAnZm9ybSddXG4gIClcbik7XG5cbmV4cG9ydCBkZWZhdWx0ICh7IG11bHRpLCBpdGVtLCBmb3JtLCBncm91cGVkVGFncywgdmFsdWUsIHNlbGVjdGVkVGFncyB9KSA9PiB7XG4gIGZvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0uaWRgLCB7IGluaXRpYWxWYWx1ZTogaXRlbS5pZCB9KTtcbiAgcmV0dXJuIChcbiAgICA8Rm9ybT5cbiAgICAgIHt2YWx1ZS5sZW5ndGggPT09IDEgJiYgKFxuICAgICAgICA8Rm9ybS5JdGVtIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgICAgPExpZ2h0Ym94SW1hZ2UgdmFsdWU9e2l0ZW19IHdpZHRoPVwiMTAwJVwiIG1heEhlaWdodD17MjAwfSAvPlxuICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICl9XG5cbiAgICAgIDxNZW51Lkxpc3Q+XG4gICAgICAgIDxGb3JtLkl0ZW0gbGFiZWw9XCJPcmRuZXJcIiB7Li4uRm9ybUZvckZ1bGxMYXlvdXR9PlxuICAgICAgICAgIHtmb3JtLmdldEZpZWxkRGVjb3JhdG9yKGAke2l0ZW0uaWR9LmZvbGRlcmAsIHtcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaXRlbS5mb2xkZXJcbiAgICAgICAgICB9KSg8SW5wdXQgcGxhY2Vob2xkZXI9XCJPcmRuZXJcIiAvPil9XG4gICAgICAgIDwvRm9ybS5JdGVtPlxuICAgICAgICB7XG4gICAgICAgICAgPEZvcm0uSXRlbSBsYWJlbD1cIlF1ZWxsZVwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgICAgICB7Zm9ybS5nZXRGaWVsZERlY29yYXRvcihgJHtpdGVtLmlkfS5zb3VyY2VgLCB7XG4gICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogaXRlbS5zb3VyY2VcbiAgICAgICAgICAgIH0pKDxJbnB1dCBwbGFjZWhvbGRlcj1cIlF1ZWxsZVwiIC8+KX1cbiAgICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICAgfVxuICAgICAgICA8Rm9ybS5JdGVtIGtleT1cImNhcHRpb25cIiBsYWJlbD1cIkJlemVpY2hudW5nXCIgey4uLkZvcm1Gb3JGdWxsTGF5b3V0fT5cbiAgICAgICAgICB7Zm9ybS5nZXRGaWVsZERlY29yYXRvcihgJHtpdGVtLmlkfS5jYXB0aW9uYCwge1xuICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiBpdGVtLmNhcHRpb25cbiAgICAgICAgICB9KSg8SW5wdXQuVGV4dEFyZWEgcm93cz17M30gcGxhY2Vob2xkZXI9XCJCZXplaWNobnVuZ1wiIC8+KX1cbiAgICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgICAgIDxGb3JtLkl0ZW0gbGFiZWw9XCJTY2hsYWd3b3J0ZVwiIHsuLi5Gb3JtRm9yRnVsbExheW91dH0+XG4gICAgICAgICAge2Zvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0udGFnc2AsIHtcbiAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogT2JqZWN0LmtleXMoZ3JvdXBlZFRhZ3MpLmZpbHRlcihcbiAgICAgICAgICAgICAga2V5ID0+IGdyb3VwZWRUYWdzW2tleV0ubGVuZ3RoID09PSB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSg8SW5wdXQgc2VhcmNoUGxhY2Vob2xkZXI9XCJTdWNoZSAuLi5cIiBwbGFjZWhvbGRlcj1cIlNjaGxhZ3dvcnRlXCIgLz4pfVxuICAgICAgICA8L0Zvcm0uSXRlbT5cbiAgICAgICAge2Zvcm0uZ2V0RmllbGREZWNvcmF0b3IoYCR7aXRlbS5pZH0ucmVtb3ZlZGAsIHtcbiAgICAgICAgICBpbml0aWFsVmFsdWU6IGl0ZW0ucmVtb3ZlZCxcbiAgICAgICAgICB2YWx1ZVByb3BOYW1lOiAnY2hlY2tlZCdcbiAgICAgICAgfSkoPENoZWNrYm94TWFyZ2luPkltIFBhcGllcmtvcmI8L0NoZWNrYm94TWFyZ2luPil9XG4gICAgICA8L01lbnUuTGlzdD5cblxuICAgICAgPE1lbnUuTGlzdCB0aXRsZT1cIlRhZ2Nsb3VkXCI+XG4gICAgICAgIDxUYWdDb250YWluZXIgc2VsZWN0ZWRUYWdzPXtzZWxlY3RlZFRhZ3N9IGZvcm09e2Zvcm19IC8+XG4gICAgICA8L01lbnUuTGlzdD5cbiAgICAgIHsvKiEgbXVsdGkgJiYgZ2V0SW1hZ2VJbmZvKGl0ZW0pICovfVxuICAgIDwvRm9ybT5cbiAgKTtcbn07XG4iXX0=
