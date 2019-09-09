import React from 'react';
import getDisplayName from '../../utils/getDisplayName';
import useChart from '../UseChart';

// This is a HOC function.
// It takes a component...
export default function provideChart(Component) {
  // ...and returns another component...
  const ChartWrappedComponent = function(props) {
    const { getChart, needsRedraw } = useChart();
    // ... and renders the wrapped component with the context chart
    // Notice that we pass through any additional props as well

    if(!getChart) return null;

    return (
      <Component
        {...props}
        getChart={getChart}
        needsRedraw={needsRedraw} />
    )
  };

  ChartWrappedComponent.displayName = `Chart.Provider(${getDisplayName(Component)})`

  return ChartWrappedComponent;
}
