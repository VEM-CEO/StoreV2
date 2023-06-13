import React, { useState, useEffect } from "react";
import { MantineProvider } from '@mantine/core';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mantine/core";


const CertificateSelect = ({ onSelect }) => {
  const [certificates, setCertificates] = useState([]);

  function parseSerialNumber(serialNumber) {
    const [, , month, year] = serialNumber.split("-");
    const vintageDate = ` ${month}-${year}`;
    return vintageDate;
  }

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("/api/mrets/Certificate", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const parsedCertificates = data.map((certificate) => ({
          id: certificate.id,
          serialNumber: certificate.attributes.serial_number_base,
          serialStart: certificate.attributes.serial_number_start,
          serialEnd: certificate.attributes.serial_number_end,
          vintageDate: parseSerialNumber(
            certificate.attributes.serial_number_base
          ),
          quantity: certificate.attributes.quantity,
          status: certificate.attributes.status,
          accountID: certificate.relationships.account.data.id,
          accountName: certificate.relationships.account.data.name,
          certificateFile: certificate.attributes.certificate_file,
        }));
        setCertificates(parsedCertificates);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertificates();
  }, []);

  const handleChange = (event) => {
    const selectedCertificate = certificates.find(
      (certificate) => certificate.id === event.target.value
    );
    onSelect(selectedCertificate);
  };

  return (
    <FormControl label="Select Certificate">
      <InputLabel>Select Certificate</InputLabel>
      <Select
        placeholder="Select Certificate"
        onChange={handleChange}
        fullWidth
        clearable
      >
        {certificates.map((certificate) => (
          <MenuItem key={certificate.id} value={certificate.id}>
            {certificate.serialNumber}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CertificateSelect;