import React from 'react';
import { shallow, mount } from 'enzyme';
import Icon from '../../../../src/components/Icon';

test('handles classNames properly', () => {
  const icon = shallow(<Icon type="foo-bar" className="baz" />);
  expect(icon.is('.Icon--foo-bar.baz')).toBe(true);
});

test('sets aria-hidden to "true" if no label is passed', () => {
  const icon = mount(<Icon type="foo" />);
  // enzyme makes it hard to get attribute values...
  expect(icon.getDOMNode().getAttribute('aria-hidden')).toBe('true');
});

test('sets aria-hidden to "false" if no label is passed', () => {
  const icon = mount(<Icon type="foo" label="Fred" />);
  expect(icon.getDOMNode().getAttribute('aria-hidden')).toBe('false');
});

test('sets aria-label to the value of the label prop', () => {
  const icon = mount(<Icon type="foo" label="Fred" />);
  expect(icon.getDOMNode().getAttribute('aria-label')).toBe('Fred');
});

test('supports ref prop', done => {
  const ref = icon => {
    expect(icon).toBeTruthy();
    done();
  };

  mount(<Icon type="foo" ref={ref} />);
});
