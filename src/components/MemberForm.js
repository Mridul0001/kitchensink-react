import { TextField, Button, Typography, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';

const MemberForm = ({ onSave, currentMember, isEdit, onUpdate }) => {
    const [name, setName] = useState(currentMember?.name || '');
    const [email, setEmail] = useState(currentMember?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(currentMember?.phoneNumber || '');
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const validatePhoneNumber = (value) => {
        const isNumeric = /^[0-9]+$/.test(value);
        const hasValidLength = value.length >= 10 && value.length <= 12;
        const hasSingleLeadingZero = value.length > 1 && value[0] === '0' && value[1] !== '0';
        const isAllZeros = /^0+$/.test(value);

        // Validating rules
        if (!isNumeric) {
            setHelperText('Only numeric values are allowed');
            return false;
        } else if (!hasValidLength) {
            setHelperText('Phone number must be between 10 and 12 digits');
            return false;
        } else if (isAllZeros) {
            setHelperText('Phone number cannot be all zeros');
            return false;
        } else if (value.length > 1 && value[0] === '0' && !hasSingleLeadingZero) {
            setHelperText('Phone number cannot have multiple leading zeros');
            return false;
        }

        setHelperText('');
        return true;
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setPhoneError(!validatePhoneNumber(value));
    };

    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(!validateEmail(value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!emailError && !phoneError){
            try{
                isEdit?await onUpdate({ name, email, phoneNumber }) :await onSave({ name, email, phoneNumber });
                setName('');
                setEmail('');
                setPhoneNumber('');
            }catch(error) {
                if (error.response && error.response.data) {
                    alert(error.response.data.errorMessage || 'An error occurred');
                    return false;
                }
            }
        }else{
            alert("Please check entered details");
        }
    };

    useEffect(() => {
        if (currentMember) {
            setName(currentMember.name);
            setEmail(currentMember.email);
            setPhoneNumber(currentMember.phoneNumber);
        }
    }, [currentMember]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                {isEdit ? 'Edit Member' : 'Add Member'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^[A-Za-z\s]*$/.test(value)) {
                            setName(value);
                        }
                    }
                    }
                    inputProps={{ maxLength: 50 }}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    helperText={emailError ? "Invalid email address" : ""}
                    required
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    error={phoneError}
                    helperText={helperText}
                    inputProps={{
                        maxLength: 12,
                        inputMode: 'numeric',
                    }}
                    required
                />
                <Button variant="contained" color="primary" fullWidth type="submit">
                    Save
                </Button>
            </form>
        </Container>
    );
};

export default MemberForm;