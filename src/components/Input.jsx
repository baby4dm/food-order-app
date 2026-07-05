export default function Input({ name, label }) {
  return (
    <div className="control">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} required />
    </div>
  );
}
