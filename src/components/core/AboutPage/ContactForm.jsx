import ContactUsForm from "../../ContactPages/ContactUsForm";

export default function ContactForm() {
  return (
    <div className="flex flex-col gap-4 mx-auto mb-20 items-center">
      <div className="flex items-center text-center">
        <h1 className="text-3xl font-semibold ">Get in Touch</h1>
        <p>We had love to here for you, please fill out this form.</p>
      </div>
      <div>
        <ContactUsForm />
      </div>
    </div>
  );
}
