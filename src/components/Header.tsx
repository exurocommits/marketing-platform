import { LayoutDashboard, FolderKanban, Calendar, ImageIcon, BarChart3, Plus, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <LayoutDashboard className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>
    </header>
  );
}
