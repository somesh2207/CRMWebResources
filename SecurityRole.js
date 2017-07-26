function CheckUserRole() {
    // GUID of the custom role that you created.
    var CustomViewOnlyRoleId = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX";


    var returnValue = false;

    // Get all the roles of the Logged in User.
    var currentUserRoles = Xrm.Page.context.getUserRoles();

    // Get the Parent roles for each, and then compare.
    GetParentRoles(currentUserRoles, function (result) {
        debugger;
        for (var i = 0; i < result.value.length; i++) {
            if (result.value[i]["_parentrootroleid_value"].toLowerCase() == CustomViewOnlyRoleId.toLowerCase())
                returnValue = true;
        }
    }, function (error) {
        alert(error);
    }
    );

    return returnValue;
}

function GetParentRoles(roles, successCallback, errorCallback) {

    var fetchXml = '';
    fetchXml += '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">';
    fetchXml += '<entity name="role">';
    fetchXml += '   <attribute name="name" />';
    fetchXml += '   <attribute name="businessunitid" />';
    fetchXml += '   <attribute name="roleid" />';
    fetchXml += '   <attribute name="parentrootroleid" />';
    fetchXml += '   <order attribute="name" descending="false" />';
    fetchXml += '   <filter type="or">';
    for (var cnt = 0; cnt < roles.length; cnt++) {
        fetchXml += '       <condition attribute="roleid" operator="eq" value="{' + roles[cnt] + '}" />';
    }
    fetchXml += '   </filter>';
    fetchXml += '</entity>';
    fetchXml += '</fetch > ';

    MK.WebAPI.Retrieve("roles", null, fetchXml, null, successCallback, errorCallback, true, null, null, false);

}
