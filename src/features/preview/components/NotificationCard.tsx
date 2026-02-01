import { Bell } from 'lucide-react';
import type { Project } from '../data/projects';

type NotificationCardProps = {
  project: Project;
};

export function NotificationCard({ project }: NotificationCardProps) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-border bg-card/50 px-4 py-3 shadow-sm backdrop-blur-sm"
      role="status"
      aria-label="Recent notification"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Bell className="size-4 text-primary" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-foreground m-0">
          {project.title} was updated {project.updatedAt}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 m-0">
          Latest activity
        </p>
      </div>
    </div>
  );
}
