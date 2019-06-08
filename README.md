# PSRule

An extension for IT Pros using the PSRule PowerShell module.

![ci-badge] ![ext-version-badge] ![ext-installs-badge]

This **preview** extension for Visual Studio Code adds convenience features for IT Pros using PSRule.

Features include:

- Snippets and syntax highlighting for built-in keywords.
- Snippets for rule documentation.
- YAML schema validation for options.

## Disclaimer

This project is to be considered a **proof-of-concept** and **not a supported product**.

If you have any problems please check our GitHub [issues](https://github.com/BernieWhite/PSRule-vscode/issues) page. If you do not see your problem captured, please file a new issue and follow the provided template.

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

## Maintainers

- [Bernie White](https://github.com/BernieWhite)

## License

This project is [licensed under the MIT License](LICENSE).

[ci-badge]: https://dev.azure.com/bewhite/PSRule-vscode/_apis/build/status/PSRule-vscode-CI?branchName=master
[vscode-ext-gallery]: https://code.visualstudio.com/docs/editor/extension-gallery
[ext]: https://marketplace.visualstudio.com/items?itemName=bewhite.psrule-vscode-preview
[ext-version-badge]: https://vsmarketplacebadge.apphb.com/version/bewhite.psrule-vscode-preview.svg
[ext-installs-badge]: https://vsmarketplacebadge.apphb.com/installs-short/bewhite.psrule-vscode-preview.svg
