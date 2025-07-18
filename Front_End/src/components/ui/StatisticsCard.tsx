import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  percentage: string;
  percentageColor?: string;
  chartData: { name: string; value: number }[];
  chartType?: 'line' | 'bar';
  chartColor?: string;
  valueColor?: string;
  description?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  percentage,
  percentageColor = 'text-green-500',
  chartData,
  chartType = 'line',
  chartColor = '#000',
  valueColor = 'text-black',
  description,
}) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        <div className={`text-xs ${percentageColor}`}>{percentage}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
        <div className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke={chartColor} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Bar dataKey="value" fill={chartColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard; 