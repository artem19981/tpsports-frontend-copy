import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { MenuItem, Select } from '@mui/material';
import styles from './styles.module.scss';

export function CountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  ...rest
}: any) {
  const onChange_ = useCallback(
    (event: any) => {
      const value = event.target.value;
      onChange(value === 'ZZ' ? undefined : value);
    },
    [onChange]
  );

  return (
    <Select
      {...rest}
      className={styles.select}
      disabled={disabled || readOnly}
      readOnly={readOnly}
      value={value || 'ZZ'}
      onChange={onChange_}
      MenuProps={{
        className: styles.menu,
      }}
    >
      {options.map(({ value, label, divider }: any) => (
        <MenuItem
          key={divider ? '|' : value || 'ZZ'}
          value={divider ? '|' : value || 'ZZ'}
          disabled={divider ? true : false}
          style={divider ? DIVIDER_STYLE : undefined}
        >
          <>
            {value ? getUnicodeFlagIcon(value) : ''} {label}
          </>
        </MenuItem>
      ))}
    </Select>
  );
}

CountrySelect.propTypes = {
  /**
   * A two-letter country code.
   * Example: "US", "RU", etc.
   */
  value: PropTypes.string,

  /**
   * A function of `value: string`.
   * Updates the `value` property.
   */
  onChange: PropTypes.func.isRequired,

  // `<select/>` options.
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      divider: PropTypes.bool,
    })
  ).isRequired,

  // `readonly` attribute doesn't work on a `<select/>`.
  // https://github.com/catamphetamine/react-phone-number-input/issues/419#issuecomment-1764384480
  // https://www.delftstack.com/howto/html/html-select-readonly/
  // To work around that, if `readOnly: true` property is passed
  // to this component, it behaves analogous to `disabled: true`.
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

const DIVIDER_STYLE = {
  fontSize: '1px',
  backgroundColor: 'currentColor',
  color: 'inherit',
};

export function CountrySelectWithIcon({
  value,
  options,
  className,
  iconComponent: Icon,
  getIconAspectRatio,
  arrowComponent: Arrow = DefaultArrowComponent,
  unicodeFlags,
  ...rest
}: any) {
  const selectedOption = useMemo(() => {
    return getSelectedOption(options, value);
  }, [options, value]);

  return (
    <div className="PhoneInputCountry">
      <CountrySelect
        {...rest}
        value={value}
        options={options}
        className={classNames('PhoneInputCountrySelect', className)}
      />

      {/* Either a Unicode flag icon or an SVG flag icon. */}
      {selectedOption &&
        (unicodeFlags && value ? (
          <div
            className="PhoneInputCountryIconUnicode"
            style={{ marginRight: '3px' }}
          >
            {getUnicodeFlagIcon(value)}
          </div>
        ) : (
          <Icon
            aria-hidden
            country={value}
            label={selectedOption.label}
            aspectRatio={unicodeFlags ? 1 : undefined}
          />
        ))}

      <Arrow />
    </div>
  );
}

CountrySelectWithIcon.propTypes = {
  // Country flag component.
  iconComponent: PropTypes.elementType,

  // Select arrow component.
  arrowComponent: PropTypes.elementType,

  // Set to `true` to render Unicode flag icons instead of SVG images.
  unicodeFlags: PropTypes.bool,
};

function DefaultArrowComponent() {
  return <div className="PhoneInputCountrySelectArrow" />;
}

function getSelectedOption(options: any, value: any) {
  for (const option of options) {
    if (!option.divider) {
      if (isSameOptionValue(option.value, value)) {
        return option;
      }
    }
  }
}

function isSameOptionValue(value1: any, value2: any) {
  // `undefined` is identical to `null`: both mean "no country selected".
  if (value1 === undefined || value1 === null) {
    return value2 === undefined || value2 === null;
  }
  return value1 === value2;
}
