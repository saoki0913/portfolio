import { ContactForm } from '@/components/ContactForm'

export const Contact = () => {
    return (
        <section id="contact" className="mt-24 md:mt-28 py-12 md:py-20 px-4 md:px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-medium mb-12 md:mb-20">Contact</h2>
                <div className="max-w-3xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </section>
    )
} 
