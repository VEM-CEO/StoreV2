import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mantine/core';
import Flutter from './Flutter';

const flutterSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const companies = flutters.map((flutter) => flutter.company);
  const options = companies.map((company) => ({ flutters: company, label: company }));

  useEffect(() => {
    // Do something with the selected option
    console.log(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <Select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
        {options.map((option) => (
          <MenuItem key={option._id} value={option.flutters}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Flutter selectedOption={selectedOption} />
    </div>
  );
};

export default flutterSelect;