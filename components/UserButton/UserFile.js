import { useUser } from "../../context/UserContext";
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
} from "@mantine/core";
import { ChevronRight, Logout } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 34,
      fontWeight: 900,
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
  }));

const UserFile = ({ ...others }) => {
    const user = useUser();
    const { classes, theme } = useStyles();
    
  return (
    <Card  shadow="md" radius="md"  p="xl">
    <Container size="lg" py="xl">
        <Group position="center">
        <Badge variant="filled" size="lg">
          User Profile
        </Badge>
      </Group>
    
    <Title order={2} className={classes.title} align="center" mt="sm">
        Name
      </Title>

      <Text color="dimmed" className={classes.description} align="center" mt="md">
       {user.name}
      </Text>


      <Title order={2} className={classes.title} align="center" mt="sm">
        Email
      </Title>

      <Text color="dimmed" className={classes.description} align="center" mt="md">
       {user.email}
      </Text>
      

     
   </Container>
   </Card>
  );
}

export default UserFile;