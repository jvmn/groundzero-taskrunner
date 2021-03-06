
 *** 

# [1.6.2](https://github.com/jvmn/groundzero-taskrunner/compare/1.6.1...1.6.2) (14.10.2019)

 ### Notes
 * Forced fractal to version 1.1.7 seems like version 1.2.0 generates a corrupted package.json should be revisited in the future.

 ### Chores

* **package:**  update dependencies ([3a651a7](https://github.com/jvmn/groundzero-taskrunner/commit/3a651a7)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @14.10.2019_
 ### Code Refactoring

* **copy:**  use fs-extra instead of copydir ([3c1e586](https://github.com/jvmn/groundzero-taskrunner/commit/3c1e586)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @14.10.2019_
* **clean:**  use fs-extra instead of del ([7b50224](https://github.com/jvmn/groundzero-taskrunner/commit/7b50224)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @14.10.2019_

 *** 

# [1.6.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.6.0...1.6.1) (25.09.2019)

 ### Bug Fixes

* **npm:**  use prod config for build:webpack:prod script ([524d843](https://github.com/jvmn/groundzero-taskrunner/commit/524d843)) _by [Ralf Heller](ralf.heller@jvm.de) @19.09.2019_

 *** 

# [1.6.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.5.3...1.6.0) (11.07.2019)

 ## Breaking changes 
 Removed changelog task from release task. Now one should handle the changelog directly in the project.
 
 One can split the changelog and the next step log or just run the changelog in either the pre or post release script. 
 
 Example with logNextSteps option set to false:
```json
    "prerelease": "groundzero-changelog",
    "release": "groundzero release",
    "postrelease": "groundzero-changelog-next",
```
**one can read more in the changelog package [https://github.com/jvmn/groundzero-changelog](https://github.com/jvmn/groundzero-changelog)*
 ### Chores

* **package:**  update dependencies ([1f860b2](https://github.com/jvmn/groundzero-taskrunner/commit/1f860b2)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @11.07.2019_
 ### Features

* **build-css:**  scss to css error handling ([7ccb965](https://github.com/jvmn/groundzero-taskrunner/commit/7ccb965)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @11.07.2019_
* **release:**  remove changelog, handle in project ([2aff854](https://github.com/jvmn/groundzero-taskrunner/commit/2aff854)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @11.07.2019_
* **cssbuild:**  render project version ([b57b75d](https://github.com/jvmn/groundzero-taskrunner/commit/b57b75d)) _by [Oliver Müller](oliver.mueller@jvm.de) @27.05.2019_

 *** 

# [1.5.3](https://github.com/jvmn/groundzero-taskrunner/compare/1.5.2...1.5.3) (23.05.2019)

 ### Bug Fixes

* **deploy:**  check feature ([254b94d](https://github.com/jvmn/groundzero-taskrunner/commit/254b94d)) _by [Oliver Müller](oliver.mueller@jvm.de) @23.05.2019_

 *** 

# [1.5.2](https://github.com/jvmn/groundzero-taskrunner/compare/1.5.1...1.5.2) (30.04.2019)

 ### Bug Fixes

* **criticalcss:**  font paths ([60dcd10](https://github.com/jvmn/groundzero-taskrunner/commit/60dcd10)) _by [Oliver Müller](oliver.mueller@jvm.de) @30.04.2019_

 *** 

# [1.5.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.5.0...1.5.1) (20.02.2019)

 ### Chores

* **package:**  update dependencies ([a0877c9](https://github.com/jvmn/groundzero-taskrunner/commit/a0877c9)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @20.02.2019_
 ### Code Refactoring

* **release:**  add ocd to pretty ([371b6c9](https://github.com/jvmn/groundzero-taskrunner/commit/371b6c9)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @20.02.2019_

 *** 

# [1.5.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.4.0...1.5.0) (19.02.2019)

 ### Chores

* **package:**  update dependencies ([b8c86b7](https://github.com/jvmn/groundzero-taskrunner/commit/b8c86b7)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @19.02.2019_
 ### Features

* **release:**  added pretty to beautify html output on release task ([00a0722](https://github.com/jvmn/groundzero-taskrunner/commit/00a0722)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @19.02.2019_

 *** 

# [1.4.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.3.3...1.4.0) (08.02.2019)

 ### Chores

* **build-css:**  silent concat ([6c22eed](https://github.com/jvmn/groundzero-taskrunner/commit/6c22eed)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
 ### Documentation

* **rsync:**  branch comment ([7ae085a](https://github.com/jvmn/groundzero-taskrunner/commit/7ae085a)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
* **hooks:**  added fractal hooks config sample ([f70b89f](https://github.com/jvmn/groundzero-taskrunner/commit/f70b89f)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
 ### Features

* **fractal-config:**  hooks to overwrite fractal defaults from project ([00a05f3](https://github.com/jvmn/groundzero-taskrunner/commit/00a05f3)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
* **path-config:**  new project paths config ([31e26bc](https://github.com/jvmn/groundzero-taskrunner/commit/31e26bc)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
 ### Bug Fixes

* **build-css:**  throw err if folder exists ([a96b8c5](https://github.com/jvmn/groundzero-taskrunner/commit/a96b8c5)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
 ### Code Refactoring

* **build-css:**  support imports in sass, use project paths ([2160670](https://github.com/jvmn/groundzero-taskrunner/commit/2160670)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_
* **lib:**  use project paths instead of fractal config paths ([4e0cb0e](https://github.com/jvmn/groundzero-taskrunner/commit/4e0cb0e)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @08.02.2019_

 *** 

# [1.3.3](https://github.com/jvmn/groundzero-taskrunner/compare/1.3.2...1.3.3) (07.02.2019)

 ### Chores

* **package:**  update dependencies ([5cddef7](https://github.com/jvmn/groundzero-taskrunner/commit/5cddef7)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @07.02.2019_

 *** 

# [1.3.2](https://github.com/jvmn/groundzero-taskrunner/compare/1.3.1...1.3.2) (07.02.2019)

* **build-css:**  exclude critical files from sass on build ([3588bb0](https://github.com/jvmn/groundzero-taskrunner/commit/3588bb0)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @06.02.2019_
 ### Code Refactoring

* **build-css:**  better globs ([fc2bb11](https://github.com/jvmn/groundzero-taskrunner/commit/fc2bb11)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @07.02.2019_

 *** 

# [1.3.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.3.0...1.3.1) (05.02.2019)

 ### Bug Fixes

* **critical-css:**  correct includePaths option in sass ([efc2e8f](https://github.com/jvmn/groundzero-taskrunner/commit/efc2e8f)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @05.02.2019_

 *** 

# [1.3.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.2.1...1.3.0) (05.02.2019)

 ### Features

* **critical-css:**  create inline critical css in pages, exported fn ([b422440](https://github.com/jvmn/groundzero-taskrunner/commit/b422440)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @05.02.2019_

 *** 

# [1.2.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.2.0...1.2.1) (01.02.2019)

 ### Chores

* **package:**  fix pkg-publish task typo ([b1ee968](https://github.com/jvmn/groundzero-taskrunner/commit/b1ee968)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @01.02.2019_
 ### Code Refactoring

* **onchange:**  use original package with chained path on globe ([cb78f31](https://github.com/jvmn/groundzero-taskrunner/commit/cb78f31)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @01.02.2019_

 *** 

# [1.2.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.1.1...1.2.0) (01.02.2019)

 ### Chores

* **package:**  update dependencies ([ba0c3fe](https://github.com/jvmn/groundzero-taskrunner/commit/ba0c3fe)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @01.02.2019_
 ### Features

* **update:**  update command for updateing pkg to latest version ([39fe90c](https://github.com/jvmn/groundzero-taskrunner/commit/39fe90c)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @01.02.2019_

 *** 

# [1.1.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.1.0...1.1.1) (30.01.2019)

 ### Chores

* **package:**  update dependencies ([a84e70e](https://github.com/jvmn/groundzero-taskrunner/commit/a84e70e)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @30.01.2019_
 ### Bug Fixes

* **rsync:**  correct path for src and logfile ([906b1bc](https://github.com/jvmn/groundzero-taskrunner/commit/906b1bc)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @30.01.2019_

 *** 

# [1.1.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.0.2...1.1.0) (30.01.2019)

 ### Features

* **version:**  check for latest version in npm ([a78408f](https://github.com/jvmn/groundzero-taskrunner/commit/a78408f)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @30.01.2019_

 *** 

# [1.0.2](https://github.com/jvmn/groundzero-taskrunner/compare/1.0.1...1.0.2) (29.01.2019)

 ### Bug Fixes

* **webpack:**  remove resolveLoader with false path ([74519cd](https://github.com/jvmn/groundzero-taskrunner/commit/74519cd)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @29.01.2019_
* **pkg:**  correct to dependencies again false commit ([40910ea](https://github.com/jvmn/groundzero-taskrunner/commit/40910ea)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @29.01.2019_

 *** 

# [1.0.1](https://github.com/jvmn/groundzero-taskrunner/compare/1.0.0...1.0.1) (29.01.2019)

 ### Bug Fixes

* **pkg:**  correctly set dependencies as devDependencies to resolve paths ([8473e68](https://github.com/jvmn/groundzero-taskrunner/commit/8473e68)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @29.01.2019_

 *** 

# [1.0.0](https://github.com/jvmn/groundzero-taskrunner/compare/1.0.0...1.0.0) (29.01.2019)

 ### Features

* **taskrunner:**  first init, working prototype ([7845b93](https://github.com/jvmn/groundzero-taskrunner/commit/7845b93)) _by [Shachar Leuchter](shachar.leuchter@jvm.de) @29.01.2019_
