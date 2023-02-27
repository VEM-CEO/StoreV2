import React, { useState, useEffect } from 'react';
import {
  UnstyledButton,
  Badge,
  Group,
  Avatar,
  Menu,
  Text,
  createStyles,
  Container,
  Card,
  Title,
  SimpleGrid,
  Textarea,
  Button,
  Paper,
} from "@mantine/core";

import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  space: {
     padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  marginBottom: theme.spacing.sm,
  },

}));



function UserMAccount() {
  const [account, setAccount] = useState([]);
  const [Data, setData] = useState([]);
  

  useEffect(() => {
    fetchAccount();
  },[]);


  const fetchAccount = async () => {
    try {
      const response = await fetch("/api/mrets/open_account/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAccount(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccountClick = async (id) => {
     
    try {
     
      const response = await fetch(`/api/mrets/account/${id}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok ${id}`);
      }

      const data = await response.json();
      showNotification({
        title: "Account Info",
        message: JSON.stringify(data),
        color: "teal",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {account &&
  account.map((accountItem) => (
    <Card key={accountItem.id} shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Text>ID: {accountItem.id}</Text>
      </Card.Section>
      <p>Name: {accountItem.attributes.name}</p>
      <p>Status: {accountItem.attributes.status}</p>
      <p>Created: {accountItem.attributes.created_at}</p>
      <p>short_id: {accountItem.attributes.short_id}</p>
      <Button
        onClick={() => handleAccountClick(accountItem.id)}
        variant="outline"
        color="teal"
      >
        View Account
      </Button>
    </Card>
  ))}
    </>
  );
}
export default UserMAccount