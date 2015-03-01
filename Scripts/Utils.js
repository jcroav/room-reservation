var MyApp = MyApp || {};

MyApp.AppSPUtils = function () {

    var GetParameter = function (paramToRetrieve) {
        var params =
                document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve)
                return decodeURIComponent(singleParam[1]);
        }
    }

    var RenderChrome = function (appName) {

        var siteActivityLanguage = GetParameter("SPLanguage");

        // The Help, Account and Contact pages receive the 
        //   same query string parameters as the main page
        var options = {
            "appTitle": appName,
            "language": siteActivityLanguage
        };

        var nav = new SP.UI.Controls.Navigation("chrome_ctrl_placeholder", options);
        nav.setVisible(true);
    }

    return {
        UTCDelayConvert: function(delay){
            return delay * (-1) / 60;
        },

        GetQueryStringParameter : function(paramToRetrieve) {
            return GetParameter(paramToRetrieve);
        },

        RedirectApp : function (page) {
            window.open(page + "?" + document.URL.split("?")[1], "_self");

        },

        RenderAppNav: function (appName) {
            RenderChrome(appName);
        }

        
    }
}();