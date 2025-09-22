import ContactHero from "@/components/contact/ContactHero";
import CalMeetingInline from "@/components/contact/CalMeetingInline";
import ContactForm from "@/components/contact/ContactForm";
import Layout from "@/components/Layout";

export default function ContactPage() {
    return (
        <Layout>
            <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-10 pt-24 px-12">
                    <div >
                        <ContactHero />
                    </div>
                    <div>
                        <ContactForm />
                    </div>

                </div>
                <div className=" mt-8 px-12 space-y-6">
                    <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-medium  leading-snug">
                        Or <span className="text-[var(--color-privue-600)]">book a call</span> directly with our founders
                    </p>
                    <CalMeetingInline />

                </div>
            </main>
        </Layout>
    );
}
