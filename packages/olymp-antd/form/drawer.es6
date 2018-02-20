import React, { Component } from 'react';
import { createComponent } from 'react-fela';
import { Drawer } from 'olymp-ui';
import Menu, { StackedMenu } from 'olymp-ui/menu';
import {
  FaCube,
  FaCheck,
  FaTimes,
  FaTrashAlt,
  FaArrowLeft,
  FaAngleRight
} from 'olymp-icons';
import { compose, withState, withPropsOnChange } from 'recompose';
import { Icon } from 'antd';
import { get } from 'lodash';
import Form from './autoform';

const Wrapper = createComponent(
  ({ theme }) => ({
    paddingX: theme.space3,
    '& .ant-form-item-label': {
      textAlign: 'left'
    }
  }),
  'div'
);

const enhance = compose(
  withState('keys', 'setKeys', []),
  withPropsOnChange(['keys'], ({ keys }) => {
    const [lastKey, ...rest] = [...keys].reverse();

    return {
      lastKey,
      restKeys: rest.reverse()
    };
  }),
  withPropsOnChange(
    ['fields', 'keys'],
    ({ fields, lastKey, keys, ...rest }) => {
      let schema = get(fields, keys.join('.editProps.fields.'), {
        fields,
        ...rest
      });
      schema = {
        ...schema,
        ...get(schema, 'editProps', {}),
        editProps: undefined
      };

      return {
        schema
      };
    }
  ),
  withPropsOnChange(['schema', 'keys', 'wrap'], ({ schema, keys, wrap }) => {
    const prevFields = get(schema, 'fields', {});
    const fields = {};
    Object.keys(prevFields).forEach(field => {
      if (wrap) {
        fields[[...keys, field].join('.')] = prevFields[field];
      } else {
        fields[field] = prevFields[field];
      }
    });

    return {
      fields
    };
  }),
  withPropsOnChange(
    ['title', 'subtitle', 'lastKey', 'schema'],
    ({ title, subtitle, lastKey, schema }) => ({
      title: lastKey ? schema.label : title,
      subtitle: lastKey ? title : subtitle
    })
  ),
  withPropsOnChange(['fields'], ({ fields }) => ({
    formTabs: Object.keys(fields)
      .map(
        key => (fields[key].edit === 'form' ? { key, ...fields[key] } : null)
      )
      .filter(x => x)
  }))
);

@enhance
export default class DrawerForm extends Component {
  getIcon = icon =>
    icon
      ? (typeof icon === 'string' && <Icon type={icon} />) || icon
      : icon === undefined && <FaCube />;

  handleClose = () => {
    const { form, hasChanged = form.isFieldsTouched(), onClose } = this.props;

    if (!hasChanged || window.confirm('Formular wirklich schließen?')) {
      onClose();
    }
  };

  resolve = args => {
    const { resolve, wrap, keys, setKeys } = this.props;
    const result = { ...args };

    if (args.edit === 'form')
      result.component = ({ id, preview, placeholder }) =>
        preview || (
          <Menu.Item
            onClick={() => setKeys(wrap ? id.split('.') : [...keys, id])}
            extra={<FaAngleRight />}
          >
            {placeholder || args.label}
          </Menu.Item>
        );

    return resolve ? resolve(result) : result;
  };

  renderMenu = () => {
    const {
      layout,
      form,
      isLoading,
      title,
      subtitle,
      fields,
      lastKey,
      restKeys,
      setKeys
    } = this.props;

    return (
      <Menu
        header={
          !!title && (
            <Menu.Item large subtitle={subtitle}>
              {title}
            </Menu.Item>
          )
        }
      >
        <Wrapper>
          <Form
            layout={layout}
            fields={fields}
            resolve={args => this.resolve(args)}
            form={form}
            isLoading={isLoading}
          />
        </Wrapper>

        {!!lastKey && <Menu.Space />}
        {!!lastKey && (
          <Menu.Item
            key="back"
            icon={<FaArrowLeft />}
            onClick={() => setKeys([...restKeys])}
          >
            Zurück
          </Menu.Item>
        )}
      </Menu>
    );
  };

  render() {
    const {
      icon,
      label,
      sublabel,
      open,
      onSave,
      onClose,
      onDelete,
      layout,
      width,
      color = true,
      form,
      hasChanged = form.isFieldsTouched(),
      isLoading,
      lastKey,
      restKeys,
      keys,
      setKeys,
      formTabs,
      wrap
    } = this.props;

    return (
      <Drawer
        open={!!open}
        width={width || (layout === 'horizontal' ? 520 : 400)}
        right
        onClose={this.handleClose}
        menu={
          <Menu
            color={color}
            inverted
            collapsed
            header={
              <Menu.Item large icon={this.getIcon(icon)} subtitle={sublabel}>
                {label}
              </Menu.Item>
            }
          >
            {!!lastKey && (
              <Menu.Item
                key="back"
                icon={<FaArrowLeft />}
                onClick={() => setKeys([...restKeys].reverse())}
              >
                Zurück
              </Menu.Item>
            )}
            {!!lastKey && <Menu.Divider />}

            {!!wrap &&
              formTabs.map(field => (
                <Menu.Item
                  key={field.key}
                  icon={this.getIcon(field.icon)}
                  onClick={() =>
                    setKeys(wrap ? field.key.split('.') : [...keys, field.key])
                  }
                >
                  {field.label}
                </Menu.Item>
              ))}
            {!!wrap && !!formTabs.length && <Menu.Divider />}

            {!!onSave && (
              <Menu.Item
                icon={<FaCheck />}
                onClick={onSave}
                disabled={!hasChanged}
              >
                Speichern
              </Menu.Item>
            )}
            {!!onClose && (
              <Menu.Item icon={<FaTimes />} onClick={onClose}>
                Abbrechen
              </Menu.Item>
            )}
            {!!onDelete && (
              <Menu.Item icon={<FaTrashAlt />} onClick={onDelete}>
                Löschen
              </Menu.Item>
            )}
          </Menu>
        }
      >
        <StackedMenu
          isLoading={isLoading}
          keys={keys}
          renderMenu={this.renderMenu}
        />
      </Drawer>
    );
  }
}
