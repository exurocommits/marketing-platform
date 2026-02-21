import { useState } from 'react';
import { Calendar, Clock, Target, DollarSign, User, Share2 } from 'lucide-react';
import type { Campaign } from '@/types';
import { getStatusColor, formatDate } from '@/lib/utils';

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    project_id: '1',
    name: 'Quiz Genny Launch',
    description: 'Initial launch campaign for Quiz Genny MVP',
    status: 'active',
    start_date: '2026-02-20',
    end_date: '2026-03-20',
    budget: 5000,
    channels: ['twitter', 'linkedin', 'email', 'product_hunt'],
    goals: [
      { id: '1', type: 'traffic', target: 10000, current: 2500, unit: 'visitors' },
      { id: '2', type: 'signups', target: 500, current: 45, unit: 'users' },
    ],
    created_at: '2026-02-15',
    updated_at: '2026-02-20',
  },
  {
    id: '2',
    project_id: '2',
    name: 'XMAS Prints Teaser',
    description: 'Build anticipation for seasonal launch',
    status: 'scheduled',
    start_date: '2026-03-01',
    end_date: '2026-03-31',
    budget: 3000,
    channels: ['twitter', 'facebook', 'instagram'],
    goals: [
      { id: '3', type: 'awareness', target: 50000, unit: 'impressions' },
      { id: '4', type: 'traffic', target: 5000, unit: 'visitors' },
    ],
    created_at: '2026-02-18',
    updated_at: '2026-02-18',
  },
];

export default function CampaignsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'completed'>('all');

  const filteredCampaigns = mockCampaigns.filter(camp =>
    filter === 'all' ? true : camp.status === filter
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📚 Campaigns
          </h1>
        </div>
        <nav className="px-4 space-y-1">
          <button
            onClick={() => setFilter('all')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              filter === 'scheduled' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              filter === 'completed' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Completed
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">
            {filter === 'all' && 'All Campaigns'}
            {filter === 'active' && 'Active Campaigns'}
            {filter === 'scheduled' && 'Scheduled Campaigns'}
            {filter === 'completed' && 'Completed Campaigns'}
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
            New Campaign
          </button>
        </div>

        <div className="p-6 space-y-6">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No campaigns found</p>
            </div>
          ) : (
            filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Start</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(campaign.start_date, 'short')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">End</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(campaign.end_date, 'short')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-sm font-medium text-foreground">${campaign.budget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium text-foreground">30 days</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Channels</h4>
                  <div className="flex flex-wrap gap-2">
                    {campaign.channels.map((channel) => (
                      <span key={channel} className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-xs capitalize">
                        {channel.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Goals Progress</h4>
                  <div className="space-y-2">
                    {campaign.goals.map((goal) => {
                      const progress = goal.current ? Math.round((goal.current / goal.target) * 100) : 0;
                      return (
                        <div key={goal.id}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">
                              {goal.type}: {goal.current || 0} / {goal.target} {goal.unit}
                            </span>
                            <span className="font-medium text-foreground">{progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80">
                    <Share2 className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
                    <Target className="w-4 h-4" />
                    Manage Campaign
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
