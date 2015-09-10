---
layout: post
title: "Release Notes: 0.1.0-beta.1"
author: Nicholas Bering
---

### Added

* GoogleChartService (handles the actual wrapping of the google charts API)
* agcBeforeDraw directive (replaces before-draw on google-chart directive)
* registerServiceListener method on GoogleChartController API
* tests

### Changed

* much of the internal logic of the GoogleChartController was moved to a service, improving testability and resusability

### Removed

* before-draw attribute on google-chart directive (replaced by agcBeforeDraw directive)