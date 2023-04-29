import Image from "next/image";

interface ImagePreviewProps {
  imageFile?: Blob | MediaSource | undefined | null;
}

const ImagePreviewBox = ({ imageFile }: ImagePreviewProps) => {
  return (
    <div className="aspect-auto bg-slate-700 rounded-lg flex justify-center overflow-hidden">
      {imageFile ? (
        <Image
          src={URL.createObjectURL(imageFile)}
          width={300}
          height={300}
          className="w-auto h-auto"
          alt="preview image"
        />
      ) : (
        <div className="self-center text-gray-800">Image Preview</div>
      )}
    </div>
  );
}

export default ImagePreviewBox;