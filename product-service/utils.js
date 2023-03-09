const mergeProductWithStock = (productData, stockData) => {
    return {
        id: productData.id,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        count: (stockData && stockData.count) || 0,
    };
}

const splitProductWithStock = (productWithStock) => {
    return {
        product: {
            id: productWithStock.id,
            title: productWithStock.title,
            description: productWithStock.description,
            price: productWithStock.price,
        },
        stock: {
            product_id: productWithStock.id,
            count: productWithStock.count || 0,
        }
    };
}

module.exports = {
    mergeProductWithStock, splitProductWithStock
}