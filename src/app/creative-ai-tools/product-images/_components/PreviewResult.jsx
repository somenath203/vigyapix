import Image from "next/image";

const PreviewResult = ({ generatedProductImage }) => {

  return (

    <div className="min-h-100 rounded-xl border-2 border-dashed flex items-center justify-center p-6">

      {generatedProductImage ? (
        <Image
          src={generatedProductImage}
          alt="Generated product"
          width={1024}
          height={1024}
          className="max-h-125 w-full rounded-lg object-contain"
        />
      ) : (
        <p className="text-center text-muted-foreground">
          Your generated product image will be displayed here.
        </p>
      )}

    </div>

  );
  
};

export default PreviewResult;
