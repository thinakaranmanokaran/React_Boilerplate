const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('React boilerplate extension is now active!');

    // Listen to new file creation
    vscode.workspace.onDidCreateFiles(async (event) => {
        for (const file of event.files) {
            if (file.fsPath.endsWith('.jsx')) {
                const fileName = path.basename(file.fsPath, '.jsx');

                const boilerplate = `import React from 'react';

const ${fileName} = () => {
    return (
        <div>${fileName}</div>
    )
}

export default ${fileName};
`;

                const document = await vscode.workspace.openTextDocument(file);
                const edit = new vscode.WorkspaceEdit();
                edit.insert(file, new vscode.Position(0, 0), boilerplate);
                await vscode.workspace.applyEdit(edit);
                await document.save();
            }
        }
    });
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
