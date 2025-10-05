import ContactHero from '@/components/contact/ContactHero';
// import CalMeetingInline from '@/components/contact/CalMeetingInline';
import ContactForm from '@/components/contact/ContactForm';
import Layout from '@/components/Layout';

export default function ContactPage() {
  return (
    <Layout>
      <main className="mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-24 px-12 pt-24">
          <div>
            <ContactHero />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
        {/* <div className="mt-20 space-y-6 px-2">
          <p className="text-base leading-snug font-medium text-gray-700 md:text-lg dark:text-gray-300">
            Or <span className="text-[var(--color-privue-600)]">book a call</span> directly with our
            founders
          </p>
          <CalMeetingInline />
        </div> */}
      </main>
    </Layout>
  );
}
