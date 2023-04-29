interface YoutubePreviewProps {
  youtubeUrl: string | undefined;
}

const YoutubePreviewBox = ({ youtubeUrl }: YoutubePreviewProps) => {
  return (
    <div className="bg-slate-700 rounded-md overflow-hidden flex justify-center aspect-video">
      {youtubeUrl ? (
        <div>
          <iframe
            className="block aspect-video"
            width="100%"
            height="100%"
            src={youtubeUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen={true}
          />
        </div>
      ) : (
        <div className="self-center text-gray-800">Youtube Preview</div>
      )}
    </div>
  );
}

export default YoutubePreviewBox;