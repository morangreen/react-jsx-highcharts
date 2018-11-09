import Pathfinder from './Pathfinder';
import { provideChart } from 'react-jsx-highcharts';
import PathfinderMarker from "./PathfinderMarker";
import PathfinderStartMarker from "./PathfinderStartMarker";
import PathfinderEndMarker from "./PathfinderEndMarker";
const ChartPathfinder = provideChart(Pathfinder);
ChartPathfinder.Marker = provideChart(PathfinderMarker);
ChartPathfinder.StartMarker = provideChart(PathfinderStartMarker);
ChartPathfinder.EndMarker = provideChart(PathfinderEndMarker);
export default ChartPathfinder;