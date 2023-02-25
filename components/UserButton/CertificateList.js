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
  

  const handleModalClose = () => setModalOpen(false);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/mrets/Certificate");
  
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

  const handleFetchCertificate = (id) => {
    fetch(
      `https://api-sandbox.mrets.org/v1/public/rec/certificates/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          "X-Api-Key": process.env.MRETS_API_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCertificateData(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      {certificates &&
        certificates.map((certificate) => (
          <div key={certificate.id}>
            <Card withBorder radius="md">
              <p>id: {certificate.id}</p>
              <p>
                Serial Number: {certificate.attributes.serial_number_base}
              </p>
              <p>Vintage Date: {certificate.attributes.vintage_date}</p>
              <p>Quantity: {certificate.attributes.quantity}</p>
              <p>certificate_type: {certificate.attributes.certificate_type}</p>
              <p>certificate_type: {certificate.attributes.fuel_type}</p>
              <Button
                onClick={() => handleFetchCertificate(certificate.id)}
              >
                Fetch Certificate
              </Button>
            </Card>
          </div>
        ))}
      {certificateData && (
        <Modal onClose={() => setCertificateData(null)} opened>
          <Card withBorder radius="md">
            <p>Certificate Data:</p>
            <p>{JSON.stringify(certificateData)}</p>
          </Card>
        </Modal>
      )}
    </>
  );
}
export default CertificateList;