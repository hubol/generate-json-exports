const fs = require("fs");
const { getDirectory, createDirectory, getRelativePath } = require("./utils/file");

function writeTypescriptFile(soundDescriptions, config)
{
    createDirectory(getDirectory(config.definitionDestFilePath));
    const newTypescriptText = composeTypescriptText(soundDescriptions, config);
    if (fs.existsSync(config.definitionDestFilePath))
    {
        const currentTypescriptText = fs.readFileSync(config.definitionDestFilePath).toString();
        if (currentTypescriptText === newTypescriptText)
            return;
    }

    console.log(`Writing ${config.definitionDestFilePath}...`);
    fs.writeFileSync(config.definitionDestFilePath, newTypescriptText);
}

function composeTypescriptText(textureDescriptions, config)
{
    const typescriptDirectory = getDirectory(config.definitionDestFilePath);
    let text = "";

    textureDescriptions.forEach(x => {
        const importName = `${x.typedName}_json`;
        text += `import * as ${importName} from "${getRelativePath(typescriptDirectory, x.sourceFilePath)}"
export const ${x.typedName} = ${importName};

`;
    });

    return text;
}

module.exports = { writeTypescriptFile };