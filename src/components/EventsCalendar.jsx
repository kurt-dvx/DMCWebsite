import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const colorCycle = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export default function EventsCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const eventsList = [];
        snapshot.forEach((doc) => {
          eventsList.push({ id: doc.id, ...doc.data() });
        });

        // Sort events chronologically (as above)
        eventsList.sort((a, b) => {
          const dateA = a.day || a.date || "";
          const dateB = b.day || b.date || "";

          const isOpenA = dateA.toLowerCase().includes("open");
          const isOpenB = dateB.toLowerCase().includes("open");
          if (isOpenA && !isOpenB) return 1;
          if (!isOpenA && isOpenB) return -1;
          if (isOpenA && isOpenB) return 0;

          const parseDate = (dateStr) => {
            const months = {
              jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
              jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
            };
            const parts = dateStr.split(" ");
            if (parts.length >= 2) {
              const month = months[parts[0].toLowerCase().substring(0, 3)];
              const day = parseInt(parts[1], 10);
              if (month !== undefined && !isNaN(day)) {
                return new Date(2025, month, day);
              }
            }
            return null;
          };

          const parsedA = parseDate(dateA);
          const parsedB = parseDate(dateB);
          if (parsedA && parsedB) return parsedA - parsedB;
          if (parsedA && !parsedB) return -1;
          if (!parsedA && parsedB) return 1;
          return dateA.localeCompare(dateB);
        });

        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-gradient-to-r from-[#1f1c2c] to-[#6a2c80] border-y border-gray-700 py-10 text-white">
      <div className="w-full max-w-[1400px] mx-auto px-6 pb-14">
        <h3 className="text-3xl font-bold text-center mb-8">
          Calendar of Events
        </h3>

        <div className="frosted-glass overflow-x-auto pb-20">
          <div className="flex gap-4 min-w-max">
            {loading ? (
              <div className="flex-shrink-0 w-[220px] bg-white/10 rounded-xl p-6 text-center">
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div className="flex-shrink-0 w-[220px] bg-white/10 rounded-xl p-6 text-center">
                No events scheduled yet.
              </div>
            ) : (
              events.map((event, idx) => {
                const colorClass = colorCycle[idx % colorCycle.length];
                return (
                  <div
                    key={event.id}
                    className="flex-shrink-0 w-[220px] bg-white/10 rounded-xl p-6 flex flex-col text-center"
                  >
                    <div className={`day-header ${colorClass}`}>
                      {event.day || event.date}
                    </div>
                    <div className="icon">{event.icon || "📅"}</div>
                    <div className="mission">{event.mission || event.title}</div>
                    <small className="text-gray-300">{event.desc || event.description}</small>
                  </div>
                );
              })
            )}

            <div className="flex-shrink-0 w-[220px] bg-white/10 rounded-xl p-6 flex flex-col text-center">
              <div className="day-header wed">Open Date</div>
              <div className="icon">💡</div>
              <div className="mission">Make a Suggestion</div>
              <small className="text-gray-300 mb-3">
                Have an idea for an event or activity?
              </small>
              <a
                href="https://forms.gle/qNBXQkbcm1DqQff26"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 hover:bg-pink-600 text-white text-sm py-2 px-4 rounded transition"
              >
                Suggest Here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}