import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Project } from '@/types';
import { getStatusColor, getPriorityColor, formatDate } from '@/lib/utils';
import { Plus, MoreHorizontal } from 'lucide-react';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Quiz Genny',
    description: 'AI-powered quiz generator for teachers and content creators',
    status: 'launching',
    priority: 'high',
    tech_stack: ['Next.js', 'Supabase', 'OpenAI', 'Stripe'],
    launch_date: '2026-03-12',
    created_at: '2026-01-15',
    updated_at: '2026-02-20',
  },
  {
    id: '2',
    name: 'Marketing Platform',
    description: 'Unified marketing launch management platform',
    status: 'in_development',
    priority: 'high',
    tech_stack: ['Next.js', 'Supabase', 'Radix UI'],
    launch_date: '2026-03-15',
    created_at: '2026-01-20',
    updated_at: '2026-02-21',
  },
  {
    id: '3',
    name: 'XMAS AI Prints',
    description: 'Seasonal AI-generated holiday cards',
    status: 'in_development',
    priority: 'medium',
    tech_stack: ['Next.js', 'Stable Diffusion', 'Stripe'],
    launch_date: '2026-03-25',
    created_at: '2026-01-10',
    updated_at: '2026-02-15',
  },
  {
    id: '4',
    name: 'Translator Bot',
    description: 'AI-powered translation service with multiple platforms',
    status: 'planning',
    priority: 'medium',
    tech_stack: ['Python', 'OpenAI', 'Telegram', 'Stripe'],
    launch_date: '2026-04-01',
    created_at: '2026-01-05',
    updated_at: '2026-02-10',
  },
  {
    id: '5',
    name: 'Social Automation',
    description: 'Automated social media posting and scheduling',
    status: 'planning',
    priority: 'low',
    tech_stack: ['Next.js', 'Twitter API', 'LinkedIn API'],
    launch_date: '2026-04-15',
    created_at: '2026-01-01',
    updated_at: '2026-02-05',
  },
  {
    id: '6',
    name: 'Sheets2FB',
    description: 'Google Sheets to Facebook automation',
    status: 'planning',
    priority: 'low',
    tech_stack: ['Google Sheets API', 'Facebook API', 'Node.js'],
    launch_date: '2026-04-20',
    created_at: '2026-01-08',
    updated_at: '2026-02-08',
  },
  {
    id: '7',
    name: 'BOS Trading Strategy',
    description: 'Automated trading strategy for MetaTrader 5',
    status: 'on_hold',
    priority: 'low',
    tech_stack: ['MQL5', 'Python', 'MetaTrader 5'],
    launch_date: undefined,
    created_at: '2026-01-12',
    updated_at: '2026-02-01',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-muted-foreground">Manage all your projects in one place</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProjects.map((project) => (
              <div key={project.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{project.tech_stack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>

                {project.launch_date && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Target Launch: <span className="font-medium text-foreground">{formatDate(project.launch_date, 'long')}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
