import { useUser } from "../../context/UserContext";
import { useState } from "react";
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
} from "@mantine/core";
import { ChevronRight, Logout } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  Edit,
  Trash,
  Heart,
  Share,
  BrandTwitter,
  Check,
} from "tabler-icons-react";




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

  const UserFile = ({ userFile, setUserFile }) => {
    const { _id, email,name,nickname} = userFile;
    const user = useUser();
    const { classes, theme} = useStyles();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);

    const form = useForm({
        initialValues: {
            editNickName: "",
        },
      });
    
      const editNickName = () => {
        form.setFieldValue("editNickname",nickname);
        setModalOpened(true);
      };

    const onUpdateUser = async (value) => {
      setInputDisabled(true);
        const response = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
               },
                body: JSON.stringify({
                _id,
                nickname: value.editNickName,
                }),
            }); 

    const responseJson = await response.json()

    console.log(responseJson);
    
    setUserFile((file) => {
        if (Array.isArray(file)) {
            return file.map((UserFile) => {
                if (userFile._id === _id){
                    return{
                        ...UserFile,
                        nickname: value.editNickName,
                    };
                }
                return UserFile;
            });
        }
        return file;
    });

    form.reset();
    setInputDisabled(false);
    setModalOpened(false);
    showSuccess("Your User File has been updated");
    };



    const showSuccess = (message) => {
        showNotification({
          title: "Success",
          message,
          icon: <Check size={18} />,
          autoClose: 5000,
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.green[6],
            },
          }),
        });
      };

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
       {name}
      </Text>
      <Title order={2} className={classes.title} align="center" mt="sm">
        NickName
      </Title>
      <Text color="dimmed" className={classes.description} align="center" mt="md">
       {nickname}
      </Text>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Email
      </Title>

      <Text color="dimmed" className={classes.description} align="center" mt="md">
       {email}
      </Text>
      
      <form onSubmit={form.onSubmit((value) =>onUpdateUser(value))}>
              <Textarea
                required
                data-autofocus
                placeholder="Edit your Nickname"
                variant="filled"
                className={classes.media}
                {...form.getInputProps("editNickName")}
              />

<Group position={"right"} mt={20}>
                <Button type="submit" disabled={inputDisabled}>
                  Update NickName
                </Button>
              </Group>
            </form>
     
   </Container>
   </Card>
  );
};

export default UserFile;