import ContactHero from "@/components/contact/ContactHero";
// import CalMeetingInline from "@/components/contact/CalMeetingInline";
import ContactForm from "@/components/contact/ContactForm";
import Layout from "@/components/Layout";

export default function ContactPage() {
    return (
        <Layout>
            <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-10 py-32 px-12">
                    <div >
                        <ContactHero />
                    </div>
                    <div>
                        <ContactForm />
                    </div>

                </div>
                {/* <div className=" mt-6 space-y-12">
                    <p className="text-[#525252] dark:text-gray-400 text-base md:text-lg">
                        Or Book a call directly with our founders
                    </p>
                    <CalMeetingInline />

                </div> */}
            </main>
        </Layout>
    );
}
