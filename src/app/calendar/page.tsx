import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths } from 'date-fns';
import type { CalendarEvent } from '@/types';

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    type: 'launch',
    title: 'Quiz Genny Launch',
    description: 'Official launch of Quiz Genny MVP',
    start: new Date('2026-03-12'),
    end: new Date('2026-03-12'),
    project_id: '1',
    color: '#22c55e',
    allDay: true,
  },
  {
    id: '2',
    type: 'campaign',
    title: 'XMAS Prints Teaser',
    description: 'Pre-launch teaser campaign',
    start: new Date('2026-03-01'),
    end: new Date('2026-03-31'),
    project_id: '2',
    color: '#3b82f6',
    allDay: true,
  },
  {
    id: '3',
    type: 'post',
    title: 'Launch Announcement Tweet',
    description: 'Product Hunt launch post',
    start: new Date('2026-03-12T09:00:00'),
    end: new Date('2026-03-12T09:00:00'),
    campaign_id: '1',
    color: '#f59e0b',
    allDay: false,
  },
  {
    id: '4',
    type: 'milestone',
    title: '100 Signups Reached',
    description: 'Milestone: 100th user signup',
    start: new Date('2026-03-15'),
    end: new Date('2026-03-15'),
    project_id: '1',
    color: '#10b981',
    allDay: true,
  },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDays = (date: Date) => {
    return eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = getMonthDays(currentDate);

  const getEventsForDay = (day: Date) => {
    return mockEvents.filter(event =>
      isSameDay(day, new Date(event.start)) || isSameDay(day, new Date(event.end))
    );
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'launch':
        return '🚀';
      case 'campaign':
        return '📚';
      case 'post':
        return '📝';
      case 'milestone':
        return '🎯';
      default:
        return '📌';
    }
  };

  const previousMonth = () => setCurrentDate(addMonths(currentDate, -1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📅 Calendar
          </h1>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={previousMonth} className="p-2 hover:bg-muted rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        <div className="p-6">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 bg-muted border-b border-border">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center text-xs font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {/* Empty cells before first day of month */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2 border-b border-r border-border" />
              ))}

              {/* Days of month */}
              {days.map((day) => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-24 p-1 border-b border-r border-border hover:bg-muted/50 transition-colors ${
                      isToday ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="text-right mb-1">
                      <span className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-foreground'}`}>
                        {format(day, 'd')}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded text-foreground truncate"
                          style={{ backgroundColor: event.color }}
                          title={event.title}
                        >
                          <span className="mr-1">{getEventTypeIcon(event.type)}</span>
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs p-1 bg-muted rounded text-muted-foreground text-center">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-6 bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {mockEvents
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: event.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(event.start), 'MMM d, yyyy')} {event.allDay ? '' : format(new Date(event.start), 'h:mm a')}
                      </p>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
