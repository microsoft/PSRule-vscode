# PSRule

Validate infrastructure as code (IaC) and DevOps repositories using the PSRule PowerShell module.
PSRule is powerful, feature rich, and highly customizable to meet your needs.

![ext-stable-version-badge] ![ext-stable-installs-badge] ![module-version-badge]

This extension is available in two release channels:

Channel | Description | Version/ downloads
------- | ----------- | ---
[Preview][ext-preview] | More frequent releases but more likely to contain bugs. | [![Preview][ext-preview-version-badge]][ext-preview] ![ext-preview-installs-badge]
[Stable][ext-stable] | Less frequent releases, with more user testing, experimental features are disabled. | [![Stable][ext-stable-version-badge]][ext-stable] ![ext-stable-installs-badge]

## Features

### IntelliSense

<p align="center">
  <img src="https://raw.githubusercontent.com/microsoft/PSRule-vscode/main/docs/images/options-schema-flyout.png" alt="Options suggestion context menu" />
</p>

- Adds IntelliSense and validation support for configuring options and resources.
  - **Workspace options** &mdash; use IntelliSense to configure options for the workspace.
    - Type or trigger IntelliSense with `Ctrl+Space` from `ps-rule.yaml`.
  - **Create resources** &mdash; define _baselines_ and _selectors_ by using pre-built snippets and IntelliSense.

<p align="center">
  <img src="https://raw.githubusercontent.com/microsoft/PSRule-vscode/main/docs/images/snippet-rule-type.png" alt="Rule definition snippet" />
</p>

- Adds snippets for defining new rules.
  - **Define rules** with snippets and IntelliSense support.
    - Trigger IntelliSense by typing `rule` in a `.Rule.ps1` file.
    IntelliSense can also be triggered by using the shortcut `Ctrl+Space`.

<p align="center">
  <img src="https://raw.githubusercontent.com/microsoft/PSRule-vscode/main/docs/images/snippet-markdown.png" alt="Rule markdown documentation snippet" />
</p>

- Adds snippets for creating markdown documentation.
  - **Quick documentation**  &mdash; create rule documentation to provide rule recommendations and examples.
    - Trigger IntelliSense by typing `rule` in a `.md` file.
    IntelliSense can also be triggered by using the shortcut `Ctrl+Space`.

## Support

This project uses GitHub Issues to track bugs and feature requests.
Please search the existing issues before filing new issues to avoid duplicates.

- For new issues, file your bug or feature request as a new [issue].
- For help, discussion, and support questions about using this project, join or start a [discussion].

Support for this project/ product is limited to the resources listed above.

## Installing PSRule module

PSRule is available from the PowerShell Gallery and is required for this extension to work.

To install the module use the following command from a PowerShell prompt.

```powershell
Install-Module -Name PSRule -Scope CurrentUser;
```

## Installing the extension

You can install the latest release of the extension by following the steps in the [Visual Studio Code documentation][vscode-ext-gallery].
In the Extensions pane, search for _PSRule_ extension and install it there.
You will get notified automatically about any future extension updates.

```text
code --install-extension bewhite.psrule-vscode-preview
```

> NOTE: If you are using VS Code Insiders, the command will be `code-insiders`.

## Contributing

This project welcomes contributions and suggestions.
If you are ready to contribute, please visit the [contribution guide].

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Maintainers

- [Bernie White](https://github.com/BernieWhite)

## License

This project is [licensed under the MIT License][license].

[issue]: https://github.com/Microsoft/PSRule-vscode/issues
[discussion]: https://github.com/microsoft/PSRule-vscode/discussions
[ci-badge]: https://dev.azure.com/bewhite/PSRule-vscode/_apis/build/status/PSRule-vscode-CI?branchName=main
[vscode-ext-gallery]: https://code.visualstudio.com/docs/editor/extension-gallery
[ext-preview]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode-preview
[ext-preview-version-badge]: https://vsmarketplacebadge.apphb.com/version/bewhite.psrule-vscode-preview.svg
[ext-preview-installs-badge]: https://vsmarketplacebadge.apphb.com/installs-short/bewhite.psrule-vscode-preview.svg
[ext-stable]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode
[ext-stable-version-badge]: https://vsmarketplacebadge.apphb.com/version/bewhite.psrule-vscode.svg
[ext-stable-installs-badge]: https://vsmarketplacebadge.apphb.com/installs-short/bewhite.psrule-vscode.svg
[module-version-badge]: https://img.shields.io/powershellgallery/v/PSRule.svg?label=PowerShell%20Gallery&color=brightgreen
[contribution guide]: https://github.com/Microsoft/PSRule-vscode/blob/main/CONTRIBUTING.md
[change log]: https://github.com/Microsoft/PSRule-vscode/blob/main/CHANGELOG.md
[license]: https://github.com/Microsoft/PSRule-vscode/blob/main/LICENSE
[chat]: https://gitter.im/PSRule/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[chat-badge]: https://img.shields.io/static/v1.svg?label=chat&message=on%20gitter&color=informational&logo=gitter
