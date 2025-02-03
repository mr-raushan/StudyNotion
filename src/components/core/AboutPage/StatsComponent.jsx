const Stats = [
  { count: "5k", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

export default function StatsComponent() {
  return (
    <section>
      <div>
        <div className="flex items-center justify-evenly ">
          {Stats.map((stat, index) => {
            return (
              <div key={index}>
                <h1 className="text-2xl">{stat.count}</h1>
                <p className="text-xl">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
