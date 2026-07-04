export default function Error({ title, description }) {
  return (
    <section className="error">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
