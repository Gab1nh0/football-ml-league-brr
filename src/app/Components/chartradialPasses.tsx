import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

interface Passes {
  Ast: number,
  xAG: number,
  KP: number,
  PrgP: number,
  Total_Att: number,
  Total_Cmp: number;
}

const RadarChartPasses = ({ dataA }: { dataA: Passes[] }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            
            const values = dataA.length > 0 ? [
              dataA[0].Ast,
              dataA[0].xAG,
              dataA[0].KP,
              dataA[0].PrgP,
              dataA[0].Total_Att,
              dataA[0].Total_Cmp
            ] : [0, 0, 0, 0, 0, 0];

            const option = {
                radar: {
                    indicator: [
                        { name: 'Ast', max: 8 },
                        { name: 'xAG', max: 4 },
                        { name: 'KP', max: 25 },
                        { name: 'PrgP', max: 45 },
                        { name: 'Attempted', max: 300 },
                        { name: 'Completed', max: 350 }
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
                            color: '#00A3FF'
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
    }, [dataA]);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default RadarChartPasses;
