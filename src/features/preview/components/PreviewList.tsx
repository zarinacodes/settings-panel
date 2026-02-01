import type { Project } from '../data/projects';

type PreviewListProps = {
  isCompact: boolean;
  items?: Project[];
};

export function PreviewList({ isCompact, items = [] }: PreviewListProps) {
  if (items.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-16 px-6 text-center"
        role="status"
        aria-label="No projects"
      >
        <p className="text-sm font-medium text-muted-foreground m-0">
          No projects yet
        </p>
        <p className="text-xs text-muted-foreground mt-1 m-0 max-w-xs">
          Create your first project to get started
        </p>
        <button
          type="button"
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          New project
        </button>
      </div>
    );
  }

  return (
    <ul
      className={`list-none m-0 p-0 grid ${isCompact ? 'grid-cols-1 gap-1.5' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}
      role="list"
    >
      {items.map((item) => (
        <li key={item.id}>
          <article
            className={`${isCompact ? 'p-3' : 'p-4'} rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 ease-out hover:shadow-md hover:border-primary/20`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3
                  className={`font-semibold text-foreground m-0 truncate ${isCompact ? 'text-sm' : 'text-base'}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-muted-foreground m-0 truncate ${isCompact ? 'text-xs mt-0.5 leading-tight' : 'text-sm mt-1'}`}
                >
                  {item.description}
                </p>
                {item.updatedAt && (
                  <p
                    className={`text-muted-foreground/80 m-0 mt-1.5 ${isCompact ? 'text-[10px]' : 'text-xs'}`}
                  >
                    Updated {item.updatedAt}
                  </p>
                )}
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-200 ease-out ${
                  item.status === 'Active'
                    ? 'bg-primary/[0.06] text-primary/90'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {item.status}
              </span>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
