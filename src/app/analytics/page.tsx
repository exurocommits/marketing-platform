import { TrendingUp, Users, Share2, MousePointerClick, ArrowUpRight, Calendar } from 'lucide-react';

const mockAnalytics = {
  period: {
    start: '2026-02-01',
    end: '2026-02-21',
  },
  campaigns: {
    total: 12,
    active: 3,
    completed: 7,
  },
  posts: {
    total: 145,
    scheduled: 23,
    posted: 122,
  },
  engagement: {
    total_impressions: 52400,
    total_engagements: 8930,
    avg_engagement_rate: 17.04,
  },
  traffic: {
    visits: 18500,
    unique_visitors: 12400,
    bounce_rate: 42.3,
  },
  conversions: {
    signups: 342,
    sales: 28,
    revenue: 12450,
  },
  by_channel: {
    twitter: { posts: 45, impressions: 18000, engagements: 3200, conversions: 125 },
    linkedin: { posts: 30, impressions: 14000, engagements: 2800, conversions: 110 },
    facebook: { posts: 25, impressions: 12000, engagements: 1900, conversions: 85 },
    instagram: { posts: 20, impressions: 8400, engagements: 1030, conversions: 22 },
    email: { posts: 15, impressions: 0, engagements: 0, conversions: 0 },
    product_hunt: { posts: 1, impressions: 0, engagements: 0, conversions: 0 },
    blog: { posts: 9, impressions: 0, engagements: 0, conversions: 0 },
  },
  dailyData: [
    { date: '2026-02-15', impressions: 2400, engagements: 410, visits: 1200, conversions: 18 },
    { date: '2026-02-16', impressions: 2100, engagements: 345, visits: 980, conversions: 15 },
    { date: '2026-02-17', impressions: 2800, engagements: 520, visits: 1450, conversions: 22 },
    { date: '2026-02-18', impressions: 2600, engagements: 470, visits: 1320, conversions: 19 },
    { date: '2026-02-19', impressions: 3200, engagements: 620, visits: 1680, conversions: 26 },
    { date: '2026-02-20', impressions: 2900, engagements: 540, visits: 1510, conversions: 24 },
  ],
};

export default function AnalyticsPage() {
  const engagementRate = mockAnalytics.engagement.avg_engagement_rate.toFixed(1);
  const conversionRate = ((mockAnalytics.conversions.signups / mockAnalytics.traffic.unique_visitors) * 100).toFixed(2);
  const revenuePerConversion = (mockAnalytics.conversions.revenue / mockAnalytics.conversions.signups).toFixed(2);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📊 Analytics
          </h1>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Analytics Dashboard</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Feb 1 - 21, 2026</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Impressions</span>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {mockAnalytics.engagement.total_impressions.toLocaleString()}
              </div>
              <div className="text-xs text-green-600 mt-1">+24% vs last period</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">{engagementRate}%</div>
              <div className="text-xs text-green-600 mt-1">+3.2% vs last period</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Signups</span>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">{mockAnalytics.conversions.signups}</div>
              <div className="text-xs text-green-600 mt-1">+18% vs last period</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <ArrowUpRight className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-foreground">${mockAnalytics.conversions.revenue.toLocaleString()}</div>
              <div className="text-xs text-green-600 mt-1">+32% vs last period</div>
            </div>
          </div>

          {/* Campaign Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Campaigns</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">{mockAnalytics.campaigns.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Active</span>
                  <span className="text-lg font-bold text-green-600">{mockAnalytics.campaigns.active}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Completed</span>
                  <span className="text-lg font-bold text-muted-foreground">{mockAnalytics.campaigns.completed}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Posts</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">{mockAnalytics.posts.total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Scheduled</span>
                  <span className="text-lg font-bold text-yellow-600">{mockAnalytics.posts.scheduled}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Posted</span>
                  <span className="text-lg font-bold text-green-600">{mockAnalytics.posts.posted}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Key Metrics</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Unique Visitors</span>
                  <span className="text-lg font-bold text-foreground">{mockAnalytics.traffic.unique_visitors.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Bounce Rate</span>
                  <span className="text-lg font-bold text-orange-600">{mockAnalytics.traffic.bounce_rate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Conversion Rate</span>
                  <span className="text-lg font-bold text-purple-600">{conversionRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance by Channel */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Performance by Channel</h3>
            <div className="space-y-3">
              {Object.entries(mockAnalytics.by_channel).map(([channel, data]) => (
                <div key={channel} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {channel.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">{channel.replace('_', ' ')}</p>
                      <p className="text-xs text-muted-foreground">{data.posts} posts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{data.impressions.toLocaleString()} impressions</p>
                    <p className="text-sm text-foreground font-medium">{data.conversions} conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Trend Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Engagement Trend</h3>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {mockAnalytics.dailyData.map((day) => {
                const maxEngagement = Math.max(...mockAnalytics.dailyData.map(d => d.engagements));
                const height = (day.engagements / maxEngagement) * 100;

                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-primary/80 hover:bg-primary rounded-t-lg transition-colors"
                      style={{ height: `${height}%` }}
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
