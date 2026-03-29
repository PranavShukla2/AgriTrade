import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, AreaSeries } from 'lightweight-charts';

export const TradingChart = ({
    data,
    colors = {
        backgroundColor: 'transparent',
        lineColor: '#818cf8',
        textColor: '#94a3b8',
        areaTopColor: 'rgba(129, 140, 248, 0.4)',
        areaBottomColor: 'rgba(129, 140, 248, 0.05)',
    }
}: {
    data: any[],
    colors?: any
}) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            grid: {
                vertLines: { color: 'rgba(51, 65, 85, 0.3)' },
                horzLines: { color: 'rgba(51, 65, 85, 0.3)' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderColor: 'rgba(51, 65, 85, 0.5)',
            },
            rightPriceScale: {
                borderColor: 'rgba(51, 65, 85, 0.5)',
            }
        });

        const newSeries = chart.addSeries(AreaSeries, {
            lineColor: colors.lineColor,
            topColor: colors.areaTopColor,
            bottomColor: colors.areaBottomColor,
            lineWidth: 2,
        });

        newSeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, colors]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
};
