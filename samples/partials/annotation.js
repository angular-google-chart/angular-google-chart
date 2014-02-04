angular.module("multiSamples").controller("AnnotationChartCtrl", function ($scope, googleChartApiPromise) {
    $scope.chartObject = {};

    $scope.someValue = 12;

    googleChartApiPromise.then(function () {
        // the google global object is ready.

        $scope.chartObject.type = "AnnotationChart";
        /*
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Kepler-22b mission');
        data.addColumn('string', 'Kepler title');
        data.addColumn('string', 'Kepler text');
        data.addColumn('number', 'Gliese mission');
        data.addColumn('string', 'Gliese title');
        data.addColumn('string', 'Gliese text');
        data.addRows([
            [new Date(2314, 2, 15),
                12, undefined, undefined,
                10, undefined, undefined],
            [new Date(2314, 2, 16),
                24, 'Lalibertines', 'First encounter',
                12, undefined, undefined],
            [new Date(2314, 2, 17),
                35, 'Lalibertines', 'They are very tall',
                15, 'Gallantors', 'First Encounter'],
            [new Date(2314, 2, 18),
                $scope.someValue, 'Lalibertines', 'Attack on our crew!',
                34, 'Gallantors', 'Statement of shared principles'],
            [new Date(2314, 2, 19),
                8, 'Lalibertines', 'Heavy casualties',
                66, 'Gallantors', 'Mysteries revealed'],
            [new Date(2314, 2, 20),
                0, 'Lalibertines', 'All crew lost',
                79, 'Gallantors', 'Omniscience achieved']
        ]);
*/

        $scope.chartObject.data = {"cols": [
            {id: "month", label: "Month", type: "date"},
            {id: "kepler-data", label: "Kepler-22b mission", type: "number"},
            {id: "kepler-annot", label: "Kepler-22b Annotation Title", type: "string"},
            {id: "kepler-annot-body", label: "Kepler-22b Annotation Text", type: "string"},
            {id: "desktop-data", label: "Gliese mission", type: "number"},
            {id: "desktop-annot", label: "Gliese Annotation Title", type: "string"},
            {id: "desktop-annot-body", label: "Gliese Annotaioon Text", type: "string"}
        ], "rows": [
            {c: [
                {v: new Date(2314, 2, 15)},
                {v: 19,},
                {v: 'Lalibertines'},
                {v: 'First encounter'},
                {v: 7},
                {v: undefined},
                {v: undefined}
            ]},
            {c: [
                {v: new Date(2314, 2, 16)},
                {v: 13},
                {v: 'Lalibertines'},
                {v: 'They are very tall'},
                {v: 12},
                {v: 'Gallantors'},
                {v: 'First Encounter'}
            ]},
            {c: [
                {v: new Date(2314, 2, 17)},
                {v: 0},
                {v: 'Lalibertines'},
                {v: 'All crew lost'},
                {v: 20},
                {v: 'Gallantors'},
                {v: 'Omniscience achieved'}

            ]}
        ]};

        $scope.chartObject.data = data;
        $scope.chartObject.options = {
            displayAnnotations: true
        };


    });

});