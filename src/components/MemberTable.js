import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { json } from 'react-router-dom';


const MemberTable = ({ members, onEdit, onRefresh, onDelete, onGetById }) => {
    const [memberDetails, setMemberDetails] = useState('Member Details will be displayed here')
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            try {
                await onDelete(id); // Call the delete function from props
                onRefresh();
            } catch (error) {
                console.error("Failed to delete member:", error);
                alert("Error deleting member");
            }
        }
    };

    const handleGetMember = async (id) => {
        try {
            const member = await onGetById(id);
            setMemberDetails(JSON.stringify(member.data))
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.errorMessage || 'An error occurred');
            }
        }
    }
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Link</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member) => (
                        <TableRow key={member.id}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.phoneNumber}</TableCell>
                            <TableCell><Link
                                component="button"
                                variant="body2"
                                onClick={() => handleGetMember(member.id)}
                            >
                                {member.id}
                            </Link></TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(member)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(member.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Alert severity="success">{memberDetails}</Alert>
        </TableContainer>
    );
};

export default MemberTable;