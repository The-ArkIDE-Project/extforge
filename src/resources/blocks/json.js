import javascriptGenerator from '../javascriptGenerator';
import { registerBlock } from '../register';
import util from '../util';

const categoryPrefix = 'json_';
const categoryColor = '#6cf';

function register() {
    // Parse JSON string into array/object
    registerBlock(`${categoryPrefix}parse`, {
        message0: 'parse JSON %1',
        args0: [
            {
                type: "input_value",
                name: "INPUT",
                check: "String"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT') || '""';
        const code = `JSON.parse(${INPUT})`;
        return [code, 0];
    });

    // Stringify array/object
    registerBlock(`${categoryPrefix}stringify`, {
        message0: 'stringify %1',
        args0: [
            {
                type: "input_value",
                name: "INPUT"
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT') || 'null';
        const code = `JSON.stringify(${INPUT})`;
        return [code, 0];
    });

    // Pick a random element from array
    registerBlock(`${categoryPrefix}pick`, {
        message0: 'pick random from %1',
        args0: [
            {
                type: "input_value",
                name: "ARRAY"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const code = `${ARRAY}[Math.floor(Math.random() * ${ARRAY}.length)]`;
        return [code, 0];
    });

    // Make new array from space-separated list (proper JSON array)
    registerBlock(`${categoryPrefix}fromstring`, {
        message0: 'make JSON array from %1',
        args0: [
            {
                type: "input_value",
                name: "INPUT",
                check: "String"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT') || '""';
        // Split by space, trim, filter out empty strings, wrap in quotes, then stringify
        const code = `JSON.stringify((${INPUT}).split(" ").map(s=>s.trim()).filter(s=>s.length))`;
        return [code, 0];
    });

    // Remove element at index
    registerBlock(`${categoryPrefix}remove`, {
        message0: 'remove index %1 from %2',
        args0: [
            {
                type: "input_value",
                name: "INDEX",
                check: "Number"
            },
            {
                type: "input_value",
                name: "ARRAY"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const INDEX = javascriptGenerator.valueToCode(block, 'INDEX') || '0';
        const code = `(() => { const a = [...${ARRAY}]; a.splice(${INDEX}, 1); return a; })()`;
        return [code, 0];
    });

    // Replace value at index
    registerBlock(`${categoryPrefix}replace`, {
        message0: 'replace index %1 of %2 with %3',
        args0: [
            { type: "input_value", name: "INDEX", check: "Number" },
            { type: "input_value", name: "ARRAY" },
            { type: "input_value", name: "VALUE" }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const INDEX = javascriptGenerator.valueToCode(block, 'INDEX') || '0';
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE') || 'null';
        const code = `(() => { const a = [...${ARRAY}]; a[${INDEX}] = ${VALUE}; return a; })()`;
        return [code, 0];
    });

    // Length of array
    registerBlock(`${categoryPrefix}length`, {
        message0: 'length of %1',
        args0: [
            { type: "input_value", name: "ARRAY" }
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const code = `${ARRAY}.length`;
        return [code, 0];
    });

    // --- Advanced Blocks ---

    // Remove all values equal to X
    registerBlock(`${categoryPrefix}removevalue`, {
        message0: 'remove value %1 from %2',
        args0: [
            { type: "input_value", name: "VALUE" },
            { type: "input_value", name: "ARRAY" }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE') || 'null';
        const code = `(${ARRAY}.filter(v => v !== ${VALUE}))`;
        return [code, 0];
    });

    // Check if array contains value
    registerBlock(`${categoryPrefix}contains`, {
        message0: '%1 contains %2',
        args0: [
            { type: "input_value", name: "ARRAY" },
            { type: "input_value", name: "VALUE" }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE') || 'null';
        const code = `${ARRAY}.includes(${VALUE})`;
        return [code, 0];
    });

    // Concatenate arrays
    registerBlock(`${categoryPrefix}concat`, {
        message0: 'concat %1 and %2',
        args0: [
            { type: "input_value", name: "ARRAY1" },
            { type: "input_value", name: "ARRAY2" }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const A1 = javascriptGenerator.valueToCode(block, 'ARRAY1') || '[]';
        const A2 = javascriptGenerator.valueToCode(block, 'ARRAY2') || '[]';
        const code = `[...${A1}, ...${A2}]`;
        return [code, 0];
    });

    // Slice array from start to end
    registerBlock(`${categoryPrefix}slice`, {
        message0: 'slice %1 from %2 to %3',
        args0: [
            { type: "input_value", name: "ARRAY" },
            { type: "input_value", name: "START", check: "Number" },
            { type: "input_value", name: "END", check: "Number" }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const ARRAY = javascriptGenerator.valueToCode(block, 'ARRAY') || '[]';
        const START = javascriptGenerator.valueToCode(block, 'START') || '0';
        const END = javascriptGenerator.valueToCode(block, 'END') || `${ARRAY}.length`;
        const code = `${ARRAY}.slice(${START}, ${END})`;
        return [code, 0];
    });
}

export default register;
