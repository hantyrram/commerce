module.exports = {
   path : 'productcategories/:productCategory',
   method: 'delete',
   resource: 'ProductCategory',
   op: 'delete',
   serviceProvider: 'app/services/catalog/productcategory/delete',
   description: 'Delete Product Category',
}