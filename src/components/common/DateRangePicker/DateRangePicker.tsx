import React from 'react';
import { VStack, FormControl, FormLabel, Input, Text, Box, useColorModeValue } from '@chakra-ui/react';

interface DateRange {
  start: string;
  end: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  title?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange, title }) => {
  const handleDateChange = (field: 'start' | 'end', dateValue: string) => {
    onChange({
      ...value,
      [field]: dateValue
    });
  };

  return (
    <Box>
      {title && (
        <Text fontWeight="500" fontSize="sm" color="gray.600" mb={3}>
          {title}
        </Text>
      )}
      <VStack spacing={3} align="stretch">
        <FormControl>
          <FormLabel htmlFor="start-date" fontSize="sm" color="gray.600">
            Start (YYYY-MM-DD)
          </FormLabel>
          <Input
            id="start-date"
            type="date"
            value={value.start}
            onChange={e => handleDateChange('start', e.target.value)}
            size="sm"
            borderRadius="md"
            color={useColorModeValue('gray.800', 'white')}
            _placeholder={{ color: 'gray.400' }}
            lang="en"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="end-date" fontSize="sm" color="gray.600">
            End (YYYY-MM-DD)
          </FormLabel>
          <Input
            id="end-date"
            type="date"
            value={value.end}
            onChange={e => handleDateChange('end', e.target.value)}
            size="sm"
            borderRadius="md"
            color={useColorModeValue('gray.800', 'white')}
            _placeholder={{ color: 'gray.400' }}
            lang="en"
          />
        </FormControl>
      </VStack>
    </Box>
  );
};
