import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  // TODO: allowed "types" should be defined here (intellisense, etc)
  type: string;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ label, className, type, ...other }: IconProps, ref) => {
    const [, name, direction] = type.match(/(.*)-(right|left|up|down)$/) || [
      '',
      type
    ];
    const [IconSVG, setIcon] = useState<React.ComponentType<any> | null>(null);

    useEffect(() => {
      // NOTE: we don't want to pollute test output with
      //  console.errors as a result of the dynamic imports
      if (process.env.NODE_ENV === 'test') {
        return;
      }

      import(`./icons/${name}.svg`)
        .then(icon => {
          setIcon(() => icon.default);
        })
        .catch(ex => {
          console.error(`Could not find icon type "${type}".`);
          setIcon(null);
        });
    }, [type]);

    const data = {
      ...other,
      'aria-hidden': !label,
      className: classNames('Icon', `Icon--${type}`, className, {
        [`Icon__${direction}`]: !!direction
      })
    };

    if (label) {
      data['aria-label'] = label;
    }

    return (
      <div ref={ref} {...data}>
        {IconSVG && <IconSVG />}
      </div>
    );
  }
);

Icon.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string.isRequired
};

Icon.displayName = 'Icon';

export default Icon;
