"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";

// schema: topic now an array of strings
const schema = z.object({
    topic: z.array(z.string()).min(1, "Please select at least one topic"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid work email"),
    company: z.string().optional(),
    message: z.string().min(1, "Please add a short message"),
    website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;


const topics = [
    "Distributor Performance Management",
    "Sustainability Assessment",
    "Commercial Insurance Underwriting",
    "Large Customer Risk Assessment",
    "Entity Due Diligence",
    "Third Party Risk Assessment",
];

export default function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            topic: [], // now an array
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            message: "",
            website: "",
        },
    });


    async function onSubmit(values: FormValues) {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        if (!res.ok) {
            const { error } = await res.json().catch(() => ({ error: "Something went wrong" }));
            throw new Error(error);
        }
        form.reset();
        // optionally toast success
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-6 lg:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Topic */}
                        {/* Topic - multi-select as checkbox group */}
                        {/* Topic - dropdown multi-select */}
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => {
                                const [open, setOpen] = useState(false);
                                const rootRef = useRef<HTMLDivElement | null>(null);

                                // toggle value in the array
                                const toggle = (value: string) => {
                                    const set = new Set(field.value || []);
                                    if (set.has(value)) set.delete(value);
                                    else set.add(value);
                                    field.onChange(Array.from(set));
                                };

                                // close on outside click
                                useEffect(() => {
                                    function onDocClick(e: MouseEvent) {
                                        if (!rootRef.current) return;
                                        if (!rootRef.current.contains(e.target as Node)) setOpen(false);
                                    }
                                    function onEsc(e: KeyboardEvent) {
                                        if (e.key === "Escape") setOpen(false);
                                    }
                                    document.addEventListener("mousedown", onDocClick);
                                    document.addEventListener("keydown", onEsc);
                                    return () => {
                                        document.removeEventListener("mousedown", onDocClick);
                                        document.removeEventListener("keydown", onEsc);
                                    };
                                }, []);

                                const selected = field.value || [];

                                return (
                                    <FormItem ref={rootRef}>
                                        <FormLabel className="px-1 text-[14px] text-gray-700 dark:text-slate-200">
                                            Select Solution(s)
                                        </FormLabel>

                                        <div className="relative">
                                            {/* Trigger */}
                                            <button
                                                type="button"
                                                aria-haspopup="listbox"
                                                aria-expanded={open}
                                                onClick={() => setOpen((s) => !s)}
                                                className="w-full flex items-center justify-between px-3 py-2 h-11 rounded-md border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                            >
                                                <div className="text-left">
                                                    {selected.length === 0 ? (
                                                        <span className="text-sm text-slate-400">Select Solution(s)</span>
                                                    ) : selected.length === 1 ? (
                                                        <span className="text-sm text-slate-700 dark:text-slate-100">{selected[0]}</span>
                                                    ) : (
                                                        <span className="text-sm text-slate-700 dark:text-slate-100">
                                                            {selected.join(", ")}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="ml-2 text-slate-400">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                            {/* Dropdown panel */}
                                            {open && (
                                                <div
                                                    role="listbox"
                                                    aria-multiselectable="true"
                                                    className="absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-md border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg py-2"
                                                >
                                                    <div className="px-2">
                                                        {topics.map((t) => {
                                                            const checked = selected.includes(t);
                                                            return (
                                                                <label
                                                                    key={t}
                                                                    className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700
                        ${checked ? "bg-[var(--color-privue-600)]/10 border-[var(--color-privue-600)]" : ""}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checked}
                                                                        onChange={() => toggle(t)}
                                                                        className="h-4 w-4 rounded text-[var(--color-privue-600)] accent-[var(--color-privue-600)]"
                                                                    />
                                                                    <span className={`${checked ? "text-[var(--color-privue-600)]" : "text-slate-700 dark:text-slate-100"} text-sm`}>
                                                                        {t}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* footer with actions */}
                                                    <div className="mt-2 border-t border-slate-100 dark:border-slate-700 px-2 py-2 flex items-center justify-between gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // clear selection
                                                                field.onChange([]);
                                                            }}
                                                            className="text-sm text-slate-500 hover:underline"
                                                        >
                                                            Clear
                                                        </button>

                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    // close and keep selection
                                                                    setOpen(false);
                                                                }}
                                                                className="px-3 py-1 rounded-md text-sm bg-slate-50 dark:bg-slate-700"
                                                            >
                                                                Done
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* tiny summary + validation message */}
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="text-xs text-slate-500">
                                                {selected.length > 0 ? `${selected.length} selected` : "No topics selected"}
                                            </div>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                );
                            }}
                        />


                        {/* Names */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="px-1 text-[14px] text-gray-700">First name</FormLabel>
                                        <FormControl>
                                            <Input className="h-11 rounded-md" placeholder="Siddharth" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="px-1 text-[14px] text-gray-700">Last name</FormLabel>
                                        <FormControl>
                                            <Input className="h-11 rounded-md" placeholder="Aasal" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email + Company */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="px-1 text-[14px] text-gray-700">Work email</FormLabel>
                                        <FormControl>
                                            <Input className="h-11 rounded-md" type="email" placeholder="siddharth@privue.in" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="px-1 text-[14px] text-gray-700">Company</FormLabel>
                                        <FormControl>
                                            <Input className="h-11 rounded-md" placeholder="Privue" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="px-1 text-[14px] text-gray-700">Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[100px] rounded-md"
                                            placeholder="Let us know how we can help"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* honeypot (hidden) */}
                        <input type="text" {...form.register("website")} className="hidden" tabIndex={-1} autoComplete="off" />

                        <p className="text-xs text-gray-500 leading-relaxed">
                            By submitting this form, you acknowledge and agree that we will process your personal
                            information in accordance with the{" "}
                            <a href="/privacy-policy" className="underline">Privacy Policy</a>.
                        </p>

                        <Button type="submit" className="text-white cursor-pointer h-12 w-full rounded-md text-base font-semibold">
                            Send message
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
