export const InputProducts = (props: Record<string, any>) => {
    return (
      <input
        className="p-1 outline-none border border-gray-600 rounded-md"
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        min={props.min}
        defaultValue={props.defaultValue}
      />
    );
  };