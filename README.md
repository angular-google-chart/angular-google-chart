Google Chart Tools Directive Module
============================
for AngularJS
-------------
[![Join the chat at https://gitter.im/angular-google-chart/angular-google-chart](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-google-chart/angular-google-chart?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

### Install

Install with bower

`bower install angular-google-chart --save`


### Goal

Wrapper directive for [Google Chart Tools](https://google-developers.appspot.com/chart/)

### Contributing

Interested in contributing to **Angular-Google-Chart**? Cool! Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for a brief guide to raising issues and submitting Pull Requests.

### A note on branches

Development branch is `gh-pages`.

Release branch is `master` (idealy), and was created just because Bower needed it.

Please send your pull requests to `gh-pages`.

### Building with Grunt

In order to build the project you will need to have NodeJS and NPM installed.
In commandline, from the root of the project, run `npm install`. This will install
grunt and the required plugins.  Run `grunt` or `grunt build` to build `ng-google-chart.js` and
`ng-google-chart.min.js` with included source maps. `grunt release` builds without
source maps.

### Running Tests

Tests are run during build. Use `grunt watch` to run jshint and tests whenever
source files are changed.

### Usage and Demo

See sample files index.html and controllers in partials directory. [Live Demo](http://angular-google-chart.github.io/angular-google-chart/)

#### Other samples

* http://plnkr.co/edit/3RJ2HS?p=preview
* http://plnkr.co/edit/E4iPtQ?p=preview

### Chart Data doc

See [ChartWrapper](https://google-developers.appspot.com/chart/interactive/docs/reference#chartwrapperobject) and [DataTable](https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable) documentation.

### Release notes

#### Unreleased Changes

*Added:*

* GoogleChartService (handles the actual wrapping of the google charts API)
* agcBeforeDraw directive (replaces before-draw on google-chart directive)
* registerServiceListener method on GoogleChartController API
* tests

*Changed:*

* much of the internal logic of the GoogleChartController was moved to a service, improving testability and resusability

*Removed:*

* before-draw attribute on google-chart directive (replaced by agcBeforeDraw directive)

#### 0.1.0-beta.1

*Added:*

* gauge chart sample
* basic API for hooking into chart events from other directives
* API-level support for listeners/event-handlers on inner chart object
* agc-on-error directive to register listener for google charts error event
* agc-on-mouseover and agc-on-mouseout directives

*Changed:*

* Change package meta-data to reflect support for angular 1.2+
* on-select now returns all selections if `selectedItems` is used instead of `selectedItem`
* cancels extra draw cycles if many rapid changes are made to chart-object watched parameters
* changed link function to controller in google-chart directive
* broke out some functionality into separate directives (on-ready, on-select)
* namespaced event directives (agc-on-ready, agc-on-error, agc-on-select, agc-on-mouseover, agc-on-mouseout)

*Removed:*

* support for `select` attribute

#### 0.0.11

* Revert to AngularJS 1.2.x as requested by user.
* Changed Charts API loader config from a constant to a value to accomodate the use of localization localization features.
* Add before-draw event callback attribute, allowing for last-minute changes from user's javascript (like dynamically resizing chart area for responsive designs).
* Added French local sample.
* Fixed issue where changing view properties didn't cause a redraw.

#### 0.0.10

* Fixed bug with Formatter implementation.
* Fix issue where Select listener function was not called for unselect events.
* Fixed some issues where drawing the chart triggered another call to draw the chart.
* `select` attribute is now deprecated, to be removed in a future release.  Replaced with `on-select` to keep naming consistent with `on-ready`.

#### 0.0.9

* Load Google Charts API with https as default protocol.
* Support for Custom Formatters
* Added and Reorganized Samples
* Improved IE Compatability for API Loading

#### 0.0.8

Exposing a factory `googleChartApiPromise` which is a Promise resolved when the `google` global object is correctly initialized.

#### 0.0.7

Removed jQuery dependency.

#### 0.0.3

Advanced chart formatter are available. Therefore, compatibility is broken withe the previous version of NumberFormat. Check the demo for usage.

#### 0.0.2

The module is now named `googlechart` (instead of `googlechart.directives`)

### Out of luck ?

Try another AngularJS directive that use [Highcharts](https://github.com/pablojim/highcharts-ng).
