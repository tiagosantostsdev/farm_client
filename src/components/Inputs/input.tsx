export const Input = (props: Record<string, any>) => {
  return (
    <input
      className="h-12 px-2 outline-none focus:outline-cyan-800 border-gray-600 rounded-md"
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
    />
  );
};
