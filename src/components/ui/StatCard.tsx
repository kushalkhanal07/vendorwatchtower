
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cva, type VariantProps } from 'class-variance-authority';

const statCardVariants = cva("", {
  variants: {
    variant: {
      default: "glass-card",
      solid: "bg-card",
      outline: "border border-border bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: {
    value: string | number;
    positive?: boolean;
  };
  footer?: React.ReactNode;
  className?: string;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, icon, change, footer, variant, className, ...props }, ref) => {
    return (
      <Card 
        ref={ref} 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md", 
          statCardVariants({ variant }), 
          className
        )} 
        {...props}
      >
        <CardHeader className="p-4 pb-0 flex justify-between items-start">
          <CardTitle className="text-sm text-muted-foreground font-medium">{title}</CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-semibold">{value}</div>
            {change && (
              <div className={cn(
                "text-xs font-medium rounded-full px-2 py-0.5",
                change.positive 
                  ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50" 
                  : "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-950/50"
              )}>
                {change.positive ? '+' : ''}{change.value}
              </div>
            )}
          </div>
        </CardContent>
        {footer && (
          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground border-t border-border/50">
            {footer}
          </CardFooter>
        )}
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";
