type DefaultElementProps = {
  children: JSX.Element;
} & HTMLParagraphElement;

const DefaultElement = ({ attributes, children }: DefaultElementProps) => {
  console.log({ children, attributes }, 'hai');
  return (
    <p {...attributes}>
      <code>{children}</code>
    </p>
  );
};

export default DefaultElement;
