import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

interface Attack {
    Standard_Gls: number,
    Standard_Sh: number,
    Standard_SoT: number,
    Expected_xG: number,
    Standard_FK: number,
    Standard_PK: number;
}

const RadarChartAttack = ({ dataS }: { dataS: Attack[] }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            
            const values = dataS.length > 0 ? [
                dataS[0].Standard_Gls,
                dataS[0].Standard_Sh,
                dataS[0].Standard_SoT,
                dataS[0].Expected_xG,
                dataS[0].Standard_FK,
                dataS[0].Standard_PK
            ] : [0, 0, 0, 0, 0, 0];

            const option = {
                radar: {
                    indicator: [
                        { name: 'Gls', max: 7 },
                        { name: 'Shots', max: 15 },
                        { name: 'Shots on Target', max: 15 },
                        { name: 'xG', max: 7 },
                        { name: 'Free Kicks', max: 10 },
                        { name: 'Penalty Shots', max: 5 }
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
                            color: '#CE1124'
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
    }, [dataS]);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default RadarChartAttack;
