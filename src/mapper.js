const { toPascalCase } = require("./utils/pascalCaser");
const { getAllFiles, getRelativePath } = require("./utils/file");

function getJsonDescriptions(config)
{
    return getAllFiles(config.jsonSourceDirectoryPath)
        .filter(x => x.endsWith(".json"))
        .map(x => toTextureDescription(x, config.jsonSourceDirectoryPath));
}

function toTextureDescription(textureFilePath, sourceDirectoryPath)
{
    const textureFileName = getRelativePath(sourceDirectoryPath, textureFilePath);
    const textureFileNameNoExtension = textureFileName.replace(/\.[^/.]+$/, "");
    const pascalCasedName = toPascalCase(textureFileNameNoExtension);

    return {
        typedName: pascalCasedName,
        sourceFilePath: textureFilePath
    };
}

module.exports = { getJsonDescriptions };