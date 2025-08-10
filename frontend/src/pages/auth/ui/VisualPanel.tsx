import { ArrowLeftIcon } from 'lucide-react';

import { CONFIG } from '@/shared/config';
import { Link } from '@/shared/ui/Link';
import { MorphingBorder } from '@/shared/ui/MorphingBorder';

function VisualPanel() {
  return (
    <div
      className="relative hidden flex-1 shrink-1 items-center justify-center rounded-sm bg-cover bg-center p-4 md:flex"
      aria-hidden
    >
      <Link className="absolute top-6 right-4" to={CONFIG.ROUTES.HOME}>
        <ArrowLeftIcon />
        Back
      </Link>
      <MorphingBorder className="max-w-[70%]">
        <span className="animate-text-gradient from-foreground/90 via-foreground/50 to-foreground/90 bg-gradient-to-r bg-[length:200%] bg-clip-text text-[clamp(1.875rem,-0.2679rem+4.4643vw,2.5rem)] font-semibold text-transparent">
          Timeflow.
        </span>
      </MorphingBorder>
    </div>
  );
}

export { VisualPanel };
