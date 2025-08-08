import { Badge, type BadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export type AnnouncementProps = BadgeProps & {
  themed?: boolean;
};

export const Announcement = ({
  variant = 'outline',
  themed = false,
  className,
  ...props
}: AnnouncementProps) => (
  <Badge
    variant={variant}
    className={cn(
      'group max-w-full gap-2 rounded-full px-4 py-1 font-normal shadow-sm transition-all',
      'hover:shadow-md',
      'bg-background text-foreground border-border ',
      themed
        ? // Themed background and border
        'bg-privue-950/75 border-privue-950 hover:bg-privue-950/50 hover:border-privue-950/75 text-shadow-2xs'
        :
        // 'bg-privue-950/75 border-privue-950 hover:bg-privue-950/50 hover:border-privue-950/75 text-shadow-2xs',
        className
    )}
    {...props}
  />
);

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTag = ({
  className,
  ...props
}: AnnouncementTagProps) => (
  <div
    className={cn(
      '-ml-2.5 shrink-0 truncate rounded-full px-2.5 py-0.5 text-xs font-medium font-open-sans',
      'bg-privue-100 text-privue-800 border-privue-300',
      'dark:bg-gradient-to-br from-privue-950 to-privue-950 via-privue-800 dark:text-foreground dark:border-privue-600',
      className
    )}
    {...props}
  />
);

export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>;

export const AnnouncementTitle = ({
  className,
  ...props
}: AnnouncementTitleProps) => (
  <div
    className={cn('flex items-center gap-1 truncate py-1 font-medium text-muted-foreground dark:text-muted-foreground', className)}
    {...props}
  />
);
