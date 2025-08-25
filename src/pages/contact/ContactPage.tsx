import ContactHero from "@/components/contact/ContactHero";
import CalMeetingInline from "@/components/contact/CalMeetingInline";
import ContactForm from "@/components/contact/ContactForm";
import Layout from "@/components/Layout";

export default function ContactPage() {
    return (
        <Layout>
            <main className="min-h-screen mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto text-center px-14 py-16">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#171717] mb-2">
                        Contact <span className="">Us</span>
                    </h1>
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg">
                        We are here to help you with any questions or concerns you may have.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-10 mt-6">
                    <div >
                        <ContactHero />
                    </div>
                    <div>

                        <ContactForm />
                    </div>

                </div>
                <div className=" mt-6 space-y-12">
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg">
                        Or Book a call directly with our founders
                    </p>
                    <CalMeetingInline />

                </div>
            </main>
        </Layout>
    );
}
