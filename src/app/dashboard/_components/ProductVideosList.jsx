"use client";

import { useEffect, useState } from "react";

import PreviewVideo from "./PreviewVideo";


const ProductVideosList = ({ allVideoProducts }) => {

  const [productVideos, setProductVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getProductImages = async () => {

      try {

        setLoading(true);

        const videos = await allVideoProducts();

        setProductVideos(videos || []);

      } catch (error) {

        console.error("Error loading product videos:", error);

      } finally {

        setLoading(false);

      }

    };

    getProductImages();

  }, [allVideoProducts]);

  if (loading) {

    return <div>Loading product videos...</div>;

  }

  return (
    <div>

      {productVideos.length === 0 ? (

        <div>No Product Video Exists</div>

      ) : (

        <div>
          <PreviewVideo data={productVideos} />
        </div>

      )}

    </div>
  )
}

export default ProductVideosList;
