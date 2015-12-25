---
layout: docs
title: How to use Google Chart Formatters
category: Guides
version: 0.1.0
latest: false
---

### Google Chart Formatters

As part of the Google Visualization API there are a series of formatter predefined by Google


<table class="table">
    <tr>
        <th>Formatter Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>
            <code>ArrowFormat</code>
        </td>
        <td>
            Adds an up or down arrow, indicating whether the cell value is above or below a specified value.
        </td>
    </tr>
    <tr>
        <td>
            <code>BarFormat</code>
        </td>
        <td>
            Adds a colored bar, the direction and color of which indicates whether the cell value is above or below a specified value.
        </td>
    </tr>
    <tr>
        <td>
            <code>ColorFormat</code>
        </td>
        <td>
            Colors a cell according to whether the values fall within a specified range.
        </td>
    </tr>
    <tr>
        <td>
            <code>DateFormat</code>
        </td>
        <td>
            Formats a Date or DateTime value in several different ways, including "January 1, 2009," "1/1/09" and "Jan 1, 2009."
        </td>
    </tr>
    <tr>
        <td>
            <code>NumberFormat</code>
        </td>
        <td>
            Formats various aspects of numeric values.
        </td>
    </tr>
    <tr>
        <td>
            <code>PatternFormat</code>
        </td>
        <td>
            Concatenates cell values on the same row into a specified cell, along with arbitrary text.
        </td>
    </tr>
</table>

<div class="alert alert-info">
    <span class="fa fa-book fa-lg"></span>
    Check out the
    <a href="https://developers.google.com/chart/interactive/docs/reference?hl=en#formatters">
        <b>Google Visualization API Reference</b><span class="fa fa-external-link"></span>
    </a>
    for more information about specific Formatter.
</div>


### Using provided formatter

The chart object passed to the directive accept a formatters attribute.

This attribute is composed as in the following example:

{% highlight javascript %}
// Standard chart object
var chart = {
            data: data,
            type: 'Table',
            formatters: formatters
        };

// Formatters
var formatters = {
                  date: [{
                        columnNum: 1,
                        pattern: "HH:mm:ss dd:MM:yy"
                        }]
                };

{% endhighlight %}


The **formatters** object has an attribute that is the first part of the Formatter name in lowercase without the Format suffix.

The list of the shortened names:
- arrow
- bar
- color
- date 
- number
- pattern

The value of this attribute is an array containing the object representing the column to format and the formatter options.

For each column that has to be formatted there must be an element in the array of the specific formatter.
