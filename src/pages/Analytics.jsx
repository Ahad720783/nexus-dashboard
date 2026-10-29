import React, { useState } from 'react';
import {
  BarChart2,
  Globe2,
  Server,
  Zap,
  Clock,
  HardDrive,
  Cpu,
  ArrowUpRight,
  Filter,
  Download
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useToast } from '../hooks/useToast';

const trafficSources = [
  { source: 'Direct Navigation', visitors: '45,210', share: 38, change: '+12%' },
  { source: 'Organic Search', visitors: '38,190', share: 32, change: '+8%' },
  { source: 'Developer Referrals', visitors: '19,840', share: 17, change: '+24%' },
  { source: 'Partner Integrations', visitors: '11,420', share: 9, change: '+5%' },
  { source: 'Social / Tech Community', visitors: '4,780', share: 4, change: '-2%' },
];

const funnelSteps = [
  { step: 'Landing Visitors', count: '142,000', percentage: '100%', drop: '0%' },
  { step: 'Trial Signups', count: '28,400', percentage: '20.0%', drop: '80.0%' },
  { step: 'Active Product Usage', count: '18,460', percentage: '13.0%', drop: '35.0%' },
  { step: 'Paid Subscriptions', count: '4,820', percentage: '3.4%', drop: '73.9%' },
  { step: 'Enterprise Expansions', count: '1,240', percentage: '0.87%', drop: '74.2%' },
];

const serverNodes = [
  { name: 'us-east-1 (N. Virginia)', status: 'Optimal', latency: '24ms', load: '34%' },
  { name: 'us-west-2 (Oregon)', status: 'Optimal', latency: '38ms', load: '42%' },
  { name: 'eu-central-1 (Frankfurt)', status: 'Optimal', latency: '49ms', load: '29%' },
  { name: 'ap-southeast-1 (Singapore)', status: 'Optimal', latency: '72ms', load: '51%' },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const { success } = useToast();

  const handleExport = () => {
    success('Full analytics dataset export downloaded.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System & Traffic Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Deep dive into acquisition channels, user conversion funnel, and infrastructure health.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs font-medium shadow-xs">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md transition-colors uppercase ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <Button variant="outline" size="md" icon={Download} onClick={handleExport}>
            Export Data
          </Button>
        </div>
      </div>

      {/* Infrastructure Telemetry Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card bodyClassName="p-4.5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Avg API Latency</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">38.4 ms</div>
            <span className="text-[11px] text-emerald-600 font-semibold">-4.2% faster</span>
          </div>
        </Card>

        <Card bodyClassName="p-4.5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Cluster CPU Load</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">31.8%</div>
            <span className="text-[11px] text-slate-400">Balanced across 16 nodes</span>
          </div>
        </Card>

        <Card bodyClassName="p-4.5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Cache Hit Ratio</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">99.2%</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Edge CDN verified</span>
          </div>
        </Card>

        <Card bodyClassName="p-4.5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Error Rate</span>
            <div className="text-xl font-bold text-slate-900 mt-0.5">0.003%</div>
            <span className="text-[11px] text-emerald-600 font-semibold">99.997% success</span>
          </div>
        </Card>
      </div>

      {/* Traffic Sources & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card
          title="Acquisition Sources"
          subtitle="Top inbound visitor channels"
        >
          <div className="space-y-4">
            {trafficSources.map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{item.visitors} visits</span>
                    <span className="font-semibold text-indigo-600">{item.share}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${item.share}%` }}
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversion Funnel */}
        <Card
          title="User Conversion Funnel"
          subtitle="Step-by-step conversion lifecycle"
        >
          <div className="space-y-3">
            {funnelSteps.map((step, idx) => (
              <div
                key={step.step}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">{step.step}</span>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-bold text-slate-900 block">{step.count}</span>
                    <span className="text-[10px] text-slate-400 block">{step.percentage} rate</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Global Edge Node Health */}
      <Card
        title="Global Infrastructure Nodes"
        subtitle="Regional latency and operational health status"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {serverNodes.map((node) => (
            <div
              key={node.name}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Globe2 className="w-4 h-4 text-indigo-600" />
                <Badge variant="active" size="sm">
                  {node.status}
                </Badge>
              </div>

              <div>
                <span className="font-semibold text-xs text-slate-900 block truncate">
                  {node.name}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Latency: {node.latency}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>CPU Load</span>
                <span className="font-semibold text-slate-800">{node.load}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
