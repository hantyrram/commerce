const Api_List = require('./Api_List');
const Auth$Login_Exec = require('./Auth$Login_Exec');
const Auth$Logout_Exec = require('./Auth$Logout_Exec');
const Employee_Add = require('./Employee_Add')
const Employee_List = require('./Employee_List');
const Employee_Edit = require('./Employee_Edit');
const Employee_Read = require('./Employee_Read');
const Employee$Photo_Edit = require('./Employee$Photo_Edit');
const Employee$Photo_Read = require('./Employee$Photo_Read');
const Employee$UserAccount_Read = require('./Employee$UserAccount_Read');
const Employee$UserAccount$Credential_Read = require('./Employee$UserAccount$Credential_Read');
const Employee$UserAccount$Credential_Create = require('./Employee$UserAccount$Credential_Create');
const Employee$UserAccount$Credential$Generate_Exec = require('./Employee$UserAccount$Credential$Generate_Exec');
const Employee$UserAccount$Credential$Password_Edit = require('./Employee$UserAccount$Credential$Password_Edit');
const Employee$UserAccount$Credential$Revoke_Exec = require('./Employee$UserAccount$Credential$Revoke_Exec');
const Employee$UserAccount$Role_Add = require('./Employee$UserAccount$Role_Add');
const Employee$UserAccount$Role_List = require('./Employee$UserAccount$Role_List');
const Employee$UserAccount$Role_Remove = require('./Employee$UserAccount$Role_Remove');
const Employee$Verify_Exec = require('./Employee$Verify_Exec');
const Permission_List = require('./Permission_List');
const Product_Create = require('./Product_Create');
const Product_Edit = require('./Product_Edit');
const Product_List = require('./Product_List');
const ProductAttribute_Create = require('./ProductAttribute_Create');
const ProductAttribute_Delete = require('./ProductAttribute_Delete');
const ProductAttribute_List = require('./ProductAttribute_List');
const ProductAttribute$Term_Add = require('./ProductAttribute$Term_Add');
const ProductAttribute$Term_Remove = require('./ProductAttribute$Term_Remove');
const ProductCategory_Create = require('./ProductCategory_Create');
const ProductCategory_Delete = require('./ProductCategory_Delete');
const ProductCategory_List = require('./ProductCategory_List');
const Role_Create = require('./Role_Create');
const Role_Delete = require('./Role_Delete');
const Role_List = require('./Role_List');
const Role_Read = require('./Role_Read');
const Role$Permission_Edit = require('./Role$Permission_Edit');
const Role$Permission_List = require('./Role$Permission_List');
const StoreSetting$Basic_Edit = require('./StoreSetting$Basic_Edit');
const StoreSetting$Tax_Edit = require('./StoreSetting$Tax_Edit');
const Util$ExtData$Country_List = require('./Util$ExtData$Country_List');
const Util$ExtData$CountryState_List = require('./Util$ExtData$CountryState_List');
const Util$ExtData$CountryCity_List = require('./Util$ExtData$CountryCity_List');
const StoreSetting_List = require('./StoreSetting_List');
const StoreSetting$Shipping$ShippingZone_Add = require('./StoreSetting$Shipping$ShippingZone_Add');
const Util$ExtData$PSGC_Read = require('./Util$ExtData$PSGC_Read');
const StoreSetting$Shipping$ShippingOrigin_Edit = require('./StoreSetting$Shipping$ShippingOrigin_Edit');
const StoreSetting$Shipping$ShippingZone_List = require('./StoreSetting$Shipping$ShippingZone_List');
const StoreSetting$Shipping$ShippingZone_Edit = require('./StoreSetting$Shipping$ShippingZone_Edit');
const StoreSetting$Shipping$ShippingZone$ShippingMethod_Add  = require('./StoreSetting$Shipping$ShippingZone$ShippingMethod_Add');
const Search_Exec = require('./Search_Exec');
module.exports = [
   Api_List,
   Auth$Login_Exec,
   Auth$Logout_Exec,
   Employee_List,
   Employee_Add,
   Employee_Edit,
   Employee_Read,
   Employee$Photo_Edit,
   Employee$Photo_Read,
   Employee$UserAccount_Read,
   Employee$UserAccount$Credential_Read,
   Employee$UserAccount$Credential_Create,
   Employee$UserAccount$Credential$Generate_Exec,
   Employee$UserAccount$Credential$Password_Edit,
   Employee$UserAccount$Credential$Revoke_Exec,
   Employee$UserAccount$Role_Add,
   Employee$UserAccount$Role_List,
   Employee$UserAccount$Role_Remove,
   Employee$Verify_Exec,
   Permission_List,
   Product_Create,
   Product_Edit,
   Product_List,
   ProductAttribute_Create,
   ProductAttribute_Delete,
   ProductAttribute_List,
   ProductAttribute$Term_Add,
   ProductAttribute$Term_Remove,
   ProductCategory_Create,
   ProductCategory_Delete,
   ProductCategory_List,
   Role_Create,
   Role_Delete,
   Role_List,
   Role_Read,
   Role$Permission_Edit,
   Role$Permission_List,
   StoreSetting_List,
   StoreSetting$Basic_Edit,
   StoreSetting$Tax_Edit,
   Util$ExtData$Country_List,
   Util$ExtData$CountryState_List,
   Util$ExtData$CountryCity_List,
   StoreSetting$Shipping$ShippingZone_Add,
   StoreSetting$Shipping$ShippingZone_Edit,
   StoreSetting$Shipping$ShippingZone_List,
   StoreSetting$Shipping$ShippingZone$ShippingMethod_Add,
   Util$ExtData$PSGC_Read,
   StoreSetting$Shipping$ShippingOrigin_Edit,
   Search_Exec
  ]
  