import parse from "html-react-parser";

export const renderContent = (content: string) => {
    return parse(content, {
      replace: (domNode: any) => {
        if (domNode.name === "oembed" && domNode.attribs?.url) {
          const url = domNode.attribs.url;
          return (
            <iframe className="w-full max-w-sm h-64"
              title="Text Content"
              loading="lazy"
              width="100%"
              height="400"
              src={url.replace("youtu.be", "youtube.com/embed")}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          );
        }
      },
    });
  };