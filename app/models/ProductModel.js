
class ProductModel{
    constructor(
      id,
        itemName,
        description,
        quantity,
        originalPrice,
        newPrice,
        expiryDate,
        tags,
        likes,
        views,
        classification,
        availability,
        stockThreshold
      ) {
        
        this.id=id
        this.itemName = itemName;
        this.description = description;
        this.quantity = quantity;
        this.originalPrice = originalPrice;
        this.newPrice = newPrice;
        this.expiryDate = expiryDate;
        this.tags = tags;
        this.likes = likes;
        this.views = views;
        this.classification = classification;
        this.availability = availability;
        this.stockThreshold=stockThreshold
      }

      static fromJSON(map) {
        const id = map.id || "";
        const vendorID = map.vendor_id || "";
        const createdAt = map.created_at || "";
        const itemName = map.item_name || "";
        const description = map.description || "";
        const quantity = map.quantity || 0;
        const originalPrice = map.original_price || 0.0;
        const newPrice = map.new_price || 0.0;
        const expiryDate = map.expiry_date || "";
        const tags = map.tags || [];
        const likes = map.likes || 0;
        const views = map.views || 0;
        const classification = map.classification || "";
        const availability = map.availability || "";
        const stockThreshold=map.stock_threshold || 0;
    
        return new ProductModel(
          id,
          vendorID,
          createdAt,
          itemName,
          description,
          quantity,
          originalPrice,
          newPrice,
          expiryDate,
          tags,
          likes,
          views,
          classification,
          availability,
          stockThreshold
        );
      }
}

export default ProductModel