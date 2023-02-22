import React, { useState, useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import {
  createStyles,
  Text,
  Avatar,
  Group,
  Card,
  ActionIcon,
  Modal,
  Menu,
  Textarea,
  Button,
} from "@mantine/core";
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
  flutter: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    marginBottom: theme.spacing.sm,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },

  liked: {
    fill: theme.colors.red[6],
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  // const baseUrl = process.env.MRETS_BASE_URL

  useEffect(() => {
    fetch(  "https://api-sandbox.mrets.org/v1/public/rec/certificates", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/pdf',
          'X-Api-Key': "rkQVa8X1ra3jkF6opuNz7VVK",
      }}
    )
      .then(response => response.json())
      .then(data => setCertificates(data.data))
      .catch(error => console.error(error));
  }, []);

  return (
    
    <>
    {certificates &&
      certificates.map((certificate) => (
        <div key={certificate.id}>
          <Card withBorder radius="md">
            <p>Serial Number: {certificate.attributes.serial_number_base}</p>
            <p>Vintage Date: {certificate.attributes.vintage_date}</p>
            <p>Quantity: {certificate.attributes.quantity}</p>
          </Card>
        </div>
      ))}
  </>
);
}


export default CertificateList;