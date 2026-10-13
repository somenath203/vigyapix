"use client";

import { useEffect, useState } from "react";

import PreviewImage from "./PreviewImage";


const ProductImagesList = ({ allImageWithAvatarProducts }) => {

  const [productImages, setProductImages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getProductImages = async () => {

      try {

        setLoading(true);

        const images = await allImageWithAvatarProducts();

        setProductImages(images || []);

      } catch (error) {

        console.error("Error loading product images:", error);

      } finally {

        setLoading(false);

      }

    };

    getProductImages();

  }, [allImageWithAvatarProducts]);

  if (loading) {

    return <div>Loading product images...</div>;

  }

  return (
    <div>

      {productImages.length === 0 ? (

        <div>No Product Exists</div>

      ) : (

        <div>
          <PreviewImage data={productImages} />
        </div>

      )}

    </div>

  );

};


export default ProductImagesList;
