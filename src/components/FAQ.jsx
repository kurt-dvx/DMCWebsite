const faqs = [
  { q: "Who can join the Digital Media Club?", a: "Any registered student at the UWI St Augustine Campus is welcome to join!" },
  { q: "Do I need prior experience?", a: "Nope! We welcome beginners and offer workshops to help you grow your skills." },
  { q: "When and where are meetings held?", a: "Meetings are typically held on Thursday's from 2:00 to 4:00PM in FHE SB4. You can check the calendar for specific dates and times as well as look out for announcements on our Instagram page and Whatsapp GC." },
];

const FAQ = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto max-w-3xl px-4">
        <h3 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white rounded-lg shadow" open={idx === 0}>
              <summary className="font-semibold p-4 cursor-pointer list-none">{faq.q}</summary>
              <p className="px-4 pb-4 text-gray-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;