/* global angular, google */
(function(){
    angular.module('googlechart')
        .factory('FormatManager', formatManagerFactory);
        
        function formatManagerFactory(){
            // Handles the processing of Google Charts API Formats
            function FormatManager($google){
                var self = this;
                var oldFormatTemplates = {};
                self.iFormats = {}; // Holds instances of formats (ie. self.iFormats.date[0] = new $google.visualization.DateFormat(params))
                self.applyFormats = applyFormats;
                
                // apply formats of type to datatable
                function apply(tFormats, dataTable){
                    var i, formatType;
                    for (formatType in tFormats){
                        if (tFormats.hasOwnProperty(formatType)){
                            for (i = 0; i < self.iFormats[formatType].length; i++) {
                                if (tFormats[formatType][i].columnNum < dataTable.getNumberOfColumns()) {
                                    self.iFormats[formatType][i].format(dataTable, tFormats[formatType][i].columnNum);
                                }
                            }
                        }
                    }
                }
                
                function applyFormat(formatType, FormatClass, tFormats){
                    var i;
                    if (angular.isArray(tFormats[formatType])) {
                        // basic change detection; no need to run if no changes
                        if (!angular.equals(tFormats[formatType], oldFormatTemplates[formatType])) {
                            oldFormatTemplates[formatType] = tFormats[formatType];
                            self.iFormats[formatType] = [];
            
                            if (formatType === 'color') {
                                instantiateColorFormatters(tFormats);
                            } else {
                                for (i = 0; i < tFormats[formatType].length; i++) {
                                    self.iFormats[formatType].push(new FormatClass(
                                        tFormats[formatType][i])
                                    );
                                }
                            }
                        }
                    }
                }
                
                function applyFormats(dataTable, tFormats, customFormatters) {
                    var formatType, FormatClass, requiresHtml = false;
                    if (!angular.isDefined(tFormats) || !angular.isDefined(dataTable)){
                        return { requiresHtml: false };
                    }
                    for (formatType in tFormats){
                        if (tFormats.hasOwnProperty(formatType)){
                            FormatClass = getFormatClass(formatType, customFormatters);
                            if (!angular.isFunction(FormatClass)){
                                // if no class constructor was returned,
                                // there's no point in completing cycle
                                continue;
                            }
                            applyFormat(formatType, FormatClass, tFormats);
                            
                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color') {
                                requiresHtml = true;
                            }
                        }
                    }
                    apply(tFormats, dataTable);
                    return { requiresHtml: requiresHtml };
                }
                
                function instantiateColorFormatters(tFormats){
                    var t, colorFormat, i, data, formatType = 'color';
                    for (t = 0; t < tFormats[formatType].length; t++) {
                        colorFormat = new $google.visualization.ColorFormat();

                        for (i = 0; i < tFormats[formatType][t].formats.length; i++) {
                            data = tFormats[formatType][t].formats[i];

                            if (typeof (data.fromBgColor) !== 'undefined' && typeof (data.toBgColor) !== 'undefined') {
                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor);
                            } else {
                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor);
                            }
                        }

                        self.iFormats[formatType].push(colorFormat);
                    }
                }
                
                function getFormatClass(formatType, customFormatters){
                    var className = formatType.charAt(0).toUpperCase() + formatType.slice(1).toLowerCase() + "Format";
                    if ($google.visualization.hasOwnProperty(className)){
                        return google.visualization[className];
                    } else if (angular.isDefined(customFormatters) && customFormatters.hasOwnProperty(formatType)) {
                        return customFormatters[formatType];
                    }
                    return;
                }
            }
            
            return FormatManager;
        }
})();