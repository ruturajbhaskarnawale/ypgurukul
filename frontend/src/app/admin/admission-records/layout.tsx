import { RecordsLayoutShell } from '@/components/admin/records-explorer/RecordsLayoutShell';

export default function AdmissionRecordsLayout({ children }: { children: React.ReactNode }) {
  return (
    <RecordsLayoutShell>
      {children}
    </RecordsLayoutShell>
  );
}
