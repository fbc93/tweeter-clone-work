const ValidationText = ({ content }: { content?: string }) => {
  return (
    <div className="text-red-500 text-sm text-left pt-2">{content}</div>
  );
}
export default ValidationText;