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
  NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  title: {
    color: theme.white,
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  Text: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.md,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    '& + &': {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan('sm')]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));




const RetirementAccounts = ({setNewAccount}) => {
  const [account, setAccount] = useState([]);
  const [Data, setData] = useState([]);
  
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      name: " ",
      account_type:'Active', 
    },
  });

  const [inputDisabled, setInputDisabled] = useState(false);
  
  


  useEffect(() => {
    fetchAccount();
  },[]);


  const fetchAccount = async () => {
    try {
      const response = await fetch("/api/mrets/retirement_account/");
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
      const response = await fetch(`/api/mrets/close_account?id=${id}`, {
        method: 'PUT'
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
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
    <Card key={accountItem.id} withBorder radius="xl" >
    
        <Text className={classes.title} >ID: {accountItem.id}</Text>
     
      <Text><strong>Name:</strong> {accountItem.attributes.name}</Text>
      <Text><strong>Status:</strong> {accountItem.attributes.status}</Text>
      <Text><strong>Created:</strong> {accountItem.attributes.created_at}</Text>
      <Text><strong>short_id:</strong> {accountItem.attributes.short_id}</Text>
      
      <Button
        onClick={() => handleAccountClick(accountItem.id)}
        variant="outline"
        color="red"
      >
        Close Account
      </Button>
    </Card>
  ))}
    </>
  );
}
export default RetirementAccounts