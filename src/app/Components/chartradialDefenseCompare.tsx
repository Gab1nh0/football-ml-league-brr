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

const RadarChartDefenseCompare = ({ dataStats1 = [], dataStats2 = [] }: { dataStats1?: Defense[], dataStats2?: Defense[] }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = echarts.init(chartRef.current);

            const values1 = dataStats1.length > 0 ? [
                dataStats1[0].Tackles_Tkl,
                dataStats1[0].Tackles_TklW,
                dataStats1[0].Tackles_Def,
                dataStats1[0].Tackles_Mid,
                dataStats1[0].Tackles_Att,
                dataStats1[0].Int
            ] : [0, 0, 0, 0, 0, 0];

            const values2 = dataStats2.length > 0 ? [
                dataStats2[0].Tackles_Tkl,
                dataStats2[0].Tackles_TklW,
                dataStats2[0].Tackles_Def,
                dataStats2[0].Tackles_Mid,
                dataStats2[0].Tackles_Att,
                dataStats2[0].Int
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
                    axisName: { color: '#000000' },
                    splitArea: { areaStyle: { color: '#FFF5E0' } },
                    splitLine: { lineStyle: { color: '#9C9C9C' } }
                },
                
                series: [
                    {
                        name: 'Player 1 Defense',
                        type: 'radar',
                        data: [{ value: values1, name: 'Player 1' }],
                        itemStyle: { color: '#CE1124' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    },
                    {
                        name: 'Player 2 Defense',
                        type: 'radar',
                        data: [{ value: values2, name: 'Player 2' }],
                        itemStyle: { color: '#0033A0' },
                        areaStyle: { opacity: 0.1 },
                        label: { show: true }
                    },
                    
                ],
                legend: {
                    data: ['Player 1 Defense', 'Player 2 Defense']
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

export default RadarChartDefenseCompare;
