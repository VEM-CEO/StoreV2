import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { createStyles, Avatar, Group, Textarea, Button, TextInput, Box, NativeSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  flutter: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  createFlutter: {
    justifyContent: "center",
  },
  media: {
    width: "50vw",
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      width: "25vw",
    },
  },
}));

const CreateFlutter = ({ setFlutters }) => {
  const user = useUser();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      company: " ",
      flutter: "",
      email: " ",
      retirement: 'Beneficial Ownership',
    },
  });
  const [inputDisabled, setInputDisabled] = useState(false);

  const onSubmitFlutter = async (value) => {
    setInputDisabled(true);
    const flutter = {
      postedAt: Date.now(),
      body: value.flutter,
      email: value.email,
      retirement: value.retirement,
      company: value.company,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      
      },
    };
    const response = await fetch("/api/flutter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flutter),
    });

    const responseJson = await response.json();

    setFlutters((flutters) => [
      {
        _id: responseJson.insertedId,
        ...flutter,
      },
      ...flutters,
    ]);
    form.reset();
    setInputDisabled(false);
    showSuccess();
  };

  const showSuccess = () => {
    showNotification({
      title: "Success",
      message: "Contact has been created",
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
    <Group position={"center"} mt={10} mb={20}>
      <Avatar src={user.picture} alt={user.name} radius="xl" /><h1> Create New client</h1>
      <form onSubmit={form.onSubmit((value) => onSubmitFlutter(value))}>
        <Group>
        <TextInput
          withAsterisk
          label="Company Name"
          placeholder="Company"
          {...form.getInputProps('company')}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        <NativeSelect
        data={[
    'Beneficial Ownership', 
    'Green-e Energy', 
    'RPS/Compliance', 
    'Municipal Renewable Portfolio Standard (Compliance)', 
    'Federal Renewable Energy Requirement'
  ]}
      label="Select Retirement Type"
      description=""
      withAsterisk
      {...form.getInputProps("retirement")}
    />
          
        <Textarea
            required
            placeholder="Add additional notes..."
            variant="filled"
            className={classes.media}
            {...form.getInputProps("flutter")}
          />
          
          <Button type="submit" disabled={inputDisabled}>
            Add New Client
          </Button>
        </Group>
      </form>
    </Group>
  );
};

export default CreateFlutter;
