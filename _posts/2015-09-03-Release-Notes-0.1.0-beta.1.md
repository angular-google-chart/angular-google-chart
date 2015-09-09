---
layout: post
title: "Release Notes: 0.1.0-beta.1"
author: Nicholas Bering
---

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
