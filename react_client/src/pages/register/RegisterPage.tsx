import { Autocomplete, Box, Button, Card, CardContent, Container, FormControl, FormControlLabel, IconButton, InputAdornment, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../../contexts/auth/authContext";
import { AuthContextType } from "../../contexts/auth/authContext.type";
import { RegisterRequest } from "../../contexts/auth/models/registerRequest.model";
import { useForm } from "react-hook-form";
import { CountryType, countries } from "../../utils/countries";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTranslation } from "../../utils/i18n/useTranslation";

const RegisterPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<CountryType>();
  const [gender, setGender] = useState("");
  const translate = useTranslation();
  const { isLoading } = useContext(AuthContext) as AuthContextType;

  const steps = [translate("name"), translate("gender"), "Country", "Login details"];

  const isStepOptional = (step: number) => {
    return step === 0 || step === 1 || step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formSchema = yup.object().shape({
    firstName: yup.string().nullable(),
    lastName: yup.string().nullable(),
    gender: yup.string().nullable(),
    country: yup.string().nullable(),
    email: yup.string().required("Email is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (registerRequest: RegisterRequest) => {
    console.log(registerRequest);
    // loginAsync(loginRequest).then((user) => {
    //   if (user) {
    //     enqueueSnackbar(`Welcome back, ${(user as User).firstName}`, {
    //       variant: "success",
    //     });
    //   }
    // });
  };

  const renderSteps = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined"
            >
              <TextField
                label="First Name"
                error={errors.firstName !== undefined}
                id="outlined-adornment-firstname"
                type={"text"}
                helperText={errors.firstName?.message}
                {...register("firstName")}
              />
            </FormControl>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined"
            >
              <TextField
                label="Last Name"
                error={errors.firstName !== undefined}
                id="outlined-adornment-lastname"
                type={"text"}
                helperText={errors.firstName?.message}
                {...register("lastName")}
              />
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <Box
              sx={{
                display: "1 1 flex",
                justifyContent: "center",
              }} >
              <FormControl>
                <RadioGroup
                  onChange={(event, data: any) => { setGender(data) }}
                  value={gender} >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    {...register("gender")} />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    {...register("gender")} />
                </RadioGroup>
              </FormControl>
              <Box sx={{ flexDirection: "column", flex: "1 1 auto" }} />
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined" >
              <Autocomplete
                value={country || null}
                defaultValue={null}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props} >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt="" />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    {...register("country")}/>
                )}
                onChange={(event, data: any) => { setCountry(data)}} />
            </FormControl>
          </>
        );
      case 3:
        return (
          <>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined" >
              <TextField
                label="Email"
                error={errors.email !== undefined}
                type={"email"}
                helperText={errors.email?.message}
                {...register("email")}
              />
            </FormControl>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined" >
              <TextField
                label="Username"
                error={errors.username !== undefined}
                type={"text"}
                helperText={errors.username?.message}
                {...register("username")}
              />
            </FormControl>
            <FormControl
              sx={{ width: "100%", marginBottom: 2 }}
              variant="outlined" >
              <TextField
                  label="Password"
                  error={errors.password !== undefined}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  helperText={errors.password?.message}
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end" >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      )
                  }}
                  {...register('password')}
              />
            </FormControl>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Container>
        <Card>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  borderBottom: 1,
                  borderColor: "gray",
                  marginBottom: 6,
                }}
              >
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                    optional?: React.ReactNode;
                  } = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="inherit" mb={2}>
                        Optional
                      </Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <Typography variant="inherit">{label}</Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ width: 300, height: 300 }}>
                    {renderSteps(activeStep)}
                  </Box>
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "row", 
                    pt: 2 }}>
                    {activeStep !== 0 &&
                      <Button variant="outlined" color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                    }
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button variant="text" color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}
                    {activeStep === steps.length-1
                      ? (
                        <Button variant="contained" type="submit">
                          Register
                        </Button>
                      ) : (
                        <Button variant="contained" onClick={handleNext}>
                          Next
                        </Button>
                      )
                    }
                  </Box>
                </form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
