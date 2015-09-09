---
layout: post
title: "Release Notes: 0.0.11"
author: Nicholas Bering
---

* Revert to AngularJS 1.2.x as requested by user.
* Changed Charts API loader config from a constant to a value to accomodate the use of localization localization features.
* Add before-draw event callback attribute, allowing for last-minute changes from user's javascript (like dynamically resizing chart area for responsive designs).
* Added French local sample.
* Fixed issue where changing view properties didn't cause a redraw.