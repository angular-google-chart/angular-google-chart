# Contributing to Angular-Google-Chart
Thank you for taking the time to contribute to Angular-Google-Chart.

To help you make the most of your effort to contribute to this project, I've assembled a few guidelines for posting issues and pull-requests.

## Building with Grunt

In order to build the project you will need to have NodeJS and NPM installed.
In commandline, from the root of the project, run `npm install`. This will install
grunt and the required plugins.  Run `grunt`, and the default task will build `ng-google-chart.js`

## Issues

- **How do I...?** A large number of our issues are requests for how-to's.  We're always happy to help, and we know the documentation for this project could use some work.  When posting a request for a how-to, please give a sample of the HTML and JavaScript that you've got so far.  The best way to do this is with a demo on http://plnkr.co/, but some HTML and/or JavaScript in the issue itself works just fine, too.

- **Wouldn't it be nice if...?** For feature requests, an explanation of your desired use case would be appreciated.  Many people in many projects (Open Source or not) make requests for features that they would never *actually* use.  In order for our volunteer developers to use their time to best effect, please give a full description of why you want a feature and how you plan to use it.  The more details the better, but we understand when some details must be kept confidential.

- **Eeew, bugs!** When submitting a bug report, please include some of the HTML and JavaScript from your project that can be used to reproduce the bug.  We find it even more helpful when bug reports include an example on http://plnkr.co/, because then we can see exactly how it behaves and how it has been found.  Please also include and errors produced on the JavaScript Console from your Browser, or a screenshot of the bug's effect if there are no errors.

## Pull Requests
- **Working with Branches** The *master* branch is used for releases.  Code in *master* is what people get when they use tools like [Bower](http://bower.io/) or [npm](http://npmjs.com/).  Development is done on *development*.  This is where you should be working from to make changes, and also where you should be sending pull requests to. The *gh-pages* branch is separate from the rest of the project. It hosts the project's documentation site, which can be found at http://angular-google-chart.github.io/angular-google-chart/. Pull requests for the documentation can be made to that branch.

- **Editor Configuration** Sometimes your IDE or Text Editor tries to fix formatting for you. This can be problematic as making non-functional changes to the file can lead to unnecessary merge conflicts later.  To help avoid this our project has a .editorconfig file. See http://EditorConfig.org/ for information on this file and where to get a plug-in for your editor of choice to work with these settings.

- **It's just a wrapper.** Please keep in mind when adding new features that this project is just a wrapper of the [Google Charts API](http://developers.google.com/chart/).  Some things we simply cannot change because we have no control over them, and others we may be reluctant to change because we'd like to keep things simple.
