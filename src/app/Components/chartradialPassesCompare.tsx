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

const RadarChartPasseskCompare = ({ dataStats1 = [], dataStats2 = [] }: { dataStats1?: Passes[], dataStats2?: Passes[] }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const values1 = dataStats1.length > 0 ? [
                dataStats1[0].Ast,
                dataStats1[0].xAG,
                dataStats1[0].KP,
                dataStats1[0].PrgP,
                dataStats1[0].Total_Att,
                dataStats1[0].Total_Cmp
            ] : [0, 0, 0, 0, 0, 0];

            const values2 = dataStats2.length > 0 ? [
                dataStats2[0].Ast,
                dataStats2[0].xAG,
                dataStats2[0].KP,
                dataStats2[0].PrgP,
                dataStats2[0].Total_Att,
                dataStats2[0].Total_Cmp
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
                    axisName: { color: '#000000' },
                    splitArea: { areaStyle: { color: '#FFF5E0' } },
                    splitLine: { lineStyle: { color: '#9C9C9C' } }
                },
                series: [
                    {
                        name: 'Player 1 Passes',
                        type: 'radar',
                        data: [{ value: values1, name: 'Player 1' }],
                        itemStyle: { color: '#CE1124' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    },
                    {
                        name: 'Player 2 Passes',
                        type: 'radar',
                        data: [{ value: values2, name: 'Player 2' }],
                        itemStyle: { color: '#0033A0' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    }
                ],
                legend: {
                    data: ['Player 1 Passes', 'Player 2 Passes']
                  },
            };

            myChart.setOption(option);

            return () => {
                myChart.dispose();
            };
        }
    }, [dataStats1, dataStats2]);

    return <div ref={chartRef} style={{ width: '300px', height: '400px' }} />;
};

export default RadarChartPasseskCompare;
