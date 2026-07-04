export default function Button({
  children,
  textOnly,
  className,
  onClick,
  ...props
}) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;
  return (
    <button onClick={onClick} className={cssClasses} {...props}>
      {children}
    </button>
  );
}
