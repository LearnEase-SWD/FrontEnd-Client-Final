type Props = {
  tags: string[];
};

export const TagList = ({ tags }: Props) => {
  return (
    <div className="mt-8 flex items-center">
      <h2 className="text-lg font-semibold">Tag:</h2>
      {tags.map((tag, index) => (
        <div
          key={index}
          className="px-3 py-2 mx-2 border border-gray-200 rounded-lg"
        >
          {tag} 
        </div>
      ))}
    </div>
  );
};
