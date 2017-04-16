# Change Log
All notable changes to this project will be documented in this file.
This project loosely follows [Semantic Versioning](http://semver.org/),
but is still in early stages of development.

## [Unreleased][unreleased]

## [1.0.0-beta.1] - 2017-04-17

### Added

* agcOnRangeChange directive
* agcLibraryLoaderProvider
* agcJsapiLoader service
* agcGstaticLoader service
* agcNullLoader service
* agcScriptTagHelper service
* a bunch of tests

### Changed

* GoogleChartService (now uses agcLibraryLoader service instead of googleChartApiPromise)

### Removed

* googleJsapiUrl provider
* "unit" tests that were really integration tests

## [0.1.0] - 2015-11-29

### Added

* agcOnClick directive

### Fixed

* optionalSettings key on api config given default value of empty so that it can actually be optional

## [0.1.0-beta.2] - 2015-09-09

### Added

* GoogleChartService (handles the actual wrapping of the google charts API)
* agcBeforeDraw directive (replaces before-draw on google-chart directive)
* registerServiceListener method on GoogleChartController API
* tests

### Changed

* much of the internal logic of the GoogleChartController was moved to a service, improving testability and resusability

### Removed

* before-draw attribute on google-chart directive (replaced by agcBeforeDraw directive)

## [0.1.0-beta.1] - 2015-09-03

### Added

* gauge chart sample
* basic API for hooking into chart events from other directives
* API-level support for listeners/event-handlers on inner chart object
* agc-on-error directive to register listener for google charts error event
* agc-on-mouseover and agc-on-mouseout directives

### Changed

* Change package meta-data to reflect support for angular 1.2+
* on-select now returns all selections if `selectedItems` is used instead of `selectedItem`
* cancels extra draw cycles if many rapid changes are made to chart-object watched parameters
* changed link function to controller in google-chart directive
* broke out some functionality into separate directives (on-ready, on-select)
* namespaced event directives (agc-on-ready, agc-on-error, agc-on-select, agc-on-mouseover, agc-on-mouseout)

### Removed

* support for `select` attribute

## [0.0.11] - 2014-08-21

* Revert to AngularJS 1.2.x as requested by user.
* Changed Charts API loader config from a constant to a value to accomodate the use of localization localization features.
* Add before-draw event callback attribute, allowing for last-minute changes from user's javascript (like dynamically resizing chart area for responsive designs).
* Added French local sample.
* Fixed issue where changing view properties didn't cause a redraw.

## [0.0.10] - 2014-06-24

* Fixed bug with Formatter implementation.
* Fix issue where Select listener function was not called for unselect events.
* Fixed some issues where drawing the chart triggered another call to draw the chart.
* `select` attribute is now deprecated, to be removed in a future release.  Replaced with `on-select` to keep naming consistent with `on-ready`.

## [0.0.9] - 2014-04-25

* Load Google Charts API with https as default protocol.
* Support for Custom Formatters
* Added and Reorganized Samples
* Improved IE Compatability for API Loading

## [0.0.8] - 2014-01-25

* Exposing a factory `googleChartApiPromise` which is a Promise resolved when the `google` global object is correctly initialized.

## [0.0.7] - 2014-01-15

* Removed jQuery dependency.

## [0.0.6] - 2013-12-29

## [0.0.5] - 2013-10-12

## [0.0.4] - 2013-10-03

## [0.0.3] - 2013-09-20

* Advanced chart formatter are available. Therefore, compatibility is broken withe the previous version of NumberFormat. Check the demo for usage.

## [0.0.2] - 2013-08-31

* The module is now named `googlechart` (instead of `googlechart.directives`)

## 0.0.1 - 2013-08-23

[unreleased]: https://github.com/angular-google-chart/angular-google-chart/compare/1.0.0-beta.1...HEAD
[1.0.0-beta.1]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0...1.0.0-beta.1
[0.1.0]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0-beta.2...0.1.0
[0.1.0-beta.2]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0-beta.1...0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.11...0.1.0-beta.1
[0.0.11]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.10...0.0.11
[0.0.10]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.9...0.0.10
[0.0.9]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.8...0.0.9
[0.0.8]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.7...0.0.8
[0.0.7]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.6...0.0.7
[0.0.6]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.5...0.0.6
[0.0.5]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.4...0.0.5
[0.0.4]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.3...0.0.4
[0.0.3]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.2...0.0.3
[0.0.2]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.1...0.0.2
