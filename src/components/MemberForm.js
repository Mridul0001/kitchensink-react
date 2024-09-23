import { TextField, Button, Typography, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';

const MemberForm = ({ onSave, currentMember, isEdit, onUpdate }) => {
    const [name, setName] = useState(currentMember?.name || '');
    const [email, setEmail] = useState(currentMember?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(currentMember?.phoneNumber || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        isEdit?onUpdate({ name, email, phoneNumber }) : onSave({ name, email, phoneNumber });
        setName('');
        setEmail('');
        setPhoneNumber('');
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
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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