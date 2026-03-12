import { useEffect, useState } from 'react';
import { Check, Search, Download, BarChart3, FileText, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const STEPS = [
  { label: 'Enviando solicitação', icon: Search, duration: 2000 },
  { label: 'Coletando dados', icon: Download, duration: 4000 },
  { label: 'Analisando conteúdo', icon: BarChart3, duration: 5000 },
  { label: 'Processando métricas', icon: FileText, duration: 4000 },
  { label: 'Finalizando relatório', icon: Sparkles, duration: 3000 },
];

interface ResearchProgressBarProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ResearchProgressBar({ active, onComplete }: ResearchProgressBarProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let elapsed = 0;
    const totalDuration = STEPS.reduce((sum, s) => sum + s.duration, 0);

    const interval = setInterval(() => {
      elapsed += 100;

      // Calculate cumulative duration up to current step
      let cumulative = 0;
      for (let i = 0; i <= stepIndex; i++) {
        cumulative += STEPS[i].duration;
      }

      const stepStart = cumulative - STEPS[stepIndex].duration;
      const stepElapsed = elapsed - stepStart;

      if (stepElapsed >= STEPS[stepIndex].duration && stepIndex < STEPS.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }

      const overallProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(overallProgress);

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            {STEPS[currentStep].label}...
          </p>
          <span className="text-xs text-muted-foreground tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <div className="flex items-center justify-between gap-1">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                  isComplete && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary/20 text-primary ring-2 ring-primary/30',
                  !isComplete && !isCurrent && 'bg-secondary/60 text-muted-foreground'
                )}
              >
                {isComplete ? (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <Icon className={cn('w-3.5 h-3.5', isCurrent && 'animate-pulse')} strokeWidth={1.5} />
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] text-center leading-tight truncate w-full',
                  isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
