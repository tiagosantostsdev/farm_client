export const Label = (props: Record<string, any>) => {
  return <label className="text-black max-md:text-sm" htmlFor={props.id}>{props.text}</label>;
};
