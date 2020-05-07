import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js';
import 'chartjs-plugin-dragdata';
import { makeStyles } from '@material-ui/styles';
import defaultAudioData, { volumeBounds, panBounds, filterBounds } from '../../constants/audio-data';
import { parseToRgba } from '../../utils/color-utils';

const useAutomationStyles = makeStyles({
  graph: {
    height: '250px !important',
    width: 'calc(100% - 10px) !important',
    padding: '5px 5px 10px 5px'
  }
});

export default function AutomationEditor({ note, parameterToAutomate }) {
  const theme = useSelector(state => state.network.theme);
  const screenInfo = useSelector(state => state.view.screenInfo);
  const elementIndex = useSelector(state => state.network.elementIndex);
  const node = useSelector(state => state.network.audio.nodeData && state.network.audio.nodeData[elementIndex]);
  const chartRef = useRef();
  const [options, setOptions] = useState(optionsMap(theme));
  const [datasets, setDatasets] = useState(null);
  const [allowTooltips, setAllowTooltips] = useState(true);

  useEffect(() => {
    setOptions(optionsMap(theme));
  }, [theme]);

  // useEffect(() => {
  //   if(datasets && note && parameterToAutomate){
  //     const data = datasets.filter(el => el.label === parameterToAutomate.key);
  //     const multiple = noteToMod[note];
  //     const d =  data[0].data.slice()
  //     for(let i = 0; i < 16 / multiple; i++){
  //       d[i * multiple] = d[i];
  //     }
  //     for(let i = 0; i < 16; i++){
  //       if(i % multiple !== 0){
  //         d[i] = null;
  //       }
  //     }
  //   }
  // }, [datasets, note, parameterToAutomate])

  useEffect(() => {
    const getDatasetsForOptions = () => {
      const ret = [];
      Object.keys(options).forEach(key => {
        ret.push({
          label: key,
          data: defaultDataMap(node)[key],
          borderColor: options[key].color,
          backgroundColor: parseToRgba(theme ? options[key].color : '#000000', 0.3),
          showLine: parameterToAutomate && key === parameterToAutomate.key,
          hidden: parameterToAutomate && key !== parameterToAutomate.key,
          dragData: parameterToAutomate && key === parameterToAutomate.key,
          pointHitRadius: 25
        });
      });
      return ret;
    };
    setDatasets(getDatasetsForOptions(options));
  }, [node, options, parameterToAutomate, theme]);

  useEffect(() => {
    Chart.defaults.global.defaultFontFamily = 'Inconsolata';
    Chart.defaults.global.legend.display = false;
    if (parameterToAutomate && parameterToAutomate.key) {
      new Chart(chartRef.current.getContext('2d'), {
        type: 'line',
        data: {
          labels: noteToX[note],
          datasets: datasets,
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
                }
              }
            ]
          },
          animation: allowTooltips,
          tooltips: {
            enabled: allowTooltips,
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
          dragData: true,
          dragX: false,
          dragDataRound: options[parameterToAutomate.key].decimals,
          dragOptions: {
            showTooltip: true
          },
          onDragStart: function(e, element) {
            setAllowTooltips(true);
          },
          onDrag: function(e, datasetIndex, index, value) {
            e.target.style.cursor = 'grabbing';
          },
          onDragEnd: function(e, datasetIndex, index, value) {
            e.target.style.cursor = 'default';
            node.updateAutomationValues(datasets, parameterToAutomate.key, note);
            setAllowTooltips(false);
          },
          hover: {
            onHover: function(e) {
              // indicate that a datapoint is draggable by showing the 'grab' cursor when hovered
              const point = this.getElementAtEvent(e);
              if (point.length) e.target.style.cursor = 'grab';
              else e.target.style.cursor = 'default';
            }
          },
          events: []
        }
      });
    }
  }, [theme, options, datasets, parameterToAutomate, allowTooltips, note, node]);

  const classes = useAutomationStyles({ screenInfo: screenInfo, theme: theme });

  return <canvas id='myChart' className={classes.graph} ref={chartRef} />;
}

const defaultDataMap = node => {
  return {
    volumeAutomation: node.volumeAutomation,
    panAutomation: node.panAutomation,
    hpFilterFrequencyAutomation: node.hpFilterFrequencyAutomation,
    hpFilterQAutomation: node.hpFilterQAutomation,
    lpFilterFrequencyAutomation: node.lpFilterFrequencyAutomation,
    lpFilterQAutomation: node.lpFilterQAutomation
  };
};

const noteToX = {
  sixteenth: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  eighth: [0, 2, 4, 6, 8, 10, 12, 14],
  quarter: [0, 4, 8, 12],
  half: [0, 8],
  whole: [0]
};

const optionsMap = theme => {
  return {
    volumeAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.nonMetal,
      decimals: 2
    },
    panAutomation: {
      min: -1,
      max: 1,
      color: theme && theme.nobleGas,
      decimals: 2
    },
    hpFilterFrequencyAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.alkaliMetal,
      decimals: 2
    },
    hpFilterQAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.transitionMetal,
      decimals: 2
    },
    lpFilterFrequencyAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.postTransitionMetal,
      decimals: 2
    },
    lpFilterQAutomation: {
      min: 0,
      max: 1,
      color: theme && theme.metalloid,
      decimals: 2
    }
  };
};
