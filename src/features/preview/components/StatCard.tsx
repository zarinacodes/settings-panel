type StatCardProps = {
  label: string;
  value: number;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-border/80">
      <p className="text-xs font-medium text-muted-foreground m-0 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-2xl font-semibold text-foreground m-0 mt-1">{value}</p>
    </div>
  );
}
