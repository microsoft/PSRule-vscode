# Change log

All notable changes to this extension will be documented in this file.
This extension is available in two release channels for Visual Studio Code from the Visual Studio Marketplace.

- [Preview][ext-preview] - More frequent releases but more likely to contain bugs.
  - _Preview_ is where updates are available before they released to _Stable_.
  - This channel includes changes listed in the _Unreleased_ heading.
  - Versioning for _Preview_ follows an `year.month.revision` that increments for each release.
- [Stable][ext-stable] - Less frequent releases, with more user testing, experimental features are disabled.
  - Uses [semantic versioning](http://semver.org/) to declare changes.
Continue reading to see the changes included in the latest version.

## Unreleased

## v1.3.0

What's changed since v1.2.0:

- General improvements:
  - Added YAML Rule support to language schema. [#361](https://github.com/microsoft/PSRule-vscode/issues/361)
  - Added starter snippet for GitHub Actions workflow. [#362](https://github.com/microsoft/PSRule-vscode/issues/362)
  - Updated options schema to support `include` option within PSRule v1.6.0. [#363](https://github.com/microsoft/PSRule-vscode/issues/363)
- Engineering:
  - Bump vscode engine to v1.59.0. [#358](https://github.com/microsoft/PSRule-vscode/pull/358)

## v1.2.0

What's changed since v1.1.0:

- General improvements:
  - Updated extension to latest icon. [#356](https://github.com/microsoft/PSRule-vscode/issues/356)
  - Added string selector support to language schema. [#327](https://github.com/microsoft/PSRule-vscode/issues/327)
  - Updated options schema to support PSRule v1.5.0. [#328](https://github.com/microsoft/PSRule-vscode/issues/328)
- Engineering:
  - Bump vscode engine to v1.58.1. [#325](https://github.com/microsoft/PSRule-vscode/pull/325)

## v1.1.0

What's changed since v1.0.0:

- New features:
  - Added `PSRule: Run analysis` quick task to call `Assert-PSRule` for the current workspace. [#226](https://github.com/microsoft/PSRule-vscode/issues/226)
    - To configure set `path`, `inputPath`, `baseline`, `module`, and `outcome` per task.
    - The default task will run analysis in the current workspace using rules in `.ps-rule/`.
    - Requires v1.4.0 or greater of PSRule PowerShell module installed.
  - Added `$PSRule` problem matcher for analysis tasks. [#234](https://github.com/microsoft/PSRule-vscode/issues/234)
    - Source locations for rules failures are detected when using the `VisualStudioCode` style.
- General improvements:
  - Preview channel will notify that a stable version is available. [#235](https://github.com/microsoft/PSRule-vscode/issues/235)
  - Added PSRule options schema support updates.
    - Added `Output.Banner` option. [#264](https://github.com/microsoft/PSRule-vscode/issues/264)
    - Improved validation for the requires option. [#265](https://github.com/microsoft/PSRule-vscode/issues/265)
    - Added support for new style options `VisualStudioCode` and `Detect`. [#266](https://github.com/microsoft/PSRule-vscode/issues/266)
- Engineering:
  - Bump vscode engine to v1.56.0. [#241](https://github.com/microsoft/PSRule-vscode/pull/241)

## v1.0.0

What's changed since v0.18.0:

- General improvements:
  - Added support for `input.ignoreGitPath` option. [#231](https://github.com/microsoft/PSRule-vscode/issues/231)
  - Added feature documentation. [#151](https://github.com/microsoft/PSRule-vscode/issues/151)
- Engineering:
  - Split extension into two release channels, _Preview_ and _Stable_. [#150](https://github.com/microsoft/PSRule-vscode/issues/150)
    - Preview channel appears as _PSRule (Preview)_, with stable appearing as _PSRule_. [#229](https://github.com/microsoft/PSRule-vscode/issues/229)
  - Improved extension performance and size by bundling. [#222](https://github.com/microsoft/PSRule-vscode/issues/222)

## v0.18.0

What's changed since v0.17.0:

- General improvements:
  - Added support for configuring conventions. [#199](https://github.com/Microsoft/PSRule-vscode/issues/199)
  - Added support for selectors. [#206](https://github.com/Microsoft/PSRule-vscode/issues/206)
  - Updated options and language schema to support `binding.preferTargetInfo` option. [#207](https://github.com/Microsoft/PSRule-vscode/issues/207)
  - Updated language schema to add `apiVersion` property. [#208](https://github.com/Microsoft/PSRule-vscode/issues/208)
- Engineering:
  - Bump vscode engine to v1.55.0. [#204](https://github.com/microsoft/PSRule-vscode/pull/204)

## v0.17.0

What's changed since v0.16.0:

- General improvements:
  - Migrate repository to Microsoft GitHub org. [#152](https://github.com/Microsoft/PSRule-vscode/issues/152)
- Engineering:
  - Bump vscode engine to v1.52.0.

## v0.16.0

What's changed since v0.15.0:

- General improvements:
  - Updated options schema to v0.21.0. [#135](https://github.com/Microsoft/PSRule-vscode/issues/135)
  - Updated language schema to v0.21.0. [#134](https://github.com/Microsoft/PSRule-vscode/issues/134)
- Engineering:
  - Bump vscode engine to v1.50.0.

## v0.15.0

What's changed since v0.14.0:

- General improvements:
  - Updated options schema to v0.20.0. [#106](https://github.com/Microsoft/PSRule-vscode/issues/106)
  - Updated language schema to v0.20.0. [#107](https://github.com/Microsoft/PSRule-vscode/issues/107)
- Engineering:
  - Bump vscode engine to v1.49.0.

## v0.14.0

What's changed since v0.13.0:

- General improvements:
  - Updated options schema to v0.19.0. [#87](https://github.com/Microsoft/PSRule-vscode/issues/87)

## v0.13.0

What's changed since v0.12.0:

- New features:
  - Added snippet for ModuleConfig resource. [#75](https://github.com/Microsoft/PSRule-vscode/issues/75)
- General improvements:
  - Updated language schema to v0.17.0. [#73](https://github.com/Microsoft/PSRule-vscode/issues/73)

## v0.12.0

What's changed since v0.11.0:

- General improvements:
  - Updated options schema to v0.16.0. [#68](https://github.com/Microsoft/PSRule-vscode/issues/68)

## v0.11.0

What's changed since v0.10.0:

- General improvements:
  - Updated options schema to v0.14.0. [#63](https://github.com/Microsoft/PSRule-vscode/issues/63)

## v0.10.0

What's changed since v0.9.0:

- General improvements:
  - Updated markdown snippet to include links section and online version. [#60](https://github.com/Microsoft/PSRule-vscode/issues/60)
  - Updated options schema to v0.13.0. [#59](https://github.com/Microsoft/PSRule-vscode/issues/59)

## v0.9.0

What's changed since v0.8.0:

- General improvements:
  - Updated schemas to v0.12.0. [#54](https://github.com/Microsoft/PSRule-vscode/issues/54)

## v0.8.0

What's changed since v0.7.0:

- General improvements:
  - Updated options schema to v0.11.0. [#49](https://github.com/Microsoft/PSRule-vscode/issues/49)

## v0.7.0

What's changed since v0.6.0:

- General improvements:
  - Updated options schema to v0.10.0. [#44](https://github.com/Microsoft/PSRule-vscode/issues/44)

## v0.6.0

What's changed since v0.5.0:

- New features:
  - Added language schema. [#39](https://github.com/Microsoft/PSRule-vscode/issues/39)
  - Added snippet for baseline resource. [#40](https://github.com/Microsoft/PSRule-vscode/issues/40)
  - Added highlighting for `Synopsis:` resource comments. [#41](https://github.com/Microsoft/PSRule-vscode/issues/41)
- General improvements:
  - Updated options schema to v0.9.0. [#38](https://github.com/Microsoft/PSRule-vscode/issues/38)

## v0.5.0

What's changed since v0.4.0:

- New features:
  - Added snippet and syntax support for Reason keyword. [#32](https://github.com/Microsoft/PSRule-vscode/issues/32)
- General improvements:
  - Updated options schema to v0.8.0. [#31](https://github.com/Microsoft/PSRule-vscode/issues/31)

## v0.4.0

What's changed since v0.3.0:

- General improvements:
  - Updated options schema to v0.7.0. [#26](https://github.com/Microsoft/PSRule-vscode/issues/26)

## v0.3.0

What's changed since v0.2.0:

- New features:
  - Added highlighting for `Synopsis:` metadata in comments. [#16](https://github.com/Microsoft/PSRule-vscode/issues/16)
  - Added syntax highlighting and snippet for `Recommend` keyword. [#17](https://github.com/Microsoft/PSRule-vscode/issues/17)
  - Added markdown snippet for rule documentation. [#19](https://github.com/Microsoft/PSRule-vscode/issues/19)

## v0.2.0

What's changed since v0.1.0:

- General improvements:
  - Updated options schema to v0.5.0. [#12](https://github.com/Microsoft/PSRule-vscode/issues/12)
- Bug fixes:
  - Fixed CI badge not displaying in VSCode extension tab. [#8](https://github.com/Microsoft/PSRule-vscode/issues/8)
  - Fixed syntax highlighting for keywords that are included in comments. [#10](https://github.com/Microsoft/PSRule-vscode/issues/10)

## v0.1.0

- Initial release.

[ext-preview]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode-preview
[ext-stable]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode
