import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { FolderKanban, Calendar, TrendingUp, Users, DollarSign, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      label: 'Active Projects',
      value: '7',
      change: '+2 this month',
      icon: FolderKanban,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active Campaigns',
      value: '5',
      change: '+3 this week',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Scheduled Posts',
      value: '24',
      change: '12 today',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Revenue',
      value: '$12,450',
      change: '+18% vs last month',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const recentActivity = [
    { type: 'campaign', message: 'Quiz Genny launch campaign started', time: '2 hours ago' },
    { type: 'post', message: 'XMAS Prints tweet scheduled for tomorrow', time: '4 hours ago' },
    { type: 'milestone', message: 'Translator Bot development milestone reached', time: '1 day ago' },
    { type: 'alert', message: 'Social Automation API rate limit warning', time: '2 days ago' },
  ];

  const upcomingLaunches = [
    { name: 'Quiz Genny', date: '2026-03-12', status: 'On Track' },
    { name: 'XMAS AI Prints', date: '2026-03-25', status: 'In Progress' },
    { name: 'Translator Bot', date: '2026-04-01', status: 'Planning' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-green-600 mt-2">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'alert' ? 'bg-red-50' : 'bg-muted'
                    }`}>
                      {activity.type === 'alert' ? (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      ) : (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Launches */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Launches
              </h3>
              <div className="space-y-3">
                {upcomingLaunches.map((launch, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{launch.name}</p>
                      <p className="text-sm text-muted-foreground">{launch.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      launch.status === 'On Track' ? 'bg-green-100 text-green-800' :
                      launch.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {launch.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
