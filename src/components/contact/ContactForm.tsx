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


const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid company email"),
    interest: z.string().min(1, "Please share what you're looking to accomplish"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
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
        <>
            <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
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
        </>
    )
}
