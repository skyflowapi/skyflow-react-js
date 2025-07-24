# Changelog

All notable changes to this project will be documented in this file.

## [2.5.1] - 2025-07-24
### Fixed
- Element state in event listeners for collect elements in `PROD` env.

## [2.5.0] - 2025-06-20
### Added
- Typescript support for public interfaces in JS SDK.

## [2.4.3] - 2025-06-16
### Fixed
- Expiration date validations.

## [2.4.2] - 2025-06-12
### Fixed
- Refactor stale elements code.

## [2.4.1] - 2025-06-03
### Fixed
- Add check for empty container for collect and reveal.
### Changed
- Update 3DS browser details helper function.

## [2.4.0] - 2025-05-26
### Added
- Iframe refactoring. 

## [2.3.3] - 2025-05-08
### Added
- Add overloading method signatures for container initialisation.

## [2.3.2] - 2025-04-22
### Added
- Add boolean value in options to add validation check for blocking empty files.

## [2.3.1] - 2025-04-21
### Added
- Validation check for blocking 0 byte size files

## [2.3.0] - 2025-04-15
### Added
- Masking support for collect elements.

## [2.2.1-beta.1] - 2025-04-10
### Added
- Iframe refactoring

## [2.2.1] - 2025-04-08
### Added
- Flexibility to display the desired card brand scheme for card brand choice.

## [2.2.0] - 2025-03-28
### Added
- Support for overriding error messages for collect elements.

## [2.1.3] - 2025-03-12
### Added
- Support for latest react version `v19.0.0`.

## [2.1.2] - 2025-03-04
### Changed
- Upgrade JS SDK latest version for patch fixes.

## [2.1.0] - 2025-02-12
### Added
- Support for 3DS helper functions

## [2.0.0] - 2025-01-28
### Added
- Support for iframe versioning.

## [1.18.1] - 2024-11-12
### Changed
- Upgrade JS SDK latest version for patch fixes.

## [1.18.0] - 2024-09-11
### Changed
- Error messages for SDK validation scenarios

## [1.17.0] - 2024-09-03
### Added
- Support for Coralogix iframe metrics

## [1.16.0] - 2024-05-20
### Added
- Support for `ELEMENT_VALUE_MATCH_RULE` custom validation rule.

## [1.15.0] - 2024-05-08
### Added
- card brand choice support for card number element.

## [1.14.0] - 2024-04-12
### Added
- iframe latency metrics.

## [1.13.0] - 2024-04-02
### Added
- `preserveFileName` option in file element options.

## [1.12.0] - 2023-12-15

### Added
- Update Collect, Reveal and File Render Element props dynamically.

## [1.11.0] - 2023-12-12

### Added
- Update record by skyflow id using elements

### Fixed
- Div not found issue when div id is not passed.

## [1.10.0] - 2023-11-13

### Added

- Added file render elements

## [1.9.0] - 2023-10-31

### Added

- Support for `Get` method

## [1.8.1] - 2023-10-17

### Added 

- allowedFileType option in FileInputElement.

## [1.8.0] - 2023-08-29

### Added 

-  `File Input Element` support in React SDK.

## [1.7.5] - 2023-08-14

### Changed 

-  Update JS SDK version for global styles and required Asterisk.

## [1.7.4] - 2023-08-01

### Changed 

-  Upgrade JS SDK latest version for patch fixes.

## [1.7.3] - 2023-07-26

### Changed 

-  Upgrade JS SDK latest version for patch fixes.

## [1.7.2] - 2023-07-20

### Added 

-  Add `sdk metrics` to React SDK.
### Changed 

-  Upgrade JS SDK latest version for patch fixes.

## [1.7.1] - 2023-06-22

### Changed 

-  Upgrade latest version of JS SDK for patch fix.

## [1.7.0] - 2023-06-06

### Added 

-  `redaction` prop in Reveal Element.

## [1.6.0] - 2023-03-06
  
### Added

-  composable elements improvements.

## [1.5.4] - 2023-03-01
  
### Changed

-  Upgrade JS SDK version to fix grace period of cached token.

## [1.5.3] - 2023-02-25
  
### Added

-  Added support for input formatting in Reveal Element 

## [1.5.2] - 2023-02-24
  
### Fixed

-  fix reveal element rerenders.

## [1.5.1] - 2023-01-23
  
### Fixed

-  bug fixes with collect and composable elements.

## [1.5.0] - 2023-01-18
  
### Added

-  Added new `Composable` Elements.

## [1.4.0] - 2023-01-03
  
### Fixed
- Fixed `Reveal` Element re-redering

## [1.3.1] - 2022-09-23
  
### Changed

-  Update collect options in README.md file
-  Update JS SDK imports

## [1.3.0] - 2022-11-15

### Added

- `upsert` support while collecting data through skyflow elements.
- `cardIcon` and `copyIcon` style objects for collect and reveal elements.
- Added asterisk (*) symbol for label of required collect element.

## [1.2.0] - 2022-09-13

### Added

- `INPUT_FIELD` element type
  
### Changed

-  README.md file
## [1.1.0] - 2022-08-30

### Added

- Minimun react version support for react SDK
### Changed

-  README.md file
-  Sample App
## [1.0.0] - 2022-08-16

- Inital Skyflow React SDK release
