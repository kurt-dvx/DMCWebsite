const team = [
  ["Kurt Ranny", "President"],
  ["Shivesh Lall", "Vice President"],
  ["Jameel Ali", "Secretary"],
  ["Renata Paria", "Treasurer"],
  ["Sameera Ali", "Events Coordinator"],
  ["Issabelle John", "Marketing and Communications Officer"],
  ["Kelsie Simon", "Webmaster"],
  ["Nathan Nancoo", "Head of Photography"],
  ["Matthew Moodoo", "Head of Digital Art & Illustration"],
  ["Anthony Parag", "Head of Audio Production"],
  ["Jordan Smith", "Head of Video Production"],
  ["Aqilya Dominique", "Head of Graphic Design"],
];

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8">Meet the Executive Team 2025/2026</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {team.map(([name, role], idx) => (
            <div key={idx} className="member-card">
              <img
                src={role.includes("Head") || ["President", "Vice President", "Secretary", "Webmaster"].includes(role)
                  ? "https://cdn0.iconfinder.com/data/icons/professional-avatar-5/48/business_male_avatar_men_character_professions-512.png"
                  : "https://cdn4.iconfinder.com/data/icons/professional-avatar-5/48/seo_manager_avatar_women_woman_profile_character_professions_2-512.png"}
                className="member-photo"
                alt={name}
              />
              <h6 className="font-semibold">{name}</h6>
              <p className="text-sm text-white/80">{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;