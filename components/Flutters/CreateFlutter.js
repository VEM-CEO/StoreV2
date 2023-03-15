import { useRef, useState } from 'react';
import { useUser } from "../../context/UserContext";
import { createStyles, Group, Textarea, Button, TextInput, Box, NativeSelect,NumberInput,Select,Space } from "@mantine/core";
import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches} from "@mantine/form";
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
      notes: "",
      email: " ",
      retirement: '',
      name: "",
      retirement_reason: "",
      compliance_period: "",
      retired_to: '',
      retirement_type:'',
    },
   
  });
  const [inputDisabled, setInputDisabled] = useState(false);
  const [reason, setReason] = useState("");
  
  function handleReasonChange(value) {
    setReason(value);
  }

  const onSubmitFlutter = async (value) => {
    setInputDisabled(true);
    const flutter = {
      postedAt: Date.now(),
      notes: value.notes,
      email: value.email,
      company: value.company,
      name: value.name,
      retirement_reason: value.retirement_reason,
      compliance_period: value.compliance_period,
      retired_to: value.retired_to,
      retirement_type: value.retirement_type,
      
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
    <div style={{  fontFamily: 'Roboto, sans-serif',
     
    }}>
    
      <h1> Create New client</h1>
      <form onSubmit={form.onSubmit((value) => onSubmitFlutter(value))}>
        
       
      <Select
  id="reason"
  value={reason}
  onChange={handleReasonChange}
  label="Select Voluntary or Compliance"
  data={[
    { value: "voluntary", label: "Voluntary" },
    { value: "compliance", label: "Compliance" },
  ]}
/>
        

        {reason === 'voluntary' && (
        <div>
          
          <Select id="name"
               data={['Green Pricing Program','Beneficial Ownership', 'Green-e Energy Certified Voluntary Market Sale', 'Federal Renewable Energy Requirement', 'Municipal Portfolio Standard','State/Provincial Renewable Energy Requirement']}
               placeholder="Voluntary Options"
               label="Reason"
               {...form.getInputProps('retirement_type')}
          />

{ form.values.name === 'Green Pricing Program' &&(
          
          <>
          
          <Select id="reason"
                data={[
                  "Evergreen Sales Retirement",
                  "Generation from a Green Pricing Program",
                  "MN Green Power Pricing Program"
                ]}
                placeholder="Reason Options"
                label="Type"
                {...form.getInputProps('retirement_reason')} />
                
                
                <Select id="State/Province"
                  data={["Na", "Alabama",
                    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]}
                  placeholder="Select State/Province"
                  label="State/Province"
                  {...form.getInputProps("retired_to")} /><Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    placeholder="Select a year"
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
        
        )}
       
        { form.values.retirement_type === 'Beneficial Ownership' &&(
          
          <>
          
          <Select id="reason"
                data={[
                  "For Beneficial Owner 'Individual'",
                  "For Environmental Benefit",
                  "Utility Retirement on Behalf of All Retail Customers"
                ]}
                placeholder="Reason Options"
                label="Type"
                {...form.getInputProps('retirement_reason')} />
                
                
          </>
        )}
        </div>
      )}
       { form.values.retirement_type === 'Federal Renewable Energy Requirement' &&(
          
          <>
          
          <Select id="reason"
                data={[
                  "EPACTT 2005",
"Executive Order 13423",
"Federal Building",
"U.S. DOD Army",
"U.S. DOD Navy",
"U.S. DOD Air Force",
"U.S. DOD Marines",
"U.S. DOD",
"U.S. Park Service, Dept. of Interior",
"Department of the Interior"
                ]}
                placeholder="Reason Options"
                label="Type"
                {...form.getInputProps('retirement_reason')} />
                <Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    placeholder="Select a year"
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
        )}
         { form.values.retirement_type === 'Municipal Portfolio Standard' &&(
          
          <>
                <Select id="State/Province"
                  data={["Na", "Alabama",
                    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]}
                  placeholder="Select State/Province"
                  label="State/Province"
                  {...form.getInputProps("retired_to")} /><Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
        
        )}
        { form.values.retirement_type === 'State/Provincial Renewable Energy Requirement' &&(
          
          <>
                <Select id="State/Province"
                  data={["Na", "Alabama",
                    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]}
                  placeholder="Select State/Province"
                  label="State/Province"
                  {...form.getInputProps("retired_to")} /><Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
          
        )}
 { form.values.retirement_type === 'Green-e Energy Certified Voluntary Market Sale' &&(
          
          <>
          
          <Select id="reason"
                data={[
                  "Green Electricity Program",
                  "REC Only",
                  "Utility Green Pricing Program"
                ]}
                placeholder="Reason Options"
                label="Type"
                {...form.getInputProps('retirement_reason')} />
                
                
          <Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    placeholder="Select Compliance Period"
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
        )}

      {reason === 'compliance' && (
        <div>
           
          <Select id="name"
               data={['State/Provincial Portfolio Standards','Other - Non-RPS Compliance']}
               placeholder="Compliance Options"
               label="Type"
               {...form.getInputProps('retirement_type')}
          />
        { form.values.retirement_type === 'State/Provincial Portfolio Standards' &&(
          
          <>
          <Select id="reason"
                data={[
                  "State/Province Load",
                  "Not State/Province Load"
                ]}
                placeholder="Reason Options"
                label="Type"
                {...form.getInputProps('retirement_reason')} />
                <Select id="State/Province"
                  data={["Na", "Alabama",
                    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]}
                  placeholder="Select State/Province"
                  label="State/Province"
                  {...form.getInputProps("retired_to")} /><Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    placeholder="Select Compliance Period"
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>
        
        )}

            { form.values.retirement_type === 'Other - Non-RPS Compliance' &&(
          
          <>
                <Select id="State/Province"
                  data={["Na", "Alabama",
                    "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"]}
                  placeholder="Select State/Province"
                  label="State/Province"
                  {...form.getInputProps("retired_to")} /><Select id="Compliance Period"
                    data={[
                      "2025",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017"
                    ]}
                    placeholder="Select Compliance Period"
                    label="Compliance Period"
                    {...form.getInputProps("compliance_period")} /></>

        )}
        </div>
      )}
   
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
      
      
        <Textarea
             label="Notes"
            placeholder="Add additional notes..."
            variant="filled"
            className={classes.media}
            {...form.getInputProps("notes")}
          />
          <Space h="xl" />
          <Button type="submit" disabled={inputDisabled}>
            Add New Client
          </Button>
        <Space h="xl" />
      </form>
      </div>
     
    
  );
};

export default CreateFlutter;
