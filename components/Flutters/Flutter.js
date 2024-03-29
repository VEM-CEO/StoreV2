import { useState } from "react";
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

const Flutter = ({ flutter, setFlutters }) => {
  const { _id, postedAt, body, email, user: flutterUser, likes,notes,company, name, compliance_period,retirement_reason,retirement_type, retired_to,retirement } = flutter;
  const user = useUser();
  const [modalOpened, setModalOpened] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updatingLike, setUpdatingLike] = useState(false);
  const [likesState, setLikesState] = useState(likes);
  const [inputDisabled, setInputDisabled] = useState(false);
  const { classes, theme } = useStyles();

  const form = useForm({
    initialValues: {
      editFlutter: "test",
    },
  });

  const editFlutter = () => {
    form.setFieldValue("editFlutter", body);
    setModalOpened(true);
  };

  const onUpdateFlutter = async (value) => {
    setInputDisabled(true);
    const response = await fetch("/api/flutter", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        body: value.editFlutter,
      }),
    });

    const responseJson = await response.json();

    console.log(responseJson);

    setFlutters((flutters) =>
      flutters.map((flutter) => {
        if (flutter._id === _id) {
          return {
            ...flutter,
            body: value.editFlutter,
          };
        }

        return flutter;
      })
    );

    form.reset();
    setInputDisabled(false);
    setModalOpened(false);
    showSuccess("Your Client has been updated");
  };

  const likeFlutter = async () => {
    setUpdatingLike(true);
    let action = likesState.includes(user.id) ? "$pull" : "$addToSet";

    await fetch("/api/flutter/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        userId: user.id,
        action,
      }),
    });

    setLikesState((likes) => {
      if (likesState.includes(user.id)) {
        return likes.filter((like) => like !== user.id);
      }
      return [...likes, user.id];
    });
    setUpdatingLike(false);
  };

  const deleteFlutter = async () => {
    const response = await fetch(`/api/flutter/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const responseJson = await response.json();
    setDeleted(true);
    console.log(responseJson);
    showSuccess("Your contact has been deleted");
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
    <>
      {!deleted && (
        <>
          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Edit your Contact."
          >
            <form onSubmit={form.onSubmit((value) => onUpdateFlutter(value))}>
              <Textarea
                required
                data-autofocus
                placeholder="Edit your flutter."
                variant="filled"
                className={classes.media}
                {...form.getInputProps("editFlutter")}
              />
              <Group position={"right"} mt={20}>
                <Button type="submit" disabled={inputDisabled}>
                  Update
                </Button>
              </Group>
            </form>
          </Modal>
          <Card withBorder radius="md" className={classes.flutter}>
            <Group>
              <Avatar
                src={flutterUser.picture}
                alt={flutterUser.name}
                radius="xl"
              />
              <div>
                <Text size="sm">company: {company}</Text>
                <Text size="xs" color="dimmed"> Edited at
                  {new Date(postedAt).toLocaleString()}
                </Text>
              </div>
            </Group>

            <Text className={classes.body} size="sm">
              Email: {email}
            </Text>
            <Text className={classes.body} size="sm">
            Retirement type: {retirement_type}
            </Text>

            {/* <Text className={classes.body} size="sm">
            Quanity MW/h: {quanity}
            </Text> */}
            <Text className={classes.body} size="sm">
            retirement_reason: {retirement_reason}
            </Text>
            <Text className={classes.body} size="sm">
            retirement: {retirement}
            </Text>
             <Text className={classes.body} size="sm">
              Notes: {notes}
            </Text>
            
            <Card.Section className={classes.footer}>
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  {likesState ? likesState.length : 0}
                  {` ${
                    likesState.length === 1 ? "Transactions" : "Transaction"
                  } done`}
                </Text>
                <Group spacing={0}>
                  <ActionIcon
                    onClick={() => likeFlutter()}
                    size="lg"
                    loading={updatingLike}
                  >
                    <ShoppingCartPlus 
                      size={18}
                      color={theme.colors.red[6]}
                      className={
                        likesState.includes(user.id) ? classes.liked : null
                      }
                    />
                  </ActionIcon>
                  <Menu
                    control={
                      <ActionIcon size="lg">
                        <Share size={16} color={theme.colors.blue[6]} />
                      </ActionIcon>
                    }
                    transition="fade"
                    position="bottom"
                    placement="start"
                    size="lg"
                  >
                  
                  </Menu>
                  {user.id === flutterUser.id && (
                    <>
                      <ActionIcon
                        onClick={() => editFlutter()}
                        size="lg"
                        sx={(theme) => ({
                          color:
                            theme.colorScheme === "dark"
                              ? theme.colors.green[4]
                              : theme.colors.green[6],
                        })}
                      >
                        <Edit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => deleteFlutter()}
                        size="lg"
                        sx={(theme) => ({
                          color:
                            theme.colorScheme === "dark"
                              ? theme.colors.red[4]
                              : theme.colors.red[6],
                        })}
                      >
                        <Trash size={18} />
                      </ActionIcon>
                    </>
                  )}
                </Group>
              </Group>
            </Card.Section>
          </Card>
        </>
      )}
    </>
  );
};

export default Flutter;
