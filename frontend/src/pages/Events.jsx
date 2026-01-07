export default function Events() {
  const data = [
    { id: 1, title: "Konser Musik", date: "12 Desember 2025" },
    { id: 2, title: "Festival Kuliner", date: "20 Januari 2026" },
    { id: 3, title: "Seminar Teknologi", date: "5 Februari 2026" },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Daftar Event</h2>
      <div className="grid gap-4">
        {data.map(event => (
          <div key={event.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
