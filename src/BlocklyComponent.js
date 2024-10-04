import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core'; // Import the core Blockly library
import { javascriptGenerator } from 'blockly/javascript'; // Import the JavaScript generator
import 'blockly/blocks'; // Import all built-in blocks (including math_arithmetic and others)
import 'blockly/javascript'; // Import JavaScript generators for the built-in blocks

// Define custom blocks
Blockly.Blocks['controls_if'] = {
  init: function () {
    this.appendValueInput("IF")
      .setCheck("Boolean")
      .appendField("if");
    this.appendStatementInput("DO")
      .appendField("do");
    this.setInputsInline(false);
    this.setColour(210);
    this.setTooltip("If block");
    this.setHelpUrl("");
  },
};

// Define a variable block
Blockly.Blocks['variables_set'] = {
  init: function () {
    this.appendValueInput("VALUE")
      .setCheck(null)
      .appendField("set")
      .appendField(new Blockly.FieldVariable("item"), "VAR")
      .appendField("to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip("Set a variable");
    this.setHelpUrl("");
  },
};

// Define a block for numbers
Blockly.Blocks['math_number'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("number")
      .appendField(new Blockly.FieldNumber(0), "NUM");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("A number");
    this.setHelpUrl("");
  },
};

// Define a block for addition
Blockly.Blocks['math_add'] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck("Number")
      .appendField("add");
    this.appendValueInput("B")
      .setCheck("Number")
      .appendField("and");
    this.setOutput(true, "Number");
    this.setColour(230);
    this.setTooltip("Add two numbers");
    this.setHelpUrl("");
  },
};

// Define a logic comparison block
Blockly.Blocks['logic_compare'] = {
  init: function () {
    this.appendValueInput("A")
      .setCheck(null)
      .appendField(new Blockly.FieldDropdown([["equal to", "EQ"], ["not equal to", "NEQ"], ["greater than", "GT"], ["less than", "LT"]]), "OP");
    this.appendValueInput("B")
      .setCheck(null);
    this.setOutput(true, "Boolean");
    this.setColour(210);
    this.setTooltip("Compare two values");
    this.setHelpUrl("");
  },
};

const BlocklyComponent = () => {
  const blocklyDivRef = useRef(null);

  useEffect(() => {
    const workspace = Blockly.inject(blocklyDivRef.current, {
      toolbox: document.getElementById('toolbox'),
    });

    // Add an event listener to capture changes in the workspace
    workspace.addChangeListener((event) => {
      if (event.type === Blockly.Events.BLOCK_CHANGE) {
        const code = javascriptGenerator.workspaceToCode(workspace);
        console.log('Generated JavaScript Code:', code);
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <h1 className="text-white text-3xl font-bold mb-4">Blockly Editor</h1>
      <div className="blocklyDiv border-4 border-white rounded-lg shadow-lg" ref={blocklyDivRef} style={{ height: '480px', width: '600px' }}></div>
      <xml id="toolbox" style={{ display: 'none' }}>
        <category name="Control" colour="#5C6BC0">
          <block type="controls_if"></block>
        </category>
        <category name="Variables" colour="#AB47BC">
          <block type="variables_set"></block>
        </category>
        <category name="Math" colour="#42A5F5">
          <block type="math_number"></block>
          <block type="math_add"></block>
        </category>
        <category name="Logic" colour="#66BB6A">
          <block type="logic_compare"></block>
        </category>
      </xml>
    </div>
  );
};

export default BlocklyComponent;
