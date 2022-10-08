import React, { useCallback, useMemo } from 'react';
import { createEditor, Editor, Text, BaseEditor } from 'slate';
import { Slate, Editable, withReact, DefaultElement, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { Box, Heading } from '@chakra-ui/react';
import CodeElement from './components/CodeElement';
import isHotkey from 'is-hotkey';

type HotkeyType = {
  [x: string]: string;
};

const RichEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const HOTKEYS: HotkeyType = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+1': 'heading-one',
    'mod+2': 'heading-two',
    'mod+3': 'block-quote',
    'mod+0': 'code',
  };

  const isMarkActive = (editor: BaseEditor, format: any) => {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (editor: BaseEditor, format: any) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <Box minW='500px'>
      <Slate editor={editor} value={initialValue}>
        <Editable
          autoFocus
          spellCheck
          placeholder='Enter some plain text...'
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </Box>
  );
};

const Element = ({ element, ...props }: any) => {
  switch (element.type) {
    case 'code':
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  console.log({ leaf });
  if (leaf?.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf['block-quote']) {
    children = (
      <Box
        as='blockquote'
        sx={{
          borderLeft: '2px solid #ddd',
          marginLeft: '0',
          marginRight: '0',
          paddingLeft: '10px',
          color: '#aaa',
          fontStyle: 'italic',
        }}
      >
        <blockquote>{children}</blockquote>
      </Box>
    );
  }
  if (leaf['heading-one']) {
    children = (
      <Heading as='h1' {...attributes}>
        {children}
      </Heading>
    );
  }
  if (leaf['heading-two']) {
    children = (
      <Heading as='h2' {...attributes}>
        {children}
      </Heading>
    );
  }
  if (leaf.code) {
    children = (
      <Box as='pre'>
        <Box as='code'>{children}</Box>
      </Box>
    );
  }
  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello Folks. This is example paragraph developed with Slate editor, ' }, { text: ' You can type whatever you want here. :)   ', bold: true }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'In this moment you can only custom your text using ' },
      { text: 'bold (cmd+b), ', bold: true },
      { text: 'italic (cmd+i), ', italic: true },
      { text: 'heading one (cmd+1), ', ['heading-one']: true },
      { text: 'heading two (cmd+2), ', ['heading-two']: true },
      { text: 'Block quote paragraph (cmd+3)', ['block-quote']: true },
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: `Try it out for yourself` }],
  },
];

export default RichEditor;
