---
layout: post
title: "Release Notes: 0.1.0"
author: Nicholas Bering
---

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

[0.1.0]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0-beta.2...0.1.0
[0.1.0-beta.2]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0-beta.1...0.1.0-beta.2
[0.1.0-beta.1]: https://github.com/angular-google-chart/angular-google-chart/compare/0.0.11...0.1.0-beta.1