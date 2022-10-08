import { CodeElementProps } from '@/types/component';
import { Box } from '@chakra-ui/react';

const CodeElement = ({ children, attributes, ...props }: CodeElementProps) => {
  return (
    <Box as='pre' {...attributes}>
      <Box as='code'>{children}</Box>
    </Box>
  );
};

export default CodeElement;
