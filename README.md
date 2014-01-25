Google Chart Tools Directive Module
============================
for AngularJS
-------------

### Goal

Wrapper directive for [Google Chart Tools](https://google-developers.appspot.com/chart/)

### Usage and Demo

See sample files index.html and sample.js. [Live Demo](http://bouil.github.io/angular-google-chart/)

You can find another example of use on [this pluker](http://plnkr.co/edit/3RJ2HS?p=preview)

### Chart Data doc

See [ChartWrapper](https://google-developers.appspot.com/chart/interactive/docs/reference#chartwrapperobject) and [DataTable](https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable) documentation.

### Release notes

#### 0.0.8

Exposing a factory `googleChartApiPromise` which is a Promise resolved when the `google` global object is correctly initialized.

#### 0.0.7

Removed jQuery dependency.

#### 0.0.3

Advanced chart formatter are available. Therefore, compatibility is broken withe the previous version of NumberFormat. Check the demo for usage.

#### 0.0.2

The module is now named `googlechart` (instead of `googlechart.directives`)
