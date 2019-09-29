import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotLine from '../../../src/components/PlotBandLine/PlotLine';
import * as useAxis from '../../../src/components/UseAxis';

describe('<PlotLine />', () => {
  let testContext;
  let useAxisSpy;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, providedAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;
    useAxisSpy = jest.spyOn(useAxis, 'default').mockImplementation(() => providedAxis);

  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBandOrLine method', () => {
      mount(<PlotLine id="My PlotLine" value={2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(
        { id: 'My PlotLine', value: 2 }
      , 'plotLines');
    });

    it('should pass additional props through to Axis addPlotBandOrLine method', () => {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" value={24.2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(
        { id: 'My Other PlotLine', borderColor: 'red', value: 24.2 }
      , 'plotLines');
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotLine id="myPlotLineIdStr" value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotLineIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc'
      mount(
        <PlotLine id={idFunc} value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotLineIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotLine value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when updated', () => {
    it('removes and adds plotline when props change', () => {
      const wrapper = mount(
        <PlotLine id="myplotline" value={3} width={10} />
      );
      testContext.axisStubs.addPlotBandOrLine.mockClear();

      wrapper.setProps({ value: 4});
      expect(testContext.axisStubs.removePlotBandOrLine).toHaveBeenCalledWith('myplotline');
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledTimes(1);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith({
        id: "myplotline",
        value: 4,
        width:10
      }, 'plotLines');
    });
    it('does not remove plotline when only children change', () => {
      const wrapper = mount(
        <PlotLine id="myplotline" value={3} width={10} />
      );
      testContext.axisStubs.addPlotBandOrLine.mockClear();
      testContext.axisStubs.removePlotBandOrLine.mockClear();
      wrapper.setProps({ children: <div/> });
      expect(testContext.axisStubs.addPlotBandOrLine).not.toHaveBeenCalled();
      expect(testContext.axisStubs.removePlotBandOrLine).not.toHaveBeenCalled();
    });
  })

  describe('when unmounted', () => {
    it('removes the plot line by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotLine id="My PlotLine" value={2} />
      );
      testContext.axisStubs.removePlotBandOrLine.mockClear();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotBandOrLine).toHaveBeenCalledWith('My PlotLine');
    });
  });
});
