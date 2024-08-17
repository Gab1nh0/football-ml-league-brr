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

const RadarChartAttackCompare = ({ dataStats1 = [], dataStats2 = [] }: { dataStats1?: Attack[], dataStats2?: Attack[] }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const values1 = dataStats1.length > 0 ? [
                dataStats1[0].Standard_Gls,
                dataStats1[0].Standard_Sh,
                dataStats1[0].Standard_SoT,
                dataStats1[0].Expected_xG,
                dataStats1[0].Standard_FK,
                dataStats1[0].Standard_PK
            ] : [0, 0, 0, 0, 0, 0];

            const values2 = dataStats2.length > 0 ? [
                dataStats2[0].Standard_Gls,
                dataStats2[0].Standard_Sh,
                dataStats2[0].Standard_SoT,
                dataStats2[0].Expected_xG,
                dataStats2[0].Standard_FK,
                dataStats2[0].Standard_PK
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
                    axisName: { color: '#000000' },
                    splitArea: { areaStyle: { color: '#FFF5E0' } },
                    splitLine: { lineStyle: { color: '#9C9C9C' } }
                },
                series: [
                    {
                        name: 'Player 1 Attack',
                        type: 'radar',
                        data: [{ value: values1, name: 'Player 1' }],
                        itemStyle: { color: '#CE1124' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    },
                    {
                        name: 'Player 2 Attack',
                        type: 'radar',
                        data: [{ value: values2, name: 'Player 2' }],
                        itemStyle: { color: '#0033A0' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    }
                ],
                legend: {
                    data: ['Player 1 Attack', 'Player 2 Attack']
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

export default RadarChartAttackCompare;
