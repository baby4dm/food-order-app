export default function Input({ name, label, ...props }) {
  return (
    <div className="control">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...props} />
    </div>
  );
}
