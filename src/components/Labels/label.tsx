export const Label = (props: Record<string, any>) => {
  return <label className="text-black" htmlFor={props.id}>{props.text}</label>;
};
