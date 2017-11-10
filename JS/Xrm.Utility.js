var D365V9 = {};

/// This Event is Set to trigger on change of Probability. This can be updated as per requirements.
D365V9.ShowProgress = function () {
    Xrm.Utility.showProgressIndicator("Performing Custom Operations in Background. Please Wait..");
    window.setTimeout(function () {
        /// For demo, I am using Timeout of 4secs, to close the progress Indicator
        Xrm.Utility.closeProgressIndicator();
    }, 4000);
}

D365V9.DisplayLookUpControl = function () {

    var lookupOptions = {
        allowMultiSelect: true,
        defaultEntityType: "account",
        defaultViewId: "00000000-0000-0000-00AA-000010001002",
        entityTypes: ["account", "contact"],
        viewIds: ["00000000-0000-0000-00AA-000010001002", "B18E750A-857B-49C5-8C4E-851EBC857E24","00000000-0000-0000-00AA-000010001001" ],
        showBarcodeScanner: false

    };

    debugger;
    Xrm.Utility.lookupObjects(lookupOptions).then(function (lookupData) {
        debugger;
        var entityType = lookupData.entityType;
        var id = lookupData.id;
        var name = lookupData.name;

    }, function (cancelData) {
        debugger;
        var cData = cancelData;
    });

}
