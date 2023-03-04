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
  PortalProvider,
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
  const [certificateContent, setCertificateContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  
  function parseSerialNumber(serialNumber) {
    const [, , month, year] = serialNumber.split("-");
    const vintageDate = ` ${month}-${year}`;
    return vintageDate;
  }

  const handleModalClose = () => setModalOpen(false);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/mrets/Certificate",{
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
  };

  useEffect(() => {
    fetchCertificates();
  }, []);


  return (
    <>
      {certificates &&
        certificates.map((certificate) => (
          <div key={certificate.id}>
            <Card withBorder radius="md">
              <Text><strong>id:</strong> {certificate.id}</Text>
              <Text><strong>Serial Number:</strong> {certificate.attributes.serial_number_base}</Text>
              <Text><strong>Serial Start:</strong> {certificate.attributes.serial_number_start}</Text>
              <Text><strong>Serial End:</strong> {certificate.attributes.serial_number_end}</Text>
              <Text><strong>Vintage Date:</strong> {parseSerialNumber(certificate.attributes.serial_number_base)}</Text>
              <Text><strong>Quantity:</strong> {certificate.attributes.quantity}</Text>
              <Text><strong>Status:</strong> {certificate.attributes.status}</Text>
             

             
            </Card>
          </div>
        ))}
      {certificateData && (
        <Modal onClose={() => setCertificateData(null)} opened>
          <Card withBorder radius="md">
            <Text>Certificate Data:</Text>
            <Text>{JSON.stringify(certificateData)}</Text>
          </Card>
        </Modal>
      )}
    </>
  );
}
export default CertificateList;