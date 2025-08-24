import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // optional helper if you have it

import Layout from "@/components/Layout";

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid company email"),
    interest: z.string().min(1, "Please share what you're looking to accomplish"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            interest: "",
        },
    });

    function onSubmit(values: FormValues) {
        // TODO: send to your API
        console.log("Contact form:", values);
    }

    return (
        <Layout>
            <main className="min-h-screen  justify-center items-center my-auto mx-auto max-w-7xl px-4 py-48">
                <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {/* Left copy / testimonial */}
                    <section className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
                                Talk to our Sales team
                            </h1>
                            <p className="mt-4 max-w-xl text-neutral-600 md:text-lg">
                                Book a demo and set up a trial Enterprise account to see how our scalable AI
                                capabilities can accelerate your growth and simplify risk-aware development.
                            </p>
                        </div>

                        <div className="mt-16">
                            <figure>
                                <blockquote className="text-lg leading-relaxed text-neutral-900 md:text-xl">
                                    “My biggest regret is not having gone with Privue from the beginning.”
                                </blockquote>
                                <figcaption className="mt-3 text-sm text-neutral-500">
                                    Jakob Steinn, Co-founder & Tech Lead, Good Tape
                                </figcaption>
                            </figure>

                            <Separator className="my-8" />

                            {/* <div className="flex items-center gap-8 opacity-80">
                                <img
                                    src="https://dummyimage.com/120x32/000/fff&text=Good+Tape"
                                    alt="Good Tape"
                                    className="h-6 w-auto grayscale"
                                />
                                <img
                                    src="https://dummyimage.com/100x32/000/fff&text=xendit"
                                    alt="Xendit"
                                    className="h-6 w-auto grayscale"
                                />
                                <img
                                    src="https://dummyimage.com/120x32/000/fff&text=Chatbase"
                                    alt="Chatbase"
                                    className="h-6 w-auto grayscale"
                                />
                            </div> */}
                        </div>
                    </section>

                    {/* Right form card */}
                    <section className="md:pl-2">
                        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
                            <div className="p-4 md:p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="First Name" {...field} />
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
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Last Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Company Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="interest"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>What are you interested in?</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            rows={5}
                                                            placeholder="Share more about what you want to accomplish"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Separator className="!my-5" />

                                        <Button
                                            type="submit"
                                            className={cn(
                                                "h-11 w-full rounded-lg text-base font-medium",
                                                "bg-privue-600 hover:bg-privue-700 text-white"
                                            )}
                                        >
                                            Request a demo
                                        </Button>

                                        <p className="px-1 text-xs text-neutral-500">
                                            By submitting this form, I confirm that I have read and understood the{" "}
                                            <a href="/privacy" className="underline underline-offset-2 hover:text-neutral-700">
                                                Privacy Policy
                                            </a>
                                            .
                                        </p>
                                    </form>
                                </Form>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm text-neutral-500">
                            Contact <a href="mailto:support@yourco.com" className="underline underline-offset-2">support</a> if you need technical help
                        </p>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
