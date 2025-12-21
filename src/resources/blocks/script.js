import javascriptGenerator from '../javascriptGenerator';
import { registerBlock } from '../register';
import util from '../util';

const categoryPrefix = 'script_';
const categoryColor = '#9d5';

function register() {
    registerBlock(`${categoryPrefix}evalb`, {
        message0: 'eval %1',
        args0: [
            {
                "type": "field_input",
                "name": "INPUT",
                "check": "String",
                "text": "alert(\"hi\")",
                "acceptsBlocks": true
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT');
        const code = `eval(${INPUT})`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}evalv`, {
        message0: 'eval %1',
        args0: [
            {
                "type": "field_input",
                "name": "INPUT",
                "check": "String",
                "text": "Math.random()",
                "acceptsBlocks": true
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT');
        const code = `eval(${INPUT})`;
        return [code, 0];
    })

    registerBlock(`${categoryPrefix}logb`, {
        message0: '%1 %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "LOG_TYPE",
                "options": [
                    ["log", "log"],
                    ["warn", "warn"],
                    ["error", "error"],
                    ["info", "info"]
                ]
            },
            {
                "type": "field_input",
                "name": "INPUT",
                "check": "String",
                "text": "\"hello\"",
                "acceptsBlocks": true
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const LOG_TYPE = block.getFieldValue('LOG_TYPE');
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT');
        const code = `console.${LOG_TYPE}(${INPUT})`;
        return `${code}\n`;
    })
}

export default register;