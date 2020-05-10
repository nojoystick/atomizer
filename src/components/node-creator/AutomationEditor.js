import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js';
import 'chartjs-plugin-dragdata';
import { makeStyles } from '@material-ui/styles';
import { panBounds, filterBounds } from '../../constants/audio-data';
import { parseToRgba } from '../../utils/color-utils';

const useAutomationStyles = makeStyles({
  chartContainer: {
    height: 'calc(100% - 50px)',
    padding: '5px 5px 10px 5px'
  }
});

export default function AutomationEditor({ parameterToAutomate, forceUpdate }) {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const chartRef = useRef();
  const [options, setOptions] = useState(optionsMap(theme));
  const [dataset, setDataset] = useState(null);

  useEffect(() => {
    setOptions(optionsMap(theme));
  }, [theme]);

  useEffect(() => {
    const getDatasetForOptions = () => {
      return [
        {
          label: parameterToAutomate.key,
          data: node && node[parameterToAutomate.key],
          borderColor: options[parameterToAutomate.key].color,
          backgroundColor: parseToRgba(theme ? options[parameterToAutomate.key].color : '#000000', 0.3),
          pointHitRadius: 25
        }
      ];
    };
    if (parameterToAutomate) {
      setDataset(getDatasetForOptions(options));
    }
  }, [node, options, parameterToAutomate, theme]);

  useEffect(() => {
    let automationChart;
    const updateData = newData => {
      dataset[0].data = newData;
      automationChart.update(0);
    };
    Chart.defaults.global.defaultFontFamily = 'Inconsolata';
    Chart.defaults.global.legend.display = false;
    if (parameterToAutomate && parameterToAutomate.key) {
      automationChart = new Chart(chartRef.current.getContext('2d'), {
        type: 'line',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          datasets: dataset,
          fillOpacity: 0.6
        },
        options: {
          scales: {
            xAxes: [
              {
                ticks: { display: false },
                gridLines: {
                  display: false,
                  drawBorder: false
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  max: options[parameterToAutomate.key].max,
                  min: options[parameterToAutomate.key].min,
                  display: false
                },
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                type: options[parameterToAutomate.key].yAxisType,
                offset: true
              }
            ]
          },
          animation: {
            duration: 0
          },
          spanGaps: true,
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: theme && theme.secondaryText,
            displayColors: false,
            bodyFontColor: theme && theme.background,
            callbacks: {
              title: () => {
                return null;
              },
              label: tooltipItem => {
                return tooltipItem.value;
              }
            }
          },
          onClick: function(e, element) {
            // double click
            if (e.detail === 2 && dataset) {
              if (element.length === 1) {
                const dataToUpdate = node[parameterToAutomate.key].slice();
                if (hasAtLeastTwoValues(dataToUpdate)) {
                  dataToUpdate[element[0]._index] = null;
                  node.updateAutomationValues(dataToUpdate, parameterToAutomate.key);
                  updateData(node[parameterToAutomate.key]);
                }
              } else if (element.length === 0) {
                const dataToUpdate = node[parameterToAutomate.key].slice();
                const [width, height] = [chartRef.current.width, chartRef.current.height];
                const [max, min] = [options[parameterToAutomate.key].max, options[parameterToAutomate.key].min];
                const beatIndex = Math.floor((e.offsetX / (width - 10)) * 32);
                dataToUpdate[beatIndex] = Math.round(((height - e.offsetY) / (height - 10)) * (max - min) * 10) / 10;
                node.updateAutomationValues(dataToUpdate, parameterToAutomate.key);
                updateData(node[parameterToAutomate.key]);
                forceUpdate();
              }
            }
          },
          dragData: true,
          dragX: false,
          dragDataRound: options[parameterToAutomate.key].decimals,
          dragOptions: {
            showTooltip: true
          },
          onDragStart: function(e, element) {},
          onDrag: function(e, datasetIndex, index, value) {
            e.target.style.cursor = 'grabbing';
          },
          onDragEnd: function(e, datasetIndex, index, value) {
            e.target.style.cursor = 'default';
            node.updateAutomationValues(dataset[0].data, parameterToAutomate.key);
          }
        }
      });
    }
    return function cleanup() {
      automationChart && automationChart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, options, parameterToAutomate, node, dataset]);

  const classes = useAutomationStyles({ screenInfo: screenInfo, theme: theme });

  return (
    <div className={classes.chartContainer}>
      <canvas id='myChart' className={classes.graph} ref={chartRef} />
    </div>
  );
}

const hasAtLeastTwoValues = data => {
  let numValues = 0;
  for (let i = 0; i < data.length / 2; i++) {
    if (data[i] !== null) {
      numValues++;
    }
    if (data[data.length - 1 - i] !== null) {
      numValues++;
    }
    if (numValues > 2) {
      return true;
    }
  }
  return false;
};

const optionsMap = theme => {
  return {
    volumeAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.nonMetal,
      decimals: 2,
      yAxisType: 'linear'
    },
    panAutomation: {
      min: panBounds.min / panBounds.valueConversion,
      max: panBounds.max / panBounds.valueConversion,
      color: theme && theme.nobleGas,
      decimals: 2,
      yAxisType: 'linear'
    },
    hpFilterFrequencyAutomation: {
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      color: theme && theme.alkaliMetal,
      decimals: 2,
      yAxisType: 'linear'
    },
    hpFilterQAutomation: {
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      color: theme && theme.transitionMetal,
      decimals: 2,
      yAxisType: 'linear'
    },
    lpFilterFrequencyAutomation: {
      min: filterBounds.frequency.min,
      max: filterBounds.frequency.max,
      color: theme && theme.postTransitionMetal,
      decimals: 2,
      yAxisType: 'linear'
    },
    lpFilterQAutomation: {
      min: filterBounds.q.min,
      max: filterBounds.q.max,
      color: theme && theme.metalloid,
      decimals: 2,
      yAxisType: 'linear'
    }
  };
};
