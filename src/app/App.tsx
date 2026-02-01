import { TooltipProvider } from '@/components/ui/tooltip';
import { AppLayout } from './AppLayout';

export default function App() {
  return (
    <TooltipProvider>
      <AppLayout />
    </TooltipProvider>
  );
}
