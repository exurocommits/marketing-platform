import { useState } from 'react';
import { Image, Video, FileText, Search, Filter, Plus, Trash2, Download, Upload } from 'lucide-react';
import type { Asset } from '@/types';
import { formatDate } from '@/lib/utils';

const mockAssets: Asset[] = [
  {
    id: '1',
    project_id: '1',
    type: 'image',
    name: 'Quiz Genny Hero Image.png',
    description: 'Main hero image for landing page',
    file_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
    file_size: 245800,
    dimensions: { width: 1200, height: 630 },
    tags: ['quiz-genny', 'hero', 'landing-page'],
    created_at: '2026-02-15',
    updated_at: '2026-02-15',
  },
  {
    id: '2',
    project_id: '1',
    type: 'copy',
    name: 'Launch Tweet - Day 1',
    description: 'First launch announcement tweet for Quiz Genny',
    content: '🚀 Just launched Quiz Genny! Create AI-powered quiz presentations in minutes, not hours. Perfect for teachers, trainers, and content creators. #QuizGenny #EdTech',
    tags: ['twitter', 'launch', 'copy'],
    created_at: '2026-02-20',
    updated_at: '2026-02-20',
  },
  {
    id: '3',
    project_id: '2',
    type: 'image',
    name: 'XMAS Card Design 1.png',
    description: 'Holiday card with Santa and snowflakes',
    file_url: 'https://images.unsplash.com/photo-1482516630908-5a4981a698a5?w=800',
    file_size: 189450,
    dimensions: { width: 1080, height: 1080 },
    tags: ['xmas', 'holiday', 'card-design'],
    created_at: '2026-02-18',
    updated_at: '2026-02-18',
  },
  {
    id: '4',
    project_id: '3',
    type: 'video',
    name: 'Demo Walkthrough.mp4',
    description: 'Product demo showing key features',
    file_size: 15728640,
    tags: ['demo', 'video', 'product-hunt'],
    created_at: '2026-02-10',
    updated_at: '2026-02-10',
  },
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'image' | 'video' | 'copy'>('all');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (asset.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            📦 Assets
          </h1>
        </div>
        <nav className="px-4 space-y-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Assets
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'image' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setSelectedType('video')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'video' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setSelectedType('copy')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedType === 'copy' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Copy & Text
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">Asset Library</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium">
              <Upload className="w-4 h-4" />
              Upload Asset
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Assets Grid */}
          {filteredAssets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No assets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset.id)}
                  className={`group bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedAsset === asset.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {asset.type === 'image' ? (
                    <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                      <img
                        src={asset.file_url}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : asset.type === 'video' ? (
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}

                  <h4 className="font-medium text-foreground text-sm mb-1 truncate">{asset.name}</h4>
                  {asset.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{asset.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1 mt-2">
                    {asset.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                    <span>{formatDate(asset.created_at, 'short')}</span>
                    <span>
                      {asset.file_size ? `${(asset.file_size / 1024).toFixed(1)}KB` : 'Copy'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Asset Detail Panel */}
          {selectedAsset && (
            <div className="fixed right-0 top-16 bottom-0 w-96 bg-card border-l border-border overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Asset Details</h3>
                  <button onClick={() => setSelectedAsset(null)}>
                    <Trash2 className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>

                {(() => {
                  const asset = mockAssets.find(a => a.id === selectedAsset);
                  if (!asset) return null;

                  return (
                    <div className="space-y-4">
                      {asset.type === 'image' && (
                        <div>
                          <img
                            src={asset.file_url}
                            alt={asset.name}
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Name</h4>
                        <p className="text-sm text-foreground">{asset.name}</p>
                      </div>

                      {asset.description && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">Description</h4>
                          <p className="text-sm text-muted-foreground">{asset.description}</p>
                        </div>
                      )}

                      {asset.content && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">Content</h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{asset.content}</p>
                        </div>
                      )}

                      {asset.dimensions && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-1">Dimensions</h4>
                          <p className="text-sm text-muted-foreground">{asset.dimensions.width} × {asset.dimensions.height}px</p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {asset.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-muted text-muted-foreground rounded-lg text-sm font-medium">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                          <Plus className="w-4 h-4" />
                          Add to Campaign
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
