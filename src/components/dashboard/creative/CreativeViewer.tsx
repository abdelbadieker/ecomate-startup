'use client';

import { motion } from 'framer-motion';
import { Clapperboard, FileVideo, FileText, Image as ImageIcon, ExternalLink, Sparkles } from 'lucide-react';

const ASSET_ICONS: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  video: { icon: FileVideo, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  thumbnail: { icon: ImageIcon, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  script: { icon: FileText, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  report: { icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10' },
};

interface CreativeAsset {
  id: string;
  asset_type: string;
  title: string;
  drive_folder_id?: string;
  month_year?: string;
  is_delivered: boolean;
  drive_url?: string;
}

export default function CreativeViewer({ assets }: { assets: CreativeAsset[] }) {
  if (assets.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center card-glass p-12 text-center min-h-[400px]"
      >
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-admin/20 flex items-center justify-center">
            <Clapperboard className="w-10 h-10 text-primary-light" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </div>

        <h3 className="text-2xl font-poppins font-bold text-white mb-3">
          Your Creatives Are Being Prepared 🎬
        </h3>
        <p className="text-[var(--text-sub)] max-w-md leading-relaxed">
          Our in-house creative studio is crafting premium short-form videos, thumbnails, and ad scripts for your brand.
          Your deliverables will appear here once your monthly package begins.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <div className="badge-blue px-4 py-2 text-sm">📹 Video Production</div>
          <div className="badge-purple px-4 py-2 text-sm">✍️ Ad Scripts</div>
          <div className="badge-green px-4 py-2 text-sm">🎨 Thumbnails</div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset, i) => {
        const meta = ASSET_ICONS[asset.asset_type] || ASSET_ICONS.video;
        const Icon = meta.icon;

        return (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-glass overflow-hidden flex flex-col group"
          >
            {/* Preview area — if Google Drive folder, embed an iframe */}
            {asset.drive_folder_id ? (
              <div className="h-52 border-b border-[var(--border-c)] overflow-hidden">
                <iframe
                  src={`https://drive.google.com/embeddedfolderview?id=${asset.drive_folder_id}#grid`}
                  className="w-full h-full border-0"
                  title={asset.title}
                />
              </div>
            ) : (
              <div className="h-40 bg-[var(--bg-section)] flex items-center justify-center border-b border-[var(--border-c)]">
                <Icon className={`w-12 h-12 ${meta.color} group-hover:scale-110 transition-transform`} />
              </div>
            )}

            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-poppins font-bold text-white text-lg truncate">{asset.title}</h3>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.bg} ${meta.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {asset.month_year && (
                <span className="text-xs text-[var(--text-muted)] mt-1">📅 {asset.month_year}</span>
              )}

              <div className="flex items-center justify-between mt-auto pt-4">
                <span className={`text-xs font-bold ${asset.is_delivered ? 'badge-green' : 'badge-blue'} px-2.5 py-1`}>
                  {asset.is_delivered ? '✓ Delivered' : '⏳ In Progress'}
                </span>
                {asset.drive_url && (
                  <a
                    href={asset.drive_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-light hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Open <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
