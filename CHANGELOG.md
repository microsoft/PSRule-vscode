# Change log

All notable changes to this extension will be documented in this file.
This extension is available in two release channels for Visual Studio Code from the Visual Studio Marketplace.
We recommend only installing one channel for the best experience.
Installing both channels may cause unexpected behavior.

- [Preview][ext-preview] - More frequent releases but more likely to contain bugs.
  - _Preview_ is where updates are available before they released to _Stable_.
  - This channel includes changes listed in the _Unreleased_ heading.
  - Versioning for _Preview_ follows an `year.month.revision` that increments for each release.
- [Stable][ext-stable] - Less frequent releases, with more user testing, experimental features are disabled.
  - Uses [semantic versioning](https://semver.org/) to declare changes.
  - Aligned to versioning of PSRule.

Continue reading to see the changes included in the latest version.

## Unreleased

What's changed since v2.9.0:

- New features
  - Automatically acquire PSRule runtime components by @BernieWhite.
    [#1315](https://github.com/microsoft/PSRule-vscode/issues/1315)
    - PSRule runtime support is now included within the extension.
    - Installing PSRule PowerShell module is no longer required for the extension to work.
- General improvements:
  - Updated publisher to be under Microsoft by @BernieWhite.
    [#1215](https://github.com/microsoft/PSRule-vscode/issues/1215)
- Engineering:
  - Updated PSRule schema files.
    [#1209](https://github.com/microsoft/PSRule-vscode/pull/1209)
    [#1261](https://github.com/microsoft/PSRule-vscode/pull/1261)
    [#1314](https://github.com/microsoft/PSRule-vscode/pull/1314)
    [#1330](https://github.com/microsoft/PSRule-vscode/pull/1330)
    [#1344](https://github.com/microsoft/PSRule-vscode/pull/1344)
  - Bump vscode engine to v1.95.0.
    [#1575](https://github.com/microsoft/PSRule-vscode/pull/1575)
  - Bump vscode-languageclient to v9.0.1.
    [#1252](https://github.com/microsoft/PSRule-vscode/pull/1252)
  - Bump fs-extra to v11.2.0.
    [#1298](https://github.com/microsoft/PSRule-vscode/pull/1298)
- Bug fixes:
  - Fixed notification of preview version by @BernieWhite.
    [#1324](https://github.com/microsoft/PSRule-vscode/issues/1324)

## v2.9.0

What's changed since v2.8.0:

- New features:
  - Getting started walkthrough in Visual Studio Code is now generally available by @BernieWhite
    [#1099](https://github.com/microsoft/PSRule-vscode/issues/1099)
  - CodeLens for open or editing documentation for a rule is now generally available by @BernieWhite
    [#1139](https://github.com/microsoft/PSRule-vscode/issues/1139)
  - Added configuration to tune logging for excluded or suppressed rules by @BernieWhite.
    [#1068](https://github.com/microsoft/PSRule-vscode/issues/1068)
    - Use these options to reduce output noise when testing in Visual Studio Code.
    - The `PSRule.execution.ruleExcluded` setting configures excluded rules.
    - The `PSRule.execution.ruleSuppressed` setting configures suppressed rules.
  - Add running analysis to getting started walkthrough by @BernieWhite.
    [#1093](https://github.com/microsoft/PSRule-vscode/issues/1093)
  - **Important:** Added support for new unprocessed object option by @BernieWhite.
    [#1127](https://github.com/microsoft/PSRule-vscode/issues/1127)
    - The `PSRule.execution.unprocessedObject` setting configures what happens when objects are not processed.
    - The `PSRule.execution.notProcessedWarning` setting has been deprecated inline with PSRule support.
    - For more information see [deprecations](https://aka.ms/ps-rule/deprecations#execution-options).
- Engineering:
  - Updated PSRule schema files.
    [#1092](https://github.com/microsoft/PSRule-vscode/pull/1092)
    [#1110](https://github.com/microsoft/PSRule-vscode/pull/1110)
    [#1125](https://github.com/microsoft/PSRule-vscode/pull/1125)
    [#1156](https://github.com/microsoft/PSRule-vscode/pull/1156)
  - Bump vscode engine to v1.78.1.
    [#1146](https://github.com/microsoft/PSRule-vscode/pull/1146)
  - Bump typescript to v5.1.3.
    [#1152](https://github.com/microsoft/PSRule-vscode/pull/1152)
  - Bump and rename vsce package to `@vscode/vsce` v2.19.0 by @BernieWhite.
    [#1090](https://github.com/microsoft/PSRule-vscode/issues/1090)
  - Bump @vscode/test-electron to v2.3.2.
    [#1124](https://github.com/microsoft/PSRule-vscode/pull/1124)

## v2.8.0

What's changed since v2.7.0:

- Engineering:
  - Updated PSRule schema files.
    [#1060](https://github.com/microsoft/PSRule-vscode/pull/1060)
    [#1062](https://github.com/microsoft/PSRule-vscode/pull/1062)
  - Bump vscode engine to v1.76.0.
    [#1036](https://github.com/microsoft/PSRule-vscode/pull/1036)
  - Bump mocha to v10.2.0.
    [#957](https://github.com/microsoft/PSRule-vscode/pull/957)
  - Bump fs-extra to v11.1.1.
    [#1058](https://github.com/microsoft/PSRule-vscode/pull/1058)
  - Bump glob to v8.1.0.
    [#990](https://github.com/microsoft/PSRule-vscode/pull/990)
  - Bump typescript to v5.0.2.
    [#1053](https://github.com/microsoft/PSRule-vscode/pull/1053)
  - Bump minimist to v1.2.8.
    [#1014](https://github.com/microsoft/PSRule-vscode/pull/1014)
  - Bump vscode-languageclient to v8.1.0.
    [#1021](https://github.com/microsoft/PSRule-vscode/pull/1021)
  - Bump @vscode/test-electron to v2.3.0.
    [#1035](https://github.com/microsoft/PSRule-vscode/pull/1035)

## v2.7.0

What's changed since v2.6.0:

- General improvement:
  - Update snippet versions and links by @BernieWhite
    [#955](https://github.com/microsoft/PSRule-vscode/issues/955)
- Engineering:
  - Updated PSRule schema files.
    [#933](https://github.com/microsoft/PSRule-vscode/pull/933)
  - Bump vscode engine to v1.74.0.
    [#952](https://github.com/microsoft/PSRule-vscode/pull/952)
  - Bump fs-extra to v11.1.0.
    [#939](https://github.com/microsoft/PSRule-vscode/pull/939)
  - Bump vsce to v2.15.0.
    [#943](https://github.com/microsoft/PSRule-vscode/pull/943)
  - Bump typescript to v4.9.4.
    [#954](https://github.com/microsoft/PSRule-vscode/pull/954)
  - Bump @vscode/test-electron to v2.2.1.
    [#946](https://github.com/microsoft/PSRule-vscode/pull/946)
- Bug fixes:
  - Fixed extension badge URL by @BernieWhite.
    [#981](https://github.com/microsoft/PSRule-vscode/issues/981)

## v2.6.0

What's changed since v2.5.0:

- Engineering:
  - Updated PSRule schema files.
    [#920](https://github.com/microsoft/PSRule-vscode/pull/920)
  - Bump vscode engine to v1.73.1.
    [#922](https://github.com/microsoft/PSRule-vscode/pull/922)
  - Bump vsce to v2.14.0.
    [#916](https://github.com/microsoft/PSRule-vscode/pull/916)
  - Bump @vscode/test-electron to v2.2.0.
    [#902](https://github.com/microsoft/PSRule-vscode/pull/902)
  - Bump typescript to v4.9.3.
    [#925](https://github.com/microsoft/PSRule-vscode/pull/925)

## v2.5.0

What's changed since v2.4.0:

- General improvements:
  - Added starter pipeline snippet for Azure Pipelines by @BernieWhite.
    [#851](https://github.com/microsoft/PSRule-vscode/issues/851)
  - Added a warning when multiple channels are installed by @BernieWhite.
    [#870](https://github.com/microsoft/PSRule-vscode/issues/870)
    - Installing both the _Preview_ and _Stable_ channels is not supported and may cause issues.
- Engineering:
  - Updated PSRule schema files.
    [#844](https://github.com/microsoft/PSRule-vscode/pull/844)
    [#863](https://github.com/microsoft/PSRule-vscode/pull/863)
  - Bump vscode engine to v1.71.0.
    [#843](https://github.com/microsoft/PSRule-vscode/pull/843)
  - Bump typescript to v4.8.4.
    [#873](https://github.com/microsoft/PSRule-vscode/pull/873)

## v2.4.0

What's changed since v2.3.0:

- General improvements:
  - **Experimental:** Added a walkthrough for getting started with PSRule by @BernieWhite.
    [#771](https://github.com/microsoft/PSRule-vscode/issues/771)
    - Added steps for basic configuration and documentation.
    - To use try this feature, install the preview channel with experimental features enabled.
- Engineering:
  - Updated PSRule schema files.
    [#812](https://github.com/microsoft/PSRule-vscode/pull/812)
  - Bump vscode engine to v1.70.0.
    [#800](https://github.com/microsoft/PSRule-vscode/pull/800)
  - Bump vsce to v2.10.2.
    [#821](https://github.com/microsoft/PSRule-vscode/pull/821)
  - Bump typescript to v4.8.2.
    [#830](https://github.com/microsoft/PSRule-vscode/pull/830)

## v2.3.0

What's changed since v2.2.0:

- General improvements:
  - Added configuration option for baseline by @BernieWhite.
    [#770](https://github.com/microsoft/PSRule-vscode/issues/770)
    - Configure the default baseline in the extension settings.
    - Baseline can be overridden using the `baseline` property on a PSRule task.
- Engineering:
  - Updated PSRule schema files.
    [#767](https://github.com/microsoft/PSRule-vscode/pull/767)
  - Bump vscode-languageclient v8.0.2.
    [#777](https://github.com/microsoft/PSRule-vscode/pull/777)
  - Bum vscode engine to v1.69.1.
    [#797](https://github.com/microsoft/PSRule-vscode/pull/797)

## v2.2.0

What's changed since v2.1.0:

- General improvements:
  - Added command to create options file by @BernieWhite.
    [#662](https://github.com/microsoft/PSRule-vscode/issues/662)
    - From the command palette choose _PSRule: Create options file_.
- Engineering:
  - Bump vscode engine to v1.68.1.
    [#753](https://github.com/microsoft/PSRule-vscode/pull/753)
  - Bump vscode-languageclient from v8.0.1.
    [#703](https://github.com/microsoft/PSRule-vscode/pull/703)
  - Updated PSRule schema files.
    [#743](https://github.com/microsoft/PSRule-vscode/pull/743)

## v2.1.0

What's changed since v2.0.0:

- New features:
  - **Experimental:** CodeLens provides links to open or create rule documentation by @BernieWhite.
    [#227](https://github.com/microsoft/PSRule-vscode/issues/227)
    - Link from rules allows markdown documentation to be created or edited.
    - When existing markdown documentation exists, file is opened in editor.
    - When documentation for a rule does not exist, a new file is created from a snippet.
    - Added settings to configure the location for storing documentation,
      and the snippet used to create documentation.
    - To use try this feature, install the preview channel with experimental features enabled.
- Engineering:
  - Bump fs-extra to v10.1.0.
    [#670](https://github.com/microsoft/PSRule-vscode/pull/670)
  - Updated PSRule schema files.
    [#688](https://github.com/microsoft/PSRule-vscode/pull/688)

## v2.0.0

What's changed since v1.7.0:

- PSRule v2.0.0 support:
  - Added resource snippets for Suppression Groups.
    [#588](https://github.com/microsoft/PSRule-vscode/issues/588)
  - Updated schema to support Suppression Groups.
    [#574](https://github.com/microsoft/PSRule-vscode/issues/574)
  - Updated schema to support convert and case sensitive properties.
    [#626](https://github.com/microsoft/PSRule-vscode/pull/626)
    [#630](https://github.com/microsoft/PSRule-vscode/pull/630)
  - Updated schema to support improved validation of resource names.
    [#638](https://github.com/microsoft/PSRule-vscode/pull/638)
- General improvements:
  - Added resource snippets for JSON and JSONC files.
    [#477](https://github.com/microsoft/PSRule-vscode/issues/477)
  - Improved compatibility with PowerShell extension.
    [#607](https://github.com/microsoft/PSRule-vscode/issues/607)
    - Supports either PowerShell or PowerShell Preview installed for running tasks.
    - If PowerShell extension is not installed or enabled, basic functions are still available.
- Engineering:
  - Added workflow to sync PSRule schemas.
    [#592](https://github.com/microsoft/PSRule-vscode/issues/592)
  - Bump vscode engine to v1.66.0.
    [#653](https://github.com/microsoft/PSRule-vscode/pull/653)
- Bug fixes:
  - Fixed change syntax highlighting on PowerShell files.
    [#495](https://github.com/microsoft/PSRule-vscode/issues/495)

## v1.7.0

What's changed since v1.6.0:

- General improvements:
  - Added `version` language expression. [#539](https://github.com/microsoft/PSRule-vscode/issues/539)
  - Added `hasDefault` language expression. [#540](https://github.com/microsoft/PSRule-vscode/issues/540)
- Engineering:
  - Bump vscode engine to v1.64.0. [#586](https://github.com/microsoft/PSRule-vscode/pull/586)

## v1.6.0

What's changed since v1.5.0:

- General improvements:
  - Added `hasSchema` language expression. [#520](https://github.com/microsoft/PSRule-vscode/issues/520)
- Engineering:
  - Bump vscode engine to v1.63.0. [#508](https://github.com/microsoft/PSRule-vscode/pull/508)

## v1.5.0

What's changed since v1.4.0:

- General improvements:
  - Added `Rule.Baseline` option configuration the default baseline with module configuration.
    [#475](https://github.com/microsoft/PSRule-vscode/issues/475)
  - Added support for resources within `.Rule.json`, `.Rule.jsonc`, and `.Rule.yml` files.
    [#476](https://github.com/microsoft/PSRule-vscode/issues/476)
  - Configured workspace trust.
    [#304](https://github.com/microsoft/PSRule-vscode/issues/304)
    - Currently the extension relies on PowerShell which only works when the workspace is trusted.
- Engineering:
  - Bump vscode engine to v1.62.0.
    [#473](https://github.com/microsoft/PSRule-vscode/pull/473)

## v1.4.0

What's changed since v1.3.0:

- General improvements:
  - Added options schema to support additional options.
    [#395](https://github.com/microsoft/PSRule-vscode/issues/395)
    [#451](https://github.com/microsoft/PSRule-vscode/issues/451)
    - Added support for `Input.IgnoreRepositoryCommon`, `Output.Footer`, `Output.JsonIndent`, and `Rule.IncludeLocal`.
  - Added expressions improvements:
    [#452](https://github.com/microsoft/PSRule-vscode/issues/452)
    - Added `SetOf`, `Subset`, and `Count` set conditions.
    - Added `name`, and `type` properties to `Expression` objects.
- Engineering:
  - Bump vscode engine to v1.61.0.
    [#432](https://github.com/microsoft/PSRule-vscode/pull/432)

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
