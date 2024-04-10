class OrderItemModel {
  constructor(id, orderId, productId, itemName, quantity, price, createdAt) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.itemName = itemName;
    this.price = price;
    this.createdAt = createdAt;
  }
  static fromJSON(map) {
    const id = map.id || "";
    const orderId = map.order_id || "";
    const productId = map.product_id || "";
    const quantity = map.quantity || 0;
    const itemName = map["products"]?.item_name || "";
    const price = map.price || 0;
    const createdAt = map.createdAt || "";
    return new OrderModel(
      id,
      orderId,
      quantity,
      price,
      createdAt,
      productId,
      itemName
    );
  }
}
