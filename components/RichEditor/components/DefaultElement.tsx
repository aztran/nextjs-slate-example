type DefaultElementProps = {
  children: JSX.Element;
} & HTMLParagraphElement;

const DefaultElement = ({ attributes, children }: DefaultElementProps) => {
  return (
    <p {...attributes}>
      <code>{children}</code>
    </p>
  );
};

export default DefaultElement;
