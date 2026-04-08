'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { updatePartner } from '@/lib/actions/admin.actions';

interface Partner {
  id: string;
  partner_key: string;
  logo: string;
  name: string;
  category: string;
  website_url: string;
  is_active: boolean;
  soon: boolean;
}

export default function PartnersManager({ partners: initialPartners }: { partners: Partner[] }) {
  const [partners, setPartners] = useState(initialPartners);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = async (id: string, form: HTMLFormElement) => {
    const formData = new FormData(form);
    const res = await updatePartner(id, formData);
    if (res.success) {
      setPartners(partners.map(p => p.id === id ? {
        ...p,
        name: (formData.get('name') as string) || '',
        logo: (formData.get('logo') as string) || '',
        category: (formData.get('category') as string) || '',
        website_url: (formData.get('website_url') as string) || '',
        is_active: formData.get('is_active') === 'true',
        soon: formData.get('soon') === 'true',
      } : p));
      setEditingId(null);
      toast.success('Partner updated!');
    } else {
      toast.error(res.error || 'Failed');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {partners.map((partner, i) => (
        <motion.div
          key={partner.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="rounded-2xl p-5 relative group"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}
        >
          {editingId === partner.id ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSave(partner.id, e.currentTarget); }} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#a78bfa]">{partner.partner_key}</span>
                <button type="button" onClick={() => setEditingId(null)} className="text-white/30 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input name="logo" defaultValue={partner.logo} className="bg-white/5 border border-[#7c3aed]/10 rounded-lg px-3 py-2 text-white text-2xl text-center" />
              <input name="name" defaultValue={partner.name} className="bg-white/5 border border-[#7c3aed]/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Name" />
              <input name="category" defaultValue={partner.category} className="bg-white/5 border border-[#7c3aed]/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Category" />
              <input name="website_url" defaultValue={partner.website_url} className="bg-white/5 border border-[#7c3aed]/10 rounded-lg px-3 py-2 text-white text-sm" placeholder="Website URL" />
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-xs text-white/50">
                  <input type="hidden" name="is_active" value="false" />
                  <input type="checkbox" name="is_active" value="true" defaultChecked={partner.is_active} className="accent-[#7c3aed]" />
                  Active
                </label>
                <label className="flex items-center gap-2 text-xs text-white/50">
                  <input type="hidden" name="soon" value="false" />
                  <input type="checkbox" name="soon" value="true" defaultChecked={partner.soon} className="accent-[#7c3aed]" />
                  Soon
                </label>
              </div>
              <button type="submit" className="btn-admin w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
                Save
              </button>
            </form>
          ) : (
            <>
              <button
                onClick={() => setEditingId(partner.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/5 border border-[#7c3aed]/10 flex items-center justify-center text-white/30 hover:text-[#a78bfa] opacity-0 group-hover:opacity-100 transition-all"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              <div className="text-4xl mb-3">{partner.logo}</div>
              <h4 className="text-white font-poppins font-bold mb-0.5">{partner.name}</h4>
              <p className="text-xs text-white/30 mb-3">{partner.category}</p>

              <div className="flex items-center gap-2">
                {partner.is_active ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Active</span>
                ) : partner.soon ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Coming Soon</span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/20 border border-white/5">Hidden</span>
                )}
                {partner.website_url && (
                  <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-white">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}
