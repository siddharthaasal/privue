'use client';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';
import * as z from 'zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { useForm as useFormspree, ValidationError } from '@formspree/react';
import { useState, useRef, useEffect } from 'react';

const topics = [
  'Distributor Performance Management',
  'Sustainability Assessment',
  'Commercial Insurance Underwriting',
  'Large Customer Risk Assessment',
  'Entity Due Diligence',
  'Third Party Risk Assessment',
];

// Validation: require at least one topic
const schema = z.object({
  topic: z.array(z.string()).min(1, 'Select at least one solution'),
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Please enter your company'),
  message: z.string().optional(),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  // no default selected topic
  const defaultValues: FormValues = {
    topic: [],
    name: '',
    email: '',
    company: '',
    message: '',
    website: '',
  } as FormValues;

  // smaller vertical spacing & sizes
  const form = useReactHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [spreeState, handleSpreeSubmit] = useFormspree('mnnbewpw');

  useEffect(() => {
    if (spreeState.succeeded) {
      form.reset(defaultValues);
    }
  }, [spreeState.succeeded]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- LIFTED state/ref/effect for topic dropdown (must not call hooks inside render) ---
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);
  // -------------------------------------------------------------------------------

  async function onSubmit(values: FormValues) {
    const topicString = Array.isArray(values.topic) ? values.topic.join(', ') : '';
    const payload = {
      name: values.name,
      email: values.email,
      company: values.company,
      topic: topicString,
      message: values.message ?? '',
      website: values.website ?? '',
    };

    await handleSpreeSubmit(payload as any);

    try {
      if (!spreeState.errors) {
        toast.success('Thanks! We will contact you soon.', {
          icon: <CircleCheck className="h-5 w-5 text-green-500" />,
        });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      // use the error so linter doesn't complain and so you have logging for debugging
      console.error(error);
      toast.error('Submission failed. Please try again later.');
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Reduced container padding */}
      <div className="p-3 sm:p-4 lg:p-5">
        <Form {...form}>
          {/* tighter vertical spacing */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Topic */}
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => {
                const toggle = (value: string) => {
                  const set = new Set(field.value || []);
                  if (set.has(value)) set.delete(value);
                  else set.add(value);
                  field.onChange(Array.from(set));
                };

                const selected = field.value || [];
                const maxShownPills = 1;
                const shown = selected.slice(0, maxShownPills);
                const remaining = selected.length - shown.length;

                return (
                  <div ref={rootRef}>
                    <FormItem>
                      {/* slightly smaller label */}
                      <FormLabel className="px-1 text-sm text-gray-700 dark:text-slate-200">
                        Select Solution
                      </FormLabel>

                      <div className="relative">
                        {/* Trigger: reduced height */}
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={open}
                          onClick={() => setOpen((s) => !s)}
                          className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <div className="w-full min-w-0 text-left">
                            {selected.length === 0 ? (
                              <span className="text-muted-foreground text-sm">
                                Selected Solution
                              </span>
                            ) : (
                              <div className="flex min-h-[1rem] items-center gap-2 overflow-hidden">
                                {shown.map((s) => (
                                  <span
                                    key={s}
                                    className="inline-flex max-w-full truncate rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-medium whitespace-pre-wrap text-slate-800 dark:bg-slate-700 dark:text-slate-100"
                                    title={s}
                                  >
                                    {s}
                                  </span>
                                ))}
                                {remaining > 0 && (
                                  <span className="text-xs text-slate-500">+{remaining} more</span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="ml-2 shrink-0 text-slate-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path
                                d="M6 9l6 6 6-6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </button>

                        {/* Dropdown panel: slightly smaller max height */}
                        {open && (
                          <div
                            role="listbox"
                            aria-multiselectable="true"
                            className="scrollbar-thin absolute z-50 mt-2 max-h-44 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800"
                          >
                            <div className="px-2">
                              {topics.map((t) => {
                                const checked = (field.value || []).includes(t);

                                return (
                                  <label
                                    key={t}
                                    className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 ${checked ? 'border-[var(--color-privue-600)] bg-[var(--color-privue-600)]/10' : ''}`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() => toggle(t)}
                                      className="h-4 w-4 rounded text-[var(--color-privue-600)] accent-[var(--color-privue-600)]"
                                    />
                                    <span
                                      className={`${checked ? 'text-[var(--color-privue-600)]' : 'text-slate-700 dark:text-slate-100'} text-sm`}
                                    >
                                      {t}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* inline error for topic */}
                      {form.formState.errors.topic?.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {String(form.formState.errors.topic.message)}
                        </p>
                      )}
                    </FormItem>
                  </div>
                );
              }}
            />

            {/* Single Name field (replaces first + last) */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="px-1 text-sm text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input className="h-9 rounded-md" placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email + Company */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-1 text-sm text-gray-700">Work Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-9 rounded-md"
                        type="email"
                        placeholder="Work Email"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-1 text-sm text-gray-700">Company</FormLabel>
                    <FormControl>
                      <Input className="h-9 rounded-md" placeholder="Company" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Message: smaller textarea */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="px-1 text-sm text-gray-700">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[70px] rounded-md"
                      placeholder="Let us know how we can help"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* honeypot (hidden) */}
            <input
              type="text"
              {...form.register('website')}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <p className="text-xs leading-relaxed text-gray-500">
              By submitting this form, you agree to our{' '}
              <a href="/privacy-policy" className="underline">
                Privacy Policy
              </a>
              .
            </p>

            <Button
              type="submit"
              className="h-10 w-full cursor-pointer rounded-md text-sm font-semibold text-white"
              disabled={spreeState.submitting}
            >
              {spreeState.submitting ? 'Sending...' : 'Send message'}
            </Button>

            <ValidationError errors={spreeState.errors} />
          </form>
        </Form>
      </div>
    </div>
  );
}
