#!/usr/bin/env node

const { getJsonDescriptions } = require("./mapper");

const { writeTypescriptFile } = require("./typeWriter");
const { sleep } = require("./utils/time");

const { config } = require("./config");

async function run()
{
    if (config.runImmediately) {
        runOnce();
        return;
    }

    while (true)
    {
        runOnce();
        await sleep(8 * 1000);
    }
}

function runOnce()
{
    const jsonDescriptions = getJsonDescriptions(config);
    writeTypescriptFile(jsonDescriptions, config);
}

run()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(`An unexpected error occurred: ${e}`);
        process.exit(1);
    });