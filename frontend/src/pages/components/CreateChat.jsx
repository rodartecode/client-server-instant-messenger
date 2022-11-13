import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

//a
function CreateChat(props) {
    // const [visible, setVisible] = useState(false);

    // const handleClose = () => {
    //     visible ? setVisible(false) : setVisible(true);
    // }
    const {onClose, selectedValue, open} = props;
    // const {open} = props;
    const [users, setUsers] = useState([]);

    const dummyUsers = ["adam", "brandon", "caleb", "donovan", "ethan", "francis"];

    
    useEffect(() => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('x-access-token', sessionStorage.getItem('token'));
        fetch('http://localhost:5000/user', {
            headers: headers,
            method: 'GET'
        }).then((response) => {
            if (response.ok) 
                return response.json();
            else 
                throw response
            }
        ).then((response) => {
            if (response.users) {
                setUsers(response.users);
                return response.users;
            }
        }).catch((err) => {
            console.error(`error from ${err}`);
        })
    }, []);

    const handleAutocomplete = (event, value) => {
        setUsers(value);
        console.log(value);
    }

    const handleClose = (value) => {
        console.log(value);
        onClose(value);
    }
    // a

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create a New Chat</DialogTitle>
            {/* <DialogContent>
                <DialogContentText>
                    Create a chat with the following users, separated by commas.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="User"
                    fullWidth
                    variant="standard"
                />
            </DialogContent> */}
            <DialogContent>
                <Autocomplete
                    multiple
                    options={users || dummyUsers}
                    sx={{ width: 300 }}
                    onChange={handleAutocomplete}
                    renderInput={(params) => <TextField {...params} variant="filled" label="Users"/>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateChat;

// s

// S