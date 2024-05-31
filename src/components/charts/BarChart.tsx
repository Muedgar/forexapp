"use client"

import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart() {
    const chartRef: any = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ["Info", "asdf", "asfd"], // Labels for the x-axis
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [34, 64, 23], // Data points for the dataset
                            backgroundColor: [
                                "rgba(255, 99, 122, 0.2)",
                                "rgba(255, 100, 12, 0.2)",
                                "rgba(100, 99, 93, 0.2)"
                            ],
                            borderColor: [
                                "rgba(255, 99, 122, 1)",
                                "rgba(255, 100, 12, 1)",
                                "rgba(100, 99, 93, 1)"
                            ],
                            borderWidth: 1 // Border width for the bars
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Attach the new chart to the ref so it can be destroyed later
            chartRef.current.chart = newChart;
        }
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="w-[80%] pl-4 pr-4 m-auto rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
             <canvas ref={chartRef} className="w-full h-[500px]" />
        </div>
    );
}
