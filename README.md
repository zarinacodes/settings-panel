# Settings & Dashboard UI

https://github.com/user-attachments/assets/60164e6d-efe4-4632-8e9c-40e4f79aa2bb

A small frontend project that explores how user preferences shape the interface.
The goal is clear architecture, predictable state, and decisions that hold up under scrutiny, not visual flair or backend integration.

## What this is

A settings panel and dashboard where preferences actually change the UI: theme, accent color, compact mode, notifications.
The dashboard reacts to these settings.
Everything is mocked; the focus is on structure and state flow.

## Project structure

```
src/
├── app/                    # App shell, layout
├── components/ui/          # shadcn primitives (checkbox, sidebar, tooltip…)
├── constants/              # Shared config (accent colors, shortcuts, layout values)
├── features/
│   ├── preferences/        # Settings panel, store, theme sync
│   └── preview/            # Dashboard, stat cards, project list
└── shared/                 # App-level (SkipLink, Announcer, AppHeader, ErrorBoundary, useKeyboardShortcut)
```

Feature-first: each feature owns its components, store, and types.
`shared/` holds app-level pieces that serve the whole app, not a specific feature.

## Design decisions

**State**  
I use Zustand for cross-feature preferences.
State lives in one place and is not mirrored into local component state.

**Styling**  
Tailwind classes stay close to JSX.
I avoid extracting class constants unless they're reused or represent design tokens.

**Components**  
Each component has a single responsibility.
I extract pieces like `ApiKeySection` or `KeyboardShortcuts` only when it reduces cognitive load.

**Accessibility**  
I rely on semantic HTML first.
ARIA is used where it adds clarity, not as a replacement for labels.

**What I avoided**  
Extra abstractions, premature optimization, and configuration layers that obscure readable JSX.

## Features

| Area | What it does |
|------|--------------|
| Profile | Display name |
| Appearance | Light / dark theme, accent color |
| Display | Compact mode, in-app notifications |
| Shortcuts | `Ctrl+B` / `Cmd+B` toggles the settings panel |
| API key | Mocked copy/regenerate with masked display |

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- shadcn/ui

## Running locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).
