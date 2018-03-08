import { toLnglat, toPixel } from './common';
import React from 'react';
import { render } from 'react-dom';
import isFun from './isFun';

export const MarkerConfigurableProps = [
  'position',
  'offset',
  'icon',
  'content',
  'draggable',
  'visible',
  'zIndex',
  'angle',
  'animation',
  'shadow',
  'title',
  'clickable',
  'extData',
  'label'
];

export const MarkerAllProps = MarkerConfigurableProps.concat([
  'topWhenClick',
  'bubble',
  'raiseOnDrag',
  'cursor',
  'autoRotation',
  'shape'
]);

export const getPropValue = (key, value) => {
  if (MarkerAllProps.indexOf(key) === -1) {
    return null;
  }
  if (key === 'position') {
    return toLnglat(value);
  } else if (key === 'offset') {
    return toPixel(value);
  }
  return value;
};

export const renderMarkerComponent = (component, marker) => {
  let child = component;
  if (isFun(component)) {
    const extData = marker.getExtData();
    child = component(extData);
  }
  if (child) {
    render(<div>{child}</div>, marker.getContent());
  }
};
