export const Button = (props: Record<string, any>) => {
  return (
    <button
      className="text-[16px] tracking-widest bg-green-600 hover:bg-green-700 transition-colors mx-auto mt-4 px-2 p-1 spa rounded-lg"
      type={props.type}
    >
      {props.text}
    </button>
  );
};
