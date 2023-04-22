interface ButtonProps {
  content: string;
}

const SubmitButton = ({ content }: ButtonProps) => {
  return (
    <button type="submit">{content}</button>
  );
}

export default SubmitButton;