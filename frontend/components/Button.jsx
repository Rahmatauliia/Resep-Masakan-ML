export default function Button({ children, className, type }) {
  return (
    <button
      type={type}
      className={
        "bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-semibold" +
        className
      }
    >
      {children}
    </button>
  );
}
