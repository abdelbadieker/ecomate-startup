import { createClient } from '@/lib/supabase/server';
import CustomersTable from '@/components/dashboard/crm/CustomersTable';

export default async function CRMPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Customer Base (CRM)</h2>
        <p className="text-[var(--text-sub)]">Manage, analyze, and communicate with your audience.</p>
      </div>

      <div className="card-glass p-6">
        <CustomersTable initialCustomers={customers || []} />
      </div>
    </div>
  );
}
