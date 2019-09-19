import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlotBandLineContext from './PlotBandLineContext';
import usePlotBandLineLifecycle from './usePlotBandLineLifecycle';

const PlotLine = memo(props => {
  const plotline = usePlotBandLineLifecycle(props, 'plotLines');

  const { children } = props;

  if (!children && !plotline) return null;

  return (
    <PlotBandLineContext.Provider value={plotline}>
      {children}
    </PlotBandLineContext.Provider>
  );
});

PlotLine.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.any.isRequired,
  color: PropTypes.string,
  children: PropTypes.node
};

PlotLine.displayName = 'PlotLine';
export default PlotLine;
