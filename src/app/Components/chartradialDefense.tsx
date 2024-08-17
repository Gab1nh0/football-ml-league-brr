import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

interface Defense {
  Tackles_Tkl: number,
  Tackles_TklW: number,
  Tackles_Def: number,
  Tackles_Mid: number,
  Tackles_Att: number,
  Int: number;

}

const RadarChartDefense = ({ dataD }: { dataD: Defense[] }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            
            const values = dataD.length > 0 ? [
              dataD[0].Tackles_Tkl,
              dataD[0].Tackles_TklW,
              dataD[0].Tackles_Def,
              dataD[0].Tackles_Mid,
              dataD[0].Tackles_Att,
              dataD[0].Int
            ] : [0, 0, 0, 0, 0, 0];

            const option = {
                radar: {
                    indicator: [
                        { name: 'Tackles', max: 25 },
                        { name: 'Tackles Win', max: 20 },
                        { name: 'Tkl Def 1/3', max: 15 },
                        { name: 'Tkl Mid 1/3', max: 10 },
                        { name: 'Tkl Offe 1/3', max: 10 },
                        { name: 'Interceptions', max: 10 }
                    ],
                    axisName: {
                        color: '#000000'
                    },
                    splitArea: {
                        areaStyle: {
                            color: '#FFF5E0',
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#9C9C9C'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#9C9C9C'
                            }
                        }
                    },
                },
                series: [
                    {
                        name: 'Attack Stats',
                        type: 'radar',
                        data: [
                            {
                                value: values,
                                name: 'Player Stats'
                            },
                        ],
                        itemStyle: {
                            color: '#9747FF'
                        },
                        areaStyle: {
                            opacity: 0.1
                        },
                        label: {
                            show: true,
                            formatter: function (params: any) {
                                return params.value as string;
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [dataD]);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default RadarChartDefense;
