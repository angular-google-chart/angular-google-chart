---
layout: docs
category: Directives
title: googleChart
version: 0.0.11
latest: false
---

This is the heart of Angular Google Chart. See the [Examples]({{site.baseurl}}/docs/0.0.11/examples/)
for practical code examples.

<table class="table">
    <tr>
        <th>Attribute</th>
        <th>Value Type</th>
        <th>Description</th>
        <th>Example Value</th>
    </tr>
    <tr>
        <td><p><code>chart</code></p>
        <td>expression</td>
        <td>Binding to the chart object with the values needed to build the chart.</td>
        <td><p><code>chart="chartObject"</code></p></td>
    </tr>
    <tr>
        <td><p><code>on-select</code></p></td>
        <td>expression</td>
        <td>Event handler bound to the chart wrapper's select event.</td>
        <td><p><code>on-select="selectHandler(selectedItem)"</code></p></td>
    </tr>
    <tr>
        <td><p><code>on-ready</code></p></td>
        <td>expression</td>
        <td>Event handler bound to the chart wrapper's ready event.</td>
        <td><p><code>on-ready="readyHandler(chartWrapper)"</code></p></td>
    </tr>
    <tr>
        <td><p><code>before-draw</code></p></td>
        <td>expression</td>
        <td>
            Event handler fired by the directive just before calling
            <code>draw()</code> on the chart wrapper.
        </td>
        <td><p><code>before-draw="drawHandler(chartWrapper)"</code></p></td>
    </tr>
</table>