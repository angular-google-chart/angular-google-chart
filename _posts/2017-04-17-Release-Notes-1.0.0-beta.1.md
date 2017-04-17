---
layout: post
title: "Release Notes: 1.0.0-beta.1"
author: Nicholas Bering
---

This is the first beta release for 1.0.0 version, coming soon. It's been almost 4 years,
so it's about time for 1.0.0. I've cut away some un-necessary features, and added the most
sought-after feature: loading the libraries from the gstatic endpoint.

Also notable, is the addition of a "Null" loader strategy, which just assumes the Google
Library is already loaded, or gives you a callback with which to notify the library when
it is loaded. This should help those who had trouble because they wanted to load the library
by unconventional means.

The library still uses the JSAPI endpoint by default. See [agcGstaticLoaderProvider]({{ "/docs/1.0.0-beta.1/providers/agcGstaticLoader/" | prepend: site.baseurl | prepend: site.url}})
for and example of how to switch to and configure the new gstatic loader. I am considering
moving to the new gstatic loader as the default with the full 1.0.0 release. Community
feedback is encouraged. Use the issues on the github repo, or drop in on the gitter chat
channel.

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

[1.0.0-beta.1]: https://github.com/angular-google-chart/angular-google-chart/compare/0.1.0...1.0.0-beta.1
