import React from 'react';
import AutoSizer from 'olymp-ui/autosizer';
import { createComponent } from 'olymp-fela';
import Form from './form';

const Wrapper = createComponent(
  () => ({
    width: '100%',
    paddingX: 50,
    marginTop: 15,
    ifSmallDown: {
      paddingX: 15
    },
    '& .ant-form-item-label': {
      textAlign: 'left'
    }
  }),
  'div'
);

export default ({ layout = 'auto', ...rest }) => (
  <Wrapper>
    {layout === 'auto' ? (
      <AutoSizer steps={[0, 400]}>
        {({ step }) => (
          <Form {...rest} layout={step === 400 ? 'horizontal' : 'vertical'} />
        )}
      </AutoSizer>
    ) : (
      <Form {...rest} layout={layout} />
    )}
  </Wrapper>
);
