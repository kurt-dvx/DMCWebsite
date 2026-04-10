const events = [
  { day: "Jan 29", dayClass: "mon", icon: "📸", mission: "Carnival Warmup", desc: "Carnival content creation" },
  { day: "Feb 5", dayClass: "tue", icon: "🎞️", mission: "Video Editing Workshop", desc: "Edit with Adobe Premiere Pro" },
  { day: "Feb 12", dayClass: "wed", icon: "🌹", mission: "Love Bytes", desc: "Valentine's photoshoot" },
  { day: "Feb 26", dayClass: "thu", icon: "🎛️", mission: "Audio Production Workshop", desc: "Edit, mix and enhance your audio" },
  { day: "Mar 4", dayClass: "fri", icon: "🌎", mission: "IAC Cultural Exhibition", desc: "Collab with the IAC to provide media coverage" },
  { day: "Mar 12", dayClass: "sat", icon: "🎬", mission: "Stop Motion Animation", desc: "Create fun animations using inanimate objects" },
  { day: "Mar 19", dayClass: "sun", icon: "🎨", mission: "Pixel Art Workshop", desc: "Create cool pixel art" },
  { day: "Apr 29", dayClass: "mon", icon: "💻", mission: "Visual Vibes", desc: "Graphic Design Workshop - learn Canva and Affinity" },
  { day: "Open Date", dayClass: "tue", icon: "✨", mission: "Studio Field Trip", desc: "Trip to a AI studio, San Juan" },
];

const EventsCalendar = () => {
  return (
    <section className="events-section py-5 text-white">
      <div className="container mx-auto px-4">
        <div className="frosted-glass">
          <h3 className="text-3xl font-bold text-center mb-8">Calendar of Events</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {events.map((event, idx) => (
                <div key={idx} className="day-block">
                  <div className={`day-header ${event.dayClass}`}>{event.day}</div>
                  <div className="icon">{event.icon}</div>
                  <div className="mission">{event.mission}</div>
                  <small>{event.desc}</small>
                </div>
              ))}
              <div className="day-block">
                <div className="day-header wed">Open Date</div>
                <div className="icon">💡</div>
                <div className="mission">Make a Suggestion</div>
                <small>Have an idea for an event or activity?</small>
                <a
                  href="https://forms.gle/qNBXQkbcm1DqQff26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magenta mt-3 text-sm py-2 px-4"
                >
                  Suggest Here!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;