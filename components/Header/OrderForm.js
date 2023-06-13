import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Button, Select, TextInput, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

function OrderForm() {
  const form = useForm({
    initialValues: {
      body: "",
      email: "",
      retirement: "",
      company: "",
      energy_usage: 0,
      certificate: "",
    }
  });

  const theme = useMantineTheme();
  const [documents, setDocuments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({ company: "" });

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/flutter/', {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }

    fetchDocuments();
  }, []);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await fetch("/api/mrets/Certificate", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCertificates();
  }, []);

  const handleSelectChange = (value) => {
    const selectedDoc = documents.find((document) => document.company === value);
    setSelectedDocument(selectedDoc);

    if (selectedDoc) {
      form.setValues({
        ...form.values,
        body: selectedDoc.body,
        email: selectedDoc.email,
        retirement_type: selectedDoc.retirement,
        company: selectedDoc.company,
      });
    }
  };

  const handleCertificateChange = (value) => {
    form.setFieldValue('certificate', value);
  };

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Title>Retire REC for Client</Title>

      <Select
        label="Select a Client"
        placeholder="Select a Client"
        value={selectedDocument ? selectedDocument.company : null}
        onChange={handleSelectChange}
        data={documents.map((document) => ({
          value: document.company,
          label: document.company,
        }))}
        id="document-select"
      />

      <TextInput
        type="number"
        label="Energy Consumption in MW/h"
        placeholder="Energy Consumption in MW/h"
        {...form.getInputProps('energy_usage')}
      />

      <Select
        label="Select Certificate"
        placeholder="Select a certificate"
        value={form.values.certificate}
        onChange={handleCertificateChange}
        data={certificates.map((certificate) => ({
          value: certificate.attributes.serial_number_base,
          label: certificate.attributes.serial_number_base,
        }))}
        id="certificate-select"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default OrderForm;
