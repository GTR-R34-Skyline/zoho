import React from 'react';
import Card from './Card';

export default function StatCard({ label, value, icon, trend, trendUp }) {
    return (
        <Card className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-secondary-text">{label}</p>
                <p className="mt-1 text-2xl font-semibold text-headers">{value}</p>
                {trend && (
                    <p className={`mt-1 text-sm flex items-center ${trendUp ? 'text-success' : 'text-error'}`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </p>
                )}
            </div>
            {icon && (
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
            )}
        </Card>
    );
}
