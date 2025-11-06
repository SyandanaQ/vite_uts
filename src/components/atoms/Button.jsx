export default function Button({ text, onClick, type = "button", color = "blue" }) {
  const colorClass = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
  }[color];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colorClass} text-white px-4 py-2 rounded-lg shadow-md transition`}
    >
      {text}
    </button>
  );
}
