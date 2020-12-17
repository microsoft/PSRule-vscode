# PSRule

An extension for IT Pros using the PSRule PowerShell module.

![ci-badge] ![ext-version-badge] ![ext-installs-badge]

This **preview** extension for Visual Studio Code adds convenience features for IT Pros using PSRule.

Features include:

- Snippets and syntax highlighting for built-in keywords.
- Snippets for rule documentation.
- YAML schema validation for options.

## Support

This project uses GitHub Issues to track bugs and feature requests.
Please search the existing issues before filing new issues to avoid duplicates.

- For new issues, file your bug or feature request as a new [Issue][issues].
- For help and questions about using this project, we have a Gitter room which you can join below.

[![Join the chat][chat-badge]][chat]

Support for this project/ product is limited to the resources listed above.

## Installing PSRule module

PSRule is available from the PowerShell Gallery and is required for this extension to work.

To install the module use the following command from PowerShell prompt.

```powershell
Install-Module -Name PSRule -Scope CurrentUser;
```

## Installing the extension

You can install the latest release of the extension by following the steps in the [Visual Studio Code documentation][vscode-ext-gallery]. In the Extensions pane, search for _PSRule_ extension and install it there. You will get notified automatically about any future extension updates.

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

[issues]: https://github.com/Microsoft/PSRule-vscode/issues
[ci-badge]: https://dev.azure.com/bewhite/PSRule-vscode/_apis/build/status/PSRule-vscode-CI?branchName=main
[vscode-ext-gallery]: https://code.visualstudio.com/docs/editor/extension-gallery
[ext]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode-preview
[ext-version-badge]: https://vsmarketplacebadge.apphb.com/version/bewhite.psrule-vscode-preview.svg
[ext-installs-badge]: https://vsmarketplacebadge.apphb.com/installs-short/bewhite.psrule-vscode-preview.svg
[contribution guide]: https://github.com/Microsoft/PSRule-vscode/blob/main/CONTRIBUTING.md
[change log]: https://github.com/Microsoft/PSRule-vscode/blob/main/CHANGELOG.md
[license]: https://github.com/Microsoft/PSRule-vscode/blob/main/LICENSE
[chat]: https://gitter.im/PSRule/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[chat-badge]: https://img.shields.io/static/v1.svg?label=chat&message=on%20gitter&color=informational&logo=gitter
