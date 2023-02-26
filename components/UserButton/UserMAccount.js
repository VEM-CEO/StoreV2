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
import { ChevronRight, Logout } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  Edit,
  Trash,
  ShoppingCartPlus ,
  Share,
  BrandTwitter,
  Check,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  space: {
     padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  marginBottom: theme.spacing.sm,
  },

}));



function UserMAccount() {
    const [account, setAccount] = useState([]);

      useEffect(() => {
        fetchAccount();
      }, []);

    
    const fetchAccount = async () => {
        try {
        const response = await fetch("/api/mrets/account/")
        if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          const data = await response.json();
          setAccount(data);
        } catch (error) {
          console.error(error);
        }
    };

  


return (
    <>
    { account && 
        account.map((file) => (
            <Card key={file.id} shadow="sm" p="lg" radius="md" withBorder >
                <Card.Section>
                
                  <Text>ID: {file.id}</Text>
                  
                  </Card.Section>
                  
                <p>Name: {file.attributes.name}</p>
                <p> Status: {file.attributes.status}</p>
                <p> Created: {file.attributes.created_at}</p>
                <p>short_id: {file.attributes.short_id}</p>
                
            
            
            
            </Card>
        ))}
    </>
)


}
export default UserMAccount;