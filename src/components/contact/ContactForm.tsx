"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const schema = z.object({
    topic: z.string().min(1, "Please select a topic"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid work email"),
    company: z.string().optional(),
    message: z.string().min(1, "Please add a short message"),
    // honeypot to deter bots
    website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const topics = [
    "Pricing & savings",
    "Kubernetes security",
    "DevOps efficiency",
    "Partnerships",
    "Something else",
];

export default function ContactForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            topic: "",
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
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="px-1 text-[14px] text-gray-700">Select topic</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full h-11 rounded-md bg-white">
                                                <SelectValue placeholder="Select topic" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-[var(--radix-select-trigger-width)]">
                                            {topics.map((t) => (
                                                <SelectItem key={t} value={t}>{t}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
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
                            <a href="/privacy" className="underline">Privacy Policy</a>.
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
