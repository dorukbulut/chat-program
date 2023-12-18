const styling = {
  other: {
    fouter: "flex flex-row",
    finer:
      "bg-indigo-700 p-3 space-y-1 rounded-tl-lg rounded-tr-lg rounded-br-lg m-2 w-1/5",
  },
  me: {
    fouter: "flex flex-row justify-end",
    finer:
      "bg-green-700 p-3 space-y-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg m-2 w-1/5",
  },
};

export default function Message({ content }) {
  return (
    <div className={styling[content?.type]["fouter"]}>
      <div className={styling[content?.type]["finer"]}>
        <p className="text-sm text-white font-bold">
          {content.name + " " + content.surname}
        </p>
        <p className="break-words text-md text-white font-bold">
          {content.content}
        </p>
        <div className="flex justify-end">
          <span className="text-sm text-white">{content.time}</span>
        </div>
      </div>
    </div>
  );
}
