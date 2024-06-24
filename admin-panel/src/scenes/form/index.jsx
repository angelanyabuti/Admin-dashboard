import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"; //provides alot of validation functions
import useMediaQuery from "@mui/material/useMediaQuery"; //for responsive layout
import Header from "../../components/Header";

const initialValues = {
    firstName:"",
    lastName:"",
    email:"",
    contact:"",
    address1:"",
    address2:"",
}

//defines the validations for the fields
const userSchema = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().required("required"),
    contact:yup.string().required("required"),
    address1:yup.string().required("required"),
    address2:yup.string().required("required"),

})

const Form = () => {
    //boolean triggered when the screen reaches 600px
    const isNonMobile = useMediaQuery("(min-width:600px)")
    //function triggered when the form is submitted
    const handleFormSubmit = (values) =>{
        console.log(values)
    }
    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile"/>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>

            </Formik>
        </Box>
    )

}

export default Form;