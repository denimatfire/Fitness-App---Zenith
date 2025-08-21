
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const weightData = [
  { name: 'Jan', weight: 185 }, { name: 'Feb', weight: 182 }, { name: 'Mar', weight: 180 },
  { name: 'Apr', weight: 178 }, { name: 'May', weight: 175 }, { name: 'Jun', weight: 174 },
];

const stepsData = [
  { name: 'Mon', steps: 6200 }, { name: 'Tue', steps: 8100 }, { name: 'Wed', steps: 7500 },
  { name: 'Thu', steps: 9200 }, { name: 'Fri', steps: 10500 }, { name: 'Sat', steps: 12000 },
  { name: 'Sun', steps: 5800 },
];

const sleepData = [
  { name: 'Mon', hours: 7.5 }, { name: 'Tue', hours: 6.8 }, { name: 'Wed', hours: 8.1 },
  { name: 'Thu', hours: 7.2 }, { name: 'Fri', hours: 6.5 }, { name: 'Sat', hours: 8.9 },
  { name: 'Sun', hours: 7.8 },
];

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
    <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">{title}</h3>
    <div className="h-52">
      {children}
    </div>
  </div>
);

const CustomTooltip: React.FC<any> = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="label font-bold">{`${label}`}</p>
          <p className="intro" style={{color: payload[0].color}}>{`${payload[0].name} : ${payload[0].value.toLocaleString()} ${unit}`}</p>
        </div>
      );
    }
    return null;
  };

const ProgressScreen: React.FC = () => {
    return (
        <div className="p-6 space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress</h1>
                <p className="text-gray-500 dark:text-gray-400">See how far you've come.</p>
            </header>

            <ChartCard title="Weight (lbs)">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" domain={['dataMin - 5', 'dataMax + 5']} />
                        <Tooltip content={<CustomTooltip unit="lbs" />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} />
                        <Line type="monotone" dataKey="weight" name="Weight" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Steps (Last 7 Days)">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stepsData}>
                        <defs>
                            <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
                        <Tooltip content={<CustomTooltip unit="steps" />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}/>
                        <Area type="monotone" dataKey="steps" name="Steps" stroke="#22c55e" fillOpacity={1} fill="url(#colorSteps)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>
            
            <ChartCard title="Sleep (Last 7 Days)">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sleepData}>
                        <defs>
                            <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" />
                        <YAxis tick={{ fill: 'currentColor', fontSize: 12 }} stroke="currentColor" domain={['dataMin - 1', 'dataMax + 1']} />
                        <Tooltip content={<CustomTooltip unit="hrs" />} cursor={{fill: 'rgba(128, 128, 128, 0.1)'}}/>
                        <Area type="monotone" dataKey="hours" name="Sleep" stroke="#6366f1" fillOpacity={1} fill="url(#colorSleep)" />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>
    );
};

export default ProgressScreen;
