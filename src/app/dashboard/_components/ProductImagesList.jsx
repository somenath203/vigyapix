const ProductImagesList = ({ allImageProducts }) => {
  return (
    <div>
      
      {allImageProducts && allImageProducts?.length === 0 ? (
        <div>
          No Product Exists
        </div>
      ) : (
        <div>
          Product Exists
        </div>
      )}
      
    </div>
  )
}

export default ProductImagesList;
