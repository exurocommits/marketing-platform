// Core Types for Marketing Launch Platform

export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_development' | 'launching' | 'live' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  tech_stack: string[];
  launch_date?: string;
  created_at: string;
  updated_at: string;
};

export type Campaign = {
  id: string;
  project_id: string;
  name: string;
  description: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  budget: number;
  channels: SocialChannel[];
  goals: CampaignGoal[];
  created_at: string;
  updated_at: string;
};

export type CampaignGoal = {
  id: string;
  type: 'traffic' | 'signups' | 'sales' | 'engagement' | 'awareness';
  target: number;
  current?: number;
  unit: string;
};

export type SocialChannel = 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'email' | 'blog' | 'product_hunt';

export type Asset = {
  id: string;
  campaign_id?: string;
  project_id: string;
  type: 'image' | 'video' | 'copy' | 'document' | 'other';
  name: string;
  description?: string;
  file_url?: string;
  file_size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  content?: string; // For copy/text assets
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type ScheduledPost = {
  id: string;
  campaign_id: string;
  channel: SocialChannel;
  asset_id: string;
  content: string;
  scheduled_for: string;
  status: 'scheduled' | 'posted' | 'failed' | 'cancelled';
  posted_at?: string;
  platform_post_id?: string;
  metrics?: PostMetrics;
  created_at: string;
  updated_at: string;
};

export type PostMetrics = {
  impressions: number;
  engagements: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
  reach?: number;
};

export type CalendarEvent = {
  id: string;
  type: 'launch' | 'campaign' | 'post' | 'milestone' | 'other';
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  project_id?: string;
  campaign_id?: string;
  color?: string;
  allDay?: boolean;
};

export type Analytics = {
  period: {
    start: string;
    end: string;
  };
  campaigns: {
    total: number;
    active: number;
    completed: number;
  };
  posts: {
    total: number;
    scheduled: number;
    posted: number;
  };
  engagement: {
    total_impressions: number;
    total_engagements: number;
    avg_engagement_rate: number;
  };
  traffic: {
    visits: number;
    unique_visitors: number;
    bounce_rate: number;
  };
  conversions: {
    signups: number;
    sales: number;
    revenue: number;
  };
  by_channel: Record<SocialChannel, {
    posts: number;
    impressions: number;
    engagements: number;
    conversions: number;
  }>;
};

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  avatar_url?: string;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'campaign_launch' | 'post_scheduled' | 'post_failed' | 'milestone_reached' | 'other';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};
