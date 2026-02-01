import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { SIDEBAR_WIDTH } from '@/constants';

function SidebarProvider({
  className,
  style,
  collapsed = false,
  ...props
}: ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsed?: boolean;
}) {
  return (
    <div
      data-slot="sidebar-provider"
      data-collapsed={collapsed}
      className={cn(
        'group/sidebar flex h-svh w-full overflow-hidden',
        className
      )}
      style={
        {
          '--sidebar-width': SIDEBAR_WIDTH,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

function Sidebar({
  side = 'left',
  collapsible = 'none',
  className,
  ...props
}: ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  return (
    <div
      data-slot="sidebar"
      data-side={side}
      data-collapsible={collapsible}
      className={cn(
        'flex h-full w-[var(--sidebar-width)] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground overflow-hidden',
        'data-[side=left]:border-r data-[side=right]:border-l',
        className
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        'flex h-14 shrink-0 items-center border-b border-sidebar-border px-4',
        className
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto px-4 py-4',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn(
        'flex flex-col gap-1 pb-4 mb-1 border-b border-sidebar-border last:border-b-0 last:pb-0 last:mb-0',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot="sidebar-group-label"
      className={cn(
        'px-0 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/90',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn('flex flex-col gap-0.5', className)}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative flex h-full min-w-0 flex-1 flex-col overflow-auto bg-background transition-colors duration-200 ease-in-out',
        className
      )}
      {...props}
    />
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
};
