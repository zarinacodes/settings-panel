import { usePreferencesStore } from '../preferences/store/preferencesStore';
import { NotificationCard } from './components/NotificationCard';
import { PreviewList } from './components/PreviewList';
import { StatCard } from './components/StatCard';
import { PROJECTS } from './data/projects';

export function PreviewArea() {
  const isCompact = usePreferencesStore(
    (state) => state.preferences.compactMode
  );
  const displayName = usePreferencesStore(
    (state) => state.preferences.displayName
  );
  const notificationsEnabled = usePreferencesStore(
    (state) => state.preferences.notificationsEnabled
  );

  const activeCount = PROJECTS.filter((p) => p.status === 'Active').length;
  const draftCount = PROJECTS.filter((p) => p.status === 'Draft').length;
  const totalCount = PROJECTS.length;

  return (
    <section
      className={`flex flex-1 flex-col self-center w-full max-w-5xl ${isCompact ? 'p-4' : 'p-6'} md:p-8 lg:p-10`}
      aria-label="Dashboard"
    >
      <header className="mb-8">
        <p className="text-sm text-muted-foreground m-0">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground m-0 mt-1">
          {displayName ? `Welcome back, ${displayName}` : 'Dashboard'}
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 m-0">
          Here&apos;s an overview of your projects
        </p>
      </header>

      {notificationsEnabled && PROJECTS[0] && (
        <div className="mb-6">
          <NotificationCard project={PROJECTS[0]} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Active" value={activeCount} />
        <StatCard label="Drafts" value={draftCount} />
        <StatCard label="Total" value={totalCount} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground m-0 mb-4">
          Recent projects
        </h2>
        <PreviewList isCompact={isCompact} items={PROJECTS} />
      </div>
    </section>
  );
}
