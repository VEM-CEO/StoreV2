import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Button, Select, TextInput, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

function OrderForm() {
  const form = useForm({
    initialValues: {
      body: '',
      email: '',
      retirement: '',
      company: '',
      energy_usage: 0,
      certificate: '',
      openAccount: '',
      retirementAccount: '',
  
    },
  });

  const theme = useMantineTheme();
  const [documents, setDocuments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [openAccounts, setOpenAccounts] = useState([]);
  const [retirementAccounts, setRetirementAccounts] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({ company: '' });
  const [selectedOpenAccount, setSelectedOpenAccount] = useState();
  const [selectedRetirementAccount, setSelectedRetirementAccount] = useState();

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch('/api/flutter/', {
          method: 'GET',
        });
        const data = await response.json();
        console.log('Documents:', data);
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
        const response = await fetch('/api/mrets/Certificate', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCertificates(data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    }

    fetchCertificates();
  }, []);

  useEffect(() => {
    async function fetchOpenAccounts() {
      try {
        const response = await fetch('/api/mrets/open_account', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOpenAccounts(data);
      } catch (error) {
        console.error('Error fetching open accounts:', error);
      }
    }

    fetchOpenAccounts();
  }, []);

  useEffect(() => {
    async function fetchRetirementAccounts() {
      try {
        const response = await fetch('/api/mrets/retirement_account', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setRetirementAccounts(data);
      } catch (error) {
        console.error('Error fetching retirement accounts:', error);
      }
    }

    fetchRetirementAccounts();
  }, []);

  const handleSelectChange = (value) => {
    const selectedDoc = documents.find((document) => document.company === value);
    setSelectedDocument(selectedDoc);

    if (selectedDoc) {
      form.setValues({
        ...form.values,
        body: selectedDoc.body,
        email: selectedDoc.email,
        retirement: selectedDoc.retirement_type,
        notes: selectedDoc.notes,
        company: selectedDoc.company,
        energy_usage: selectedDoc.energy_usage,
        certificate: selectedDoc.certificate,
        retirement_reason: selectedDoc.retirement_reason,
      });
    }
  };

  const handleCertificateChange = (value) => {
    form.setFieldValue('certificate', value);
  };

  const handleOpenAccountChange = (value) => {
    const selectedAccount = openAccounts.find((account) => account.id === value);
    setSelectedOpenAccount(selectedAccount);

    if (selectedAccount) {
      form.setValues({
        ...form.values,
        openAccount: selectedAccount.id,
      });
    }
  };

  const handleRetirementAccountChange = (value) => {
    const selectedAccount = retirementAccounts.find((account) => account.id === value);
    setSelectedRetirementAccount(selectedAccount);

    if (selectedAccount) {
      form.setValues({
        ...form.values,
        retirementAccount: selectedAccount.id,
      });
    }
  };

  const handleSubmit = async (values) => {
    try {
      const requestData = {
        data: {
          type: 'user_transactions',
          attributes: {
            transaction_type: 'retirement',
            retirement_type: values.retirement,
            notes: values.notes,
            retirement_reason: values.retirement_reason,
            retired_to: values.company,
            retired_quarter: values.quarter,
            compliance_period: values.compliance_period,
            open_account: values.openAccount,
            retirement_account: values.retirementAccount,
          },
          relationships: {
            retirement_option: {
              data: {
                type: values.retirement,
              },
            },
          },
        },
      };

      const response = await fetch('/api/flutter/recs/userTransactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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

    <Select
      label="Select an Open Account"
      placeholder="Select an Open Account"
      value={form.values.openAccount}
      onChange={(value) => handleOpenAccountChange(value)}
      data={openAccounts.map((account) => ({
        value: account.id,
        label: account.name,
      }))}
      id="open-account-select"
      
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

      <Select
        label="Select Retirement Account"
        placeholder="Select a retirement account"
        value={form.values.retirementAccount} 
        onChange={handleRetirementAccountChange} 
        data={retirementAccounts.map((account) => ({
          value: account.id,
          label: account.name,
        }))}
        id="retirement-account-select"
        {...form.getInputProps('retirementAccount')}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default OrderForm;