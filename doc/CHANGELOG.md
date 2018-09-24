<a name="3.0.0"></a>
# [3.0.0](https://github.com/SpoonX/stix/compare/v2.0.0...v3.0.0) (2018-09-24)


### Code Refactoring

* **ControllerManager:** force the default use of references ([d266f90](https://github.com/SpoonX/stix/commit/d266f90))


### Features

* **project:** added [@inject](https://github.com/inject) and [@patch](https://github.com/patch) decorators for greatly simplified DI ([b8305bf](https://github.com/SpoonX/stix/commit/b8305bf))
* **project:** expose namespaced debug logger for modules ([34e6fc9](https://github.com/SpoonX/stix/commit/34e6fc9))
* **Router:** export registered routes ([13805e0](https://github.com/SpoonX/stix/commit/13805e0))
* **ServiceManager:** implement InjectedServiceFactory for [@inject](https://github.com/inject) DI ([e6e179d](https://github.com/SpoonX/stix/commit/e6e179d))


### BREAKING CHANGES

* **ControllerManager:** this change now registers controllers that were loaded from directories by reference, as invokables. This was needed to cater to Injectables. If you didn't use the recommended reference pattern for controllers, this means you'll have to add aliases for your controllers.



<a name="2.0.0"></a>
# [2.0.0](https://github.com/SpoonX/stix/compare/v1.0.2...v2.0.0) (2018-09-22)


### Features

* **Config:** implement formalized Config service ([9f9ad5f](https://github.com/SpoonX/stix/commit/9f9ad5f))
* **Controller:** load from multiple locations ([069edd5](https://github.com/SpoonX/stix/commit/069edd5))
* **Logger:** create EventManager ([b61522b](https://github.com/SpoonX/stix/commit/b61522b))
* **Logger:** create Logger service ([dc5afc2](https://github.com/SpoonX/stix/commit/dc5afc2))
* **ModuleManager:** implement formalized module system ([6af926e](https://github.com/SpoonX/stix/commit/6af926e))
* **project:** add core types ([4e44d2f](https://github.com/SpoonX/stix/commit/4e44d2f))
* **Server:** add robust middleware support ([6996b9c](https://github.com/SpoonX/stix/commit/6996b9c))
* **ServiceManager:** fix typings and add support for shareable services ([6b12b66](https://github.com/SpoonX/stix/commit/6b12b66))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/SpoonX/stix/compare/v1.0.1...v1.0.2) (2018-09-21)


### Bug Fixes

* **project:** fix typing locations ([5a6d150](https://github.com/SpoonX/stix/commit/5a6d150))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/SpoonX/stix/compare/v1.0.0...v1.0.1) (2018-09-21)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/SpoonX/stix/compare/v0.2.2...v1.0.0) (2018-09-21)


### Features

* **project:** setup tests and add config with Map support ([3a492b4](https://github.com/SpoonX/stix/commit/3a492b4))
* **ServiceManager:** implement the service manager ([d778841](https://github.com/SpoonX/stix/commit/d778841))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/SpoonX/stix/compare/v0.2.1...v0.2.2) (2018-09-18)


### Bug Fixes

* **Config:** add missing RoutesConfigInterface export ([80cec7b](https://github.com/SpoonX/stix/commit/80cec7b))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/SpoonX/stix/compare/v0.2.0...v0.2.1) (2018-09-18)


### Bug Fixes

* **middleware:** fix Middleware typing ([4dce743](https://github.com/SpoonX/stix/commit/4dce743))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/SpoonX/stix/compare/v0.1.3...v0.2.0) (2018-09-18)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/SpoonX/stix/compare/v0.1.2...v0.1.3) (2018-09-18)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/SpoonX/stix/compare/v0.1.1...v0.1.2) (2018-09-18)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/SpoonX/stix/compare/v0.1.0...v0.1.1) (2018-09-18)


### Bug Fixes

* **Library:** add Module exports and use ControllerType ([c2f2553](https://github.com/SpoonX/stix/commit/c2f2553))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/SpoonX/stix/compare/v0.0.4...v0.1.0) (2018-09-18)


### Features

* **Controller:** expose ControllerType ([9de95c8](https://github.com/SpoonX/stix/commit/9de95c8))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/SpoonX/stix/compare/v0.0.3...v0.0.4) (2018-09-18)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/SpoonX/stix/compare/v0.0.2...v0.0.3) (2018-09-18)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/SpoonX/stix/compare/v0.0.1...v0.0.2) (2018-09-18)



<a name="0.0.1"></a>
## 0.0.1 (2018-09-18)



